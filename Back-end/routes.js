const express = require('express');
const RestaurantsRouter = express.Router();
const { restaurantsModel } = require('./model/restaurants');
const restaurantsData= require('./config/data.json');
const {usersModel} = require('./model/login')
const usersData = require('./config/loginData.json')


RestaurantsRouter.get("/",(req,res)=>{
  res.send("Hello everyone!")
})

//Create : Add all data
RestaurantsRouter.post('/postdata',(req,res)=>{
  restaurantsModel.insertMany(restaurantsData)
  .then((result) => {
    res.send('Inserted ' + result.length + ' documents into the collection');
  })
.catch((error) => {
   console.error('Error inserting documents:', error);
   res.status(500).json({ error: 'Failed to insert data' });
   });
})

// Create: Add all user
RestaurantsRouter.post('/postuser',(req,res)=>{
  usersModel.insertMany(usersData)
  .then((result) => {
    res.send('Inserted ' + result.length + ' documents into the collection');
  })
.catch((error) => {
   console.error('Error inserting documents:', error);
   res.status(500).json({ error: 'Failed to insert data' });
   });
})

  
//Read : Get all the restaurant details
console.log(restaurantsModel);

RestaurantsRouter.get('/restaurant/', async (req,res)=>{
  console.log(restaurantsModel)
  try {
    const data= await restaurantsModel.find();
    res.json(data);
  } catch (error) {
    console.log('Error getting the data:', error);
    res.status(500).json({ error: 'Failed to get the data' });
  }
})

RestaurantsRouter.get('/restaurant/:id', async (req,res)=>{
  console.log(restaurantsModel)
  try {
    const data= await restaurantsModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    console.log('Error getting the data:', error);
    res.status(500).json({ error: 'Failed to get the data' });
  }
})

// Read: Get all user details
RestaurantsRouter.get('/user/', async (req,res)=>{
  try {
    const alldata= await usersModel.find();
    res.json(alldata);
  } catch (error) {
    console.log('Error getting the data:', error);
    res.status(500).json({ error: 'Failed to get the data' });
  }
})


//POST: Add one data
RestaurantsRouter.post('/restaurant/', async (req, res) => {
  try{
    const data = {
      "Sr_No": req.body.Sr_No,
      "Name": req.body.Name,
      "img_url": req.body.img_url,
      "Ratings": req.body.Ratings,
      "Review": req.body.Review,
      "Location": req.body.Location
    }
    const result = restaurantsModel.insertMany(data)
    res.json(result);
  } catch (error) {
    console.log('Error posting the data:', error);
    res.status(500).json({ error: 'Failed to post the data' });
  }
})

//POST : Post review
RestaurantsRouter.post('/restaurant/:id/review', async (req,res)=>{
  try {
    data = await restaurantsModel.findById(req.params.id)
    updatedData = await restaurantsModel.findByIdAndUpdate(
        req.params.id,
        {
          "Review": [...data.Review, req.body.review],
        },
        {new: true}
    );
    res.json(updatedData);

  } catch (error) {
    console.log('Error updating the data:', error);
    res.status(500).json({ error: 'Failed to update the data' });
  }
})

// POSt : Add one user
RestaurantsRouter.post('/user/', async (req, res) => {
  try{
    const data = {
      "username": req.body.username,
      "password": req.body.password
    }
    const result = await usersModel.insertMany(data)
    res.json(result);
  } catch (error) {
    console.log('Error posting the data:', error);
    res.status(500).json({ error: 'Failed to post the data' });
  }
})



//Update : Update the data 
RestaurantsRouter.put('/restaurant/:id', async (req,res)=>{
  try {
    Updatedata = await restaurantsModel.findByIdAndUpdate(
        req.params.id,
        {
          "Sr_No": req.body.Sr_No,
          "Name": req.body.Name,
          "img_url": req.body.img_url,
          "Ratings": req.body.Ratings,
          "Review": req.body.Review,
          "Location": req.body.Location
        }
    );
    res.json(Updatedata);

  } catch (error) {
    console.log('Error updating the data:', error);
    res.status(500).json({ error: 'Failed to update the data' });
  }
})
  
//Delete : Delete the data

RestaurantsRouter.delete('/restaurant/:id', async (req,res)=>{
    try { 
        const deletedata = await restaurantsModel.findByIdAndDelete(req.params.id);
        res.json(deletedata);
        
    } catch (error) {
        console.log('Error deleting the data:', error);
        res.status(500).json({ error: 'Failed to delete the data' });
    }
})

//Delete : Delete all  res data

RestaurantsRouter.delete('/Deletedata', async (req,res)=>{
  try { 
      const deletedata = await restaurantsModel.deleteMany({})
      res.json(deletedata)
      
  } catch (error) {
      console.log('Error deleting the data:', error);
      res.status(500).json({ error: 'Failed to delete the data' });
  }
})

// Delete : Delete all user
RestaurantsRouter.delete('/deleteusers', async (req,res)=>{
  try { 
      const deleteusers = await usersModel.deleteMany({})
      res.json(deleteusers)
      
  } catch (error) {
      console.log('Error deleting the data:', error);
      res.status(500).json({ error: 'Failed to delete the data' });
  }
})


module.exports={RestaurantsRouter}