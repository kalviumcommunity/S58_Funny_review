const mongoose=require('mongoose')
const restaurantsSchema=mongoose.Schema({
    Sr_No: Number,
    Name: String,
    img_url: String,
    Ratings: String,
    Review: String,
    Location: String


})
const restaurantsModel= mongoose.model("restaurant",restaurantsSchema)

module.exports={restaurantsModel}