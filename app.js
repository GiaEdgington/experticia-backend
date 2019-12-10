const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



app.use(bodyParser.json());
app.use(cors());

//Import Routes
const contactRoute = require('./routes/contacts');


//Middlewares
app.use('/contacts', contactRoute);

//ROUTES
app.get('/', (req, res) => {
    res.send('We are on home');
})

//Connect to DB
mongoose.connect('mongodb://127.0.0.1:27017/experticia',
    { useNewUrlParser: true },
    () => console.log('connected to DB!')
);

//Start listening

app.listen(3000);