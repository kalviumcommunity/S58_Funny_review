const express = require("express");
const app = express();
const dotenv=require('dotenv');
const cors = require('cors');
dotenv.config()
const port = process.env.PORT || 7777;
const {connection}=require('./config/db');
const { RestaurantsRouter } = require("./routes");

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
  res.send("Hello World!")
})

app.use('', RestaurantsRouter);

app.listen(port,async() => { 
  try {
    console.log(connection)
    await connection;
    console.log("Connected to DB successfully");
  } catch (error) {
     console.log("Error connecting to DB");
     console.log(error);
  }
  console.log(`Server is listening on port ${port}`);
})