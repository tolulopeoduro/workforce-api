const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {type :String , required : true},
    content: {type : String , required : true},
    release_time: {type : String , required : true},
    author : {type : String},
    userId: {type : String , required : true}
})

module.exports = mongoose.model("Post" , postSchema);