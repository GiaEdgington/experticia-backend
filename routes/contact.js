const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('these are contacts');
});





module.exports = router;