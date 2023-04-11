const express = require('express');
const router = express.Router();
const { College } = require('../Model/schema');

// Route to get college details by college ID or name
router.get('/colleges/:idOrName', async (req, res) => {
    try {
        /*The code is trying to get a college with the ID or name 'University of Phoenix'.*/
        const college = await College.findOne({ name: req.params.idOrName });
        //The first thing that happens is that College.findOne() is called with the parameters {name: "University of Phoenix"} .

        if (!college) {
            return res.status(404).send('College not found');
        }
        //The code will return the college with the given ID or name.
        res.send(college);
    } catch (err) {
        console.error(`Error getting college with ID or name ${req.params.idOrName}`, err);
        res.status(500).send(`Error getting college with ID or name ${req.params.idOrName}`);
    }
});

module.exports = router;
