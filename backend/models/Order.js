const mongoose = require('mongoose')
const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    order_data: {
        type: Array,
        required: true,
    },
})
module.exports = mongoose.model('order',OrderSchema)
// a collection name orders has been created in database and we are importing it as order