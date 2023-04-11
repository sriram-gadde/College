// Import necessary modules and models
const express = require('express');
const router = express.Router();
const { College, Student } = require('../Model/schema');

// Route to get all colleges
router.get('/colleges', async (req, res) => {
    try {
        /*This function takes two parameters, req and res.
The first parameter is the HTTP request that comes in from the client, and the second parameter is an object representing what to do with this request.
The code starts by importing College into the module using require('College') .
Next it creates a new instance of College using new College() .
Then it calls find() on this newly created instance of College , which returns an array containing all colleges found in our database.
Finally, it sends back this array as response to the client via res.send(colleges) .*/
        const colleges = await College.find();
        res.send(colleges);
    } catch (err) {
        console.error('Error getting colleges', err);
        res.status(500).send('Error getting colleges');
    }
});

module.exports = router;
