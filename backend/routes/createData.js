const express = require('express');
const router = express.Router();
const faker = require('faker');
const { College, Student } = require('../Model/schema');

// Route to create mock data
router.post('/createMockData', async (req, res) => {
  try {
    // Create 100 colleges using faker data 
    const colleges = [];
    for (let i = 1; i <= 100; i++) {
      const courses = ['Computer Science', 'Electronics', 'Information Technology', 'Mechanical Engineering', 'Chemical Engineering', 'Civil Engineering', 'Business Administration', 'Accounting', 'Marketing', 'Psychology'];
      const randomCourses = [];
      for (let j = 1; j <= 5; j++) {
        const randomIndex = faker.datatype.number({ min: 0, max: courses.length - 1 });
        randomCourses.push(courses[randomIndex]);
        courses.splice(randomIndex, 1);
      }
      const college = new College({
        name: faker.company.companyName(),
        yearFounded: faker.date.past(50).getFullYear(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        numStudents: Math.floor(Math.random() * 101),
        courses: randomCourses
      });
      colleges.push(college);
    }
    await College.insertMany(colleges);

    // Create 100 students in each college using faker data
    for (let college of colleges) {
      const students = [];
      for (let i = 1; i <= college.numStudents; i++) {
        const skills = ['C++', 'Java', 'C', 'Python', 'JavaScript', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'HTML', 'CSS', 'React', 'Vue', 'Angular', 'Node.js', 'MongoDB', 'MySQL', 'PostgreSQL', 'AWS', 'Azure', 'Docker', 'Git', 'Agile'];
        const randomSkills = [];
        for (let j = 1; j <= 3; j++) {
          const randomIndex = faker.datatype.number({ min: 0, max: skills.length - 1 });
          randomSkills.push(skills[randomIndex]);
          skills.splice(randomIndex, 1);
        }
        const student = new Student({
          name: faker.name.findName(),
          yearOfBatch: faker.date.past(10).getFullYear(),
          collegeId: college._id,
          skills: randomSkills
        });
        students.push(student);
      }
      await Student.insertMany(students);
    }

    console.log('Mock data created successfully');
    res.status(201).json({ message: 'Mock data created successfully' });
  } catch (err) {
    console.error('Error creating mock data', err);
    res.status(500).json({ error: 'Error creating mock data' });
  }
});

module.exports = router;
