import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

/*
The code starts by importing React, useState, and useEffect. The code then creates a function called CollegeList that takes in an argument of colleges. This function will return the visibleColleges variable which is set to 10 initially. The selectedCollege variable is also created and initialized with null. The students array is used to store all the students who are currently being displayed on the chart as well as those who are not yet shown on the chart (the ones who haven't been selected). The handleCollegeClick function handles clicking on any of the colleges on this list. If it's already selected, nothing happens; otherwise, it sets selectedCollege to be whatever college was clicked upon and calls axios to get some data from our API endpoint for that college's student data. It then filters out only those students whose college ID matches what we're looking for using a filter method provided by axios' response object (response.data) before setting up our new filteredStudents array with them inside of it so they can be displayed later when needed in our render() method below: Next comes handleStudentToggle which simply clears out all of our previously stored student data if we click "Clear" or selects another school if we click "Select".
*/
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const apiUrl = 'http://localhost:3000/api/colleges';
/*The code is a React application which fetches the data from an API endpoint and renders it in a pie chart.*/
function CollegeList({ colleges }) {
  const [visibleColleges, setVisibleColleges] = useState(10);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [students, setStudents] = useState([]);
  /*
  The code starts by declaring a variable called visibleColleges. This is the number of colleges that will be shown on the page. The code then iterates through all of the colleges in this list and creates an unordered list with each college as a key and its name as text content. The next line declares a variable called max-h-80, which is used to set the maximum height for this section of content. Then it sets overflow-y-auto so that when there are too many items, they scroll horizontally instead of vertically. Finally, it uses slice() to create an array with just those elements from 0 up to visibleColleges - 1 (the first item). map() takes each element in this array and assigns it to a new key value pair using _id as the key value pair's identifier property.*/
  const handleCollegeClick = async (college) => {
    if (selectedCollege && selectedCollege._id === college._id) {
      return;
    }

    setSelectedCollege(college);

    try {
      const response = await axios.get(`http://localhost:3000/api/students?collegeId=${college._id}`);
      const filteredStudents = response.data.filter((student) => student.collegeId === college._id);
      setStudents(filteredStudents);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStudentToggle = () => {
    setStudents([]);
    setSelectedCollege(null);
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-lg p-5">
        <h3 className="font-bold text-lg mb-3">Colleges List</h3>
        <div className="max-h-80 overflow-y-auto">
          <ul>
            {colleges.slice(0, visibleColleges).map((college) => (
              <li
                key={college._id}
                className={`py-1 text-gray-800 cursor-pointer ${selectedCollege && selectedCollege._id === college._id ? "bg-gray-100" : ""
                  }`}
                onClick={() => handleCollegeClick(college)}
              >
                {college.name}
              </li>
            ))}
          </ul>
          {visibleColleges < colleges.length && (
            <button
              className="mt-2 text-sm text-blue-500 hover:text-blue-700 font-bold"
              onClick={() => setVisibleColleges((prev) => prev + 10)}
            >
              Show More
            </button>
          )}
        </div>
        {selectedCollege && (
          <div className="mt-4">
            <h3 className="font-bold text-lg mb-3">{selectedCollege.name}</h3>
            <p className="text-gray-800 mb-2">
              <span className="font-bold">Location: </span>
              {selectedCollege.city}, {selectedCollege.state}
            </p>
            <p className="text-gray-800 mb-2">
              <span className="font-bold">Courses: </span>
              {selectedCollege.courses.join(", ")}
            </p>
            {students.length > 0 ? (
              <>
                <h4 className="font-bold mb-2">Students ({students.length})</h4>
                <ul>
                  {students.map((student) => (
                    <li key={student._id} className="py-1">
                      <p className="font-bold">Name: {student.name}</p>
                      <p>Id: {
                        student._id
                      }</p>
                      <p>SKills: {student.skills}</p>
                      <p>CollegeId: {student.collegeId}</p>
                      <p>yearOfBatch: {student.yearOfBatch}</p>
                    </li>
                  ))}
                </ul>
                <button className="mt-2 text-sm text-blue-500 hover:text-blue-700 font-bold" onClick={handleStudentToggle}>
                  Back to Colleges List
                </button>
              </>
            ) : (
              <p>No students found for this college.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


/*
The code starts with a div that has the className "w-full md:w-1/2 lg:w-1/3 p-4". This is the state chart. Next, there is a div with the className "bg-white rounded-lg shadow-lg p-5" which contains an h3 and some text. The h3 has the className "font bold text mb 3". Inside of this div are two flex items, one on top of another. The first item in this list is called "PieChart", and it takes up all of the space inside of its parent element (the second item in this list). Inside of this PieChart are three elements: dataKey="value", label={(entry) => entry.name}, and onClick={onClick}. These three elements make up what we call a pie chart or circular bar graph. The dataKey="value" tells us what value to use for each slice when we render our pie chart; label={(entry) => entry.name} will be used to display information about each individual slice; finally, onClick={onClick} will be used to handle clicking events from our users*/
function StateChart({ data, onClick }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-lg p-5">
        <h3 className="font-bold text-lg mb-3">Colleges by State</h3>
        <div className="flex items-center justify-center mb-5">
          <PieChart width={350} height={350}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              onClick={onClick}
              label={(entry) => entry.name}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <ul>
          {data.map((entry, index) => (
            <li key={`state-${index}`} className="py-2 flex items-center justify-between">
              <span className="text-gray-800">{entry.name}</span>
              <span className="text-gray-500 text-sm">{`${entry.value.toFixed(2)}%`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


//The code starts by declaring a variable called data.
//The variable is used to store the data that will be displayed on the chart.

function CourseChart({ data, onClick }) {
  return (
    /*The code then declares an event handler function called onClick, which takes one argument: the name of the course being clicked.
Next, it creates a div with className="w-full md:w-1/2 lg:w-1/3 p-4".
This div contains all of the elements for displaying and interacting with this chart.
*/




    /*The first element in this div is a PieChart object with width=350px and height=350px, cx="50%" cy="50%", innerRadius={60} outerRadius={80}, fill="#8884d8" paddingAngle={5}, and dataKey="value".
    These properties are set so that when you click on any part of this piechart, it will display its corresponding value from your dataset as well as show how much percentage each course has over other courses in terms of total number of students enrolled at these colleges.
    Then there's another ul containing li objects inside them (with classes "py-2 flex justify-between").
    */
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-lg p-5">
        <h3 className="font-bold text-lg mb-3">Colleges by Course</h3>
        <div className="flex items-center justify-center mb-5">
          <PieChart width={350} height={350}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              onClick={onClick}
              label={(entry) => entry.name}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        <ul>
          {data.map((entry, index) => (
            <li key={`course-${index}`} className="py-2 flex justify-between">
              <span>{entry.name}</span>
              <span>{`${entry.value.toFixed(2)}%`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Chart() {
  const [colleges, setColleges] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [courseData, setCourseData] = useState([]);



  /*
The code starts by declaring a variable called colleges that is an array of objects. The code then declares a variable called stateData, which is an array of objects with the name and state for each college in the United States. The next line creates a function called handleStateClick() that takes data as its argument and calls setColleges() on it to display only those colleges whose states match the value passed into handleStateClick(). The next line creates a function call handleCourseClick(), which takes data as its argument and calls setColleges() on it to display only those colleges whose courses match the value passed into handleCourseClick().
The code will create a state-based chart with the data from the API. The code above is using useEffect() to fetch the data and then display it in the UI.*/
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setColleges(data);
        const states = {};
        const courses = {};
        data.forEach((college) => {
          // Calculate state counts
          if (states[college.state]) {
            states[college.state]++;
          } else {
            states[college.state] = 1;
          }
          // Calculate course counts
          college.courses.forEach((course) => {
            if (courses[course]) {
              courses[course]++;
            } else {
              courses[course] = 1;
            }
          });
        });
        // Convert state counts to chart data
        const stateChartData = Object.entries(states).map(([name, value]) => ({
          name,
          value: (value / data.length) * 100,
        }));
        setStateData(stateChartData);
        // Convert course counts to chart data
        const courseChartData = Object.entries(courses).map(([name, value]) => ({
          name,
          value: (value / data.length) * 100,
        }));
        setCourseData(courseChartData);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleStateClick = (data) => {
    // Filter colleges by state
    const stateColleges = colleges.filter((college) => college.state === data.name);
    // Display filtered colleges
    setColleges(stateColleges);
  };

  const handleCourseClick = (data) => {
    // Filter colleges by course
    const courseColleges = colleges.filter((college) => college.courses.includes(data.name));
    // Display filtered colleges
    setColleges(courseColleges);
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-wrap -mx-2">
        <CollegeList colleges={colleges} />
        <StateChart data={stateData} onClick={handleStateClick} />
        <CourseChart data={courseData} onClick={handleCourseClick} />
      </div>
    </div>
  );
}

export default Chart;