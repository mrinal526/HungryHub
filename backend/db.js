
const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // this is used only to srpess the warning coming as suggested the query from terminal i pasted it here 
const mongoURI = 'mongodb://<username>:<password>@ac-pqnalnn-shard-00-00.0irdgt4.mongodb.net:27017,ac-pqnalnn-shard-00-01.0irdgt4.mongodb.net:27017,ac-pqnalnn-shard-00-02.0irdgt4.mongodb.net:27017/goFoodmern?ssl=true&replicaSet=atlas-vzmz9f-shard-0&authSource=admin&retryWrites=true&w=majority'
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("error", err)
        else {
            console.log("connected");
            // data read
            const fetchedData = await mongoose.connection.db.collection("food_items");
            fetchedData.find({}).toArray(async function (err, data) {
                const food_category = await mongoose.connection.db.collection("food_category");
                food_category.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        // creating a global variable
                        global.food_items = data;
                        global.food_category = catData;
                        
                    }
                })
                // if(err) console.log(err);
                // else{
                //     // creating a global variable
                //     global.food_items = data;

                // }
            })
        }
    });
}
module.exports = mongoDB;





