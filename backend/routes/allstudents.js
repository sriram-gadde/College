// Import necessary modules and models
const express = require('express');
const router = express.Router();
const { College, Student } = require('../Model/schema');

router.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.send(students);
        /*The code is trying to get the students from the database by calling Student.find() which returns an object containing all of their data.*/
    } catch (err) {
        console.error('Error getting students', err);
        res.status(500).send('Error getting students');
    }
});

module.exports = router;
