const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Import Routes
const contactRoute = require('./routes/contact');

app.use('/contact', contactRoute);

//Middlewares
app.use('/message', () => {
    //console.log('this is middleware')
})

//ROUTES
app.get('/', (req, res) => {
    res.send('We are on home');
})

app.get('/message', (req, res) => {
    res.send('We are on home');
})

//Connect to DB
mongoose.connect('mongodb://127.0.0.1:27017',
    { useNewUrlParser: true },
    () => console.log('connected to DB!')
);

//Start listening

app.listen(3000);