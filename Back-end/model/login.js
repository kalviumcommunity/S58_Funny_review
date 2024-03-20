const mongoose=require('mongoose')
const usersSchema=mongoose.Schema({
    username: String,
    password: String
})
mongoose.pluralize(null)
const usersModel= mongoose.model("user",usersSchema)

module.exports={usersModel}