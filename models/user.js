const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type : String , required : true},
    username: {type : String , required : true},
    bio: {type : String},
    password: {type : String , required : true},
    profilePicSrc : {type : String}
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User' , userSchema)