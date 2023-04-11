const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./config/db");
const app = express();
require("dotenv").config();




//importing routes
const createData = require('./routes/createData.js');
const allColleges = require('./routes/allcolleges.js');
const allStudents = require('./routes/allstudents.js');
const collegeapi = require('./routes/collegeapi.js');
const studentapi = require('./routes/studentapi.js');


// Middleware
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// Mount router for creating mock data
app.use('/api', createData);
app.use('/api', allColleges);
app.use('/api', allStudents);
app.use('/api', collegeapi);
app.use('/api', studentapi);

// Connect to database
db.on("connected", function() {
  console.log("Connected to MongoDB database!");
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
