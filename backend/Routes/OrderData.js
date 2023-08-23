const express = require('express')
const router = express.Router()
const Order = require('../models/Order')

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    //console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    //console.log(eId)
    if (eId===null) { // eId===null means it's user forst order since the email doesn't exist in order
        try {
            // console.log(data)
            // console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }
   // if user exist already means this is not his/her first order
    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})
// /myOrderData is endpoint that should be fetched in frontend page (MyOrder.js)
router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
//orderData is a variable under which we are sending eId data that means all data corresponds to that emailID which is requested by user
    } catch (error) {
        res.send("Error",error.message)
    } 

});

module.exports = router;