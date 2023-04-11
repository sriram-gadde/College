const express = require('express');
const router = express.Router();
const { College } = require('../Model/schema');

// Route to get similar colleges for a given college
router.get('/colleges/similar/:id', async (req, res) => {
    try {
        // Find the college to get similar colleges for
        const college = await College.findById(req.params.id);
        if (!college) {
            return res.status(404).send('College not found');
        }
        //The code is trying to find colleges that are similar to the college with ID "123".The code first finds the college with ID "123" and then tries to find colleges that are similar.


        // Find similar colleges based on location, no of students and courses offered
        const similarColleges = await College.find({
            _id: { $ne: college._id },
            location: college.location,
            courses: { $in: college.courses },
            $and: [
                { totalStudents: { $gt: college.totalStudents - 100 } },
                { totalStudents: { $lt: college.totalStudents + 100 } }
            ]
        });
        //The code first finds the college using College.findById(req.params.id) and if it doesn't find it, returns a 404 status code with an error message of "College not found".
        if (similarColleges.length === 0) {
            return res.status(404).send('No similar colleges found');
        }

        res.send(similarColleges);
    } catch (err) {
        console.error(`Error getting similar colleges for college with ID ${req.params.id}`, err);
        res.status(500).send(`Error getting similar colleges for college with ID ${req.params.id}`);
    }
});

module.exports = router;
