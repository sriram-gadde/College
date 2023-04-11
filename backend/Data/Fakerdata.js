const faker = require('faker');
const { College, Student } = require('../Model/schema');

// Function to generate random courses
function generateCourses() {
  const courses = ['Computer Science', 'Electronics', 'Information Technology', 'Mechanical Engineering', 'Chemical Engineering', 'Civil Engineering', 'Business Administration', 'Accounting', 'Marketing', 'Psychology'];
  const numCourses = faker.datatype.number({min: 1, max: 10});
  const randomCourses = faker.random.arrayElements(courses, numCourses);
  return randomCourses;
}

// Generate 100 colleges and 100 students in each college
const data = [];

for (let i = 1; i <= 100; i++) {
  const college = new College({
    name: faker.company.companyName(),
    yearFounded: faker.date.past(100).getFullYear(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    numStudents: Math.floor(Math.random() * 101),
    courses: generateCourses()
  });

  data.push(college);

  for (let j = 1; j <= college.numStudents; j++) {
    const student = new Student({
      name: faker.name.findName(),
      yearOfBatch: faker.date.between(college.yearFounded, new Date()).getFullYear(),
      collegeId: college._id,
      skills: generateCourses()
    });
    data.push(student);
  }
}

module.exports = data;
