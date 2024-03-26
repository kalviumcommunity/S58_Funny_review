const mongoose=require('mongoose')
const restaurantsSchema=mongoose.Schema({
    Sr_No: Number,
    Name: String,
    img_url: String,
    Ratings: String,
    Review: [String],
    
    Location: String
})
mongoose.pluralize(null)
const restaurantsModel= mongoose.model("restaurants_collection",restaurantsSchema)

module.exports={restaurantsModel}