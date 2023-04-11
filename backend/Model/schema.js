const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  yearFounded: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  numStudents: { type: Number, required: true },
  courses: { type: [String], required: true }
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  yearOfBatch: { type: Number, required: true },
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
  skills: { type: [String], required: true }
});

const College = mongoose.model('College', collegeSchema);
const Student = mongoose.model('Student', studentSchema);

module.exports = { College, Student };
