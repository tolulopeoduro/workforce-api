//xOHc26PFp3qY0iQo

const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded, json } = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users');
const cors = require('cors')

const app = express();

mongoose.connect("mongodb+srv://Tolulope:7ZLOnkid8UlLbG9T@cluster0.iy6ag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => console.log('connected'))
    .catch((error) => {
        console.log('unable to connect');
        console.error(error)
    })

app.use((req , res , next) => {
    res.setHeader('Access-Control-Allow-Origin' , "*");
    res.setHeader('Access-Control-Allow-Headers' , "Origin, X-Requested-With, Content, Accept ,Content-Type, Authorization");
    res.setHeader('Access-Control-Allow-Methods' , "GET , POST , PUT , DELETE , PATCH , OPTIONS");
    next();
})

app.use(cors())

app.use(bodyParser.json())
app.use(urlencoded({extended : true}))

app.use('/api/auth' , userRoutes)
app.use('/api/posts' , postRoutes)


module.exports = app;