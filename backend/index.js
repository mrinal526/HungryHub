const express = require('express')
const app = express()
const port = 5000;
const mongoDB = require ("./db")
mongoDB();

// cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

app.use(express.json())  // if we write this line then only we can use route
// this is used to call routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.get('/', (req, res) => {
  res.send('hello world')
})
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})