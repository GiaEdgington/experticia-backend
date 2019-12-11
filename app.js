const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const m_password = process.env.M_PASSWORD;

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
mongoose.connect(`mongodb+srv://GiaEdgington:${m_password}@cluster0-bof3v.gcp.mongodb.net/test?retryWrites=true&w=majority`,
    { useNewUrlParser: true },
    () => console.log('connected to DB!')
);

//Start listening

app.listen(process.env.PORT || 5000);