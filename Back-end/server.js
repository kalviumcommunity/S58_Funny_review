const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config()
const port = process.env.PUBLIC_PORT || 3000;
const {connection}=require('./config/db')
const restaurantsData= require('./config/data');
const { restaurantsModel } = require('./model/restaurants');
const {router} = require('./routes')


app.get('/ping', (req, res) => {
  res.json({ message: 'pong' }); 
});

app.post('/postdata',(req,res)=>{
  restaurantsModel.insertMany(restaurantsData)
  .then((result) => {
    console.log('Inserted', result.length, 'documents into the collection');
  })
  .catch((error) => {
    console.error('Error inserting documents:', error);
  });
})


app.listen(port,async () => { 
  try {
    await connection;
    console.log("Connected to DB successfully")
    
  } catch (error) {
     console.log("Error connecting to DB");
     console.log(error);
  }

  console.log(`Server is listening on port ${port}`);
})