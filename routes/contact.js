const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator/check');

require('dotenv').config();


const email = process.env.E_EMAIL;
const password = process.env.E_PASSWORD;


//Get back all contacts
router.get('/', async (req, res) => {
    try{
        const contacts = await Contact.find();
        res.json(contacts);
    }catch(err){
        res.json({ message: err }); 
    }
});

//Submit Contact
router.post('/', [
    check('name', '* Mandatorio').not().isEmpty(),
    check('email', '* Correo electrónico no válido').not().isEmpty().isEmail(),
    check('case', '* Debe explicar brevemente su caso').not().isEmpty(),
    check('phone', '* Número inválido').isLength({ min: 9})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        //console.log(errors.array());
        return res.json(errors);
    }

    const contact = new Contact ({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        case: req.body.case,
        date: req.body.date
    });
    try{
        const savedContact = await contact.save();
        res.json(savedPost);
        console.log('test');
    }catch(err){
        res.json({ message: err });
    }

    console.log("got here");

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: email,
            pass: password
        }
    });

    let info = transporter.sendMail({
        from: "experticia.contacts@gmail.com",
        to: "experticia.contacts@gmail.com",
        subject: "New Contact",
        html: `Name: ${req.body.name}<br>
               Email: ${req.body.email}<br>
               Teléfono: ${req.body.phone}<br>
               Caso: ${req.body.case}`
    }, function(error, response){
        if(error){
            console.log(error);
        }else {
            console.log("Message sent")
        }
    });
});

//Specific Contact
router.get('/:contactId', async (req, res) => {
    try{
        const contact = await Contact.findById(req.params.contactId);
        res.json(contact);
    }catch(err){
        res.json({ message: err })
    } 
});

//Delete Contact
router.delete('/:contactId', async (req, res) => {
    try{
        const removedContact = await Contact.remove({ _id: req.params.contactId });
        res.json(removedContact);
    }catch(err){
        res.json({ message: err });
    }
});

//Update Contact 
router.patch('/:contactId', async (req, res) => {
    try{
        const updatedContact = await Contact.updateOne(
            { _id: req.params.contactId }, req.body);
        res.json(updatedContact);
    }catch(err){
        res.json({ message: err })
    }
})

module.exports = router;