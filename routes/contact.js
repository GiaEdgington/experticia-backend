const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');


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
router.post('/', async (req, res) => {
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
    }catch(err){
        res.json({ message: err });
    }
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
//REVIEW $set
router.patch('/:contactId', async (req, res) => {
    try{
        const updatedContact = await Contact.updateOne(
            { _id: req.params.contactId },
            { $set: {} }
            );
        res.json(updatedContact);
    }catch(err){
        res.json({ message: err })
    }
})

module.exports = router;