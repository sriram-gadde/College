import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



/*
The code starts by defining a function called useState.
This is used to define the state of an object in React.
The next line defines a list of colleges, which will be updated every time the user clicks on "Next" or "Prev".
*/
const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collegesPerPage] = useState(20);
  const [sortType, setSortType] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  /*Next, we have a function that uses axios to get data from the API and then updates our state with it.
  Finally, there is a function that fetches all of the colleges for us and updates our state again.
  The code starts by declaring two variables: Colleges and setColleges; these are both defined as an array with 20 items in them (collegesPerPage).*/
  useEffect(() => {
    const fetchColleges = async () => {
      const res = await axios.get(`http://localhost:3000/api/colleges`);
      setColleges(res.data);
    };
    fetchColleges();
  }, []);

  const indexOfLastCollege = currentPage * collegesPerPage;
  const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;

  // Sorting function to sort the colleges based on the selected sort type and order
  const sortColleges = (colleges) => {
    if (sortType === "courses") {
      colleges.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.courses.length - b.courses.length;
        } else {
          return b.courses.length - a.courses.length;
        }
      });
      /*The code starts by declaring the variables that will be used in the sorting function.
The first variable is called colleges and it is an array of objects with properties for each college.
The second variable is called sortType, which has a value of "courses" or "country".
This means that if you select courses as your sort type, then this code will compare the length of each course to determine how to order them.
The third variable is called sortOrder and it has a value of either "asc" or "desc".
*/
    } else if (sortType === "country") {
      colleges.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.country.localeCompare(b.country);
        } else {
          return b.country.localeCompare(a.country);
        }
      });
    } else if (sortType === "numStudents") {
      colleges.sort((a, b) => {
        if (sortOrder === "asc") {
          return a.numStudents - b.numStudents;
        } else {
          return b.numStudents - a.numStudents;
        }
      });
    }
  };

  // Filter the colleges based on the search term
  const filteredColleges = colleges.filter((college) => {
    return (
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.courses.some((course) => course.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Get the colleges based on the selected sort type and order
  sortColleges(filteredColleges);
  const currentColleges = filteredColleges.slice(
    indexOfFirstCollege,
    indexOfLastCollege
  );

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredColleges.length / collegesPerPage); i++) {
    pageNumbers.push(i);
  }

  // Render page number buttons for pagination
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <button
        key={number}
        className={`px-2 py-1 ${currentPage === number
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700"
          } rounded-lg mx-1 focus:outline-none`}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </button>
    );
  });

  // Sort the colleges based on the selected sort type and order when the sort button is clicked
  const handleSort = (type) => {
    if (sortType === type) {
      // Toggle the sort order if the same sort type is clicked again
      setSortOrder(sortOrder === "asc"
        ? "desc" : "asc");
    } else {
      // Set the sort type and order if a new sort type is selected
      setSortType(type);
      setSortOrder("asc");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Colleges</h1>
        <div>
          <input
            type="text"
            placeholder="Search"
            className="px-2 py-1 rounded-lg border-2 border-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <p className="mr-2">Sort by:</p>
          <button
            className={`${sortType === "courses" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} px-2 py-1 rounded-lg mx-1 focus:outline-none`}
            onClick={() => handleSort("courses")}
          >
            Courses
          </button>
          <button
            className={`${sortType === "country" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} px-2 py-1 rounded-lg mx-1 focus:outline-none`}
            onClick={() => handleSort("country")}
          >
            Country
          </button>
          <button
            className={`${sortType === "numStudents" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} px-2 py-1 rounded-lg mx-1 focus:outline-none`}
            onClick={() => handleSort("numStudents")}
          >
            Number of Students
          </button>
        </div>
        <Link className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none">
          Find
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentColleges.map((college) => (
          <div key={college.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* <img src={college.image} alt={college.name} className="w-full h-48 object-cover" /> */}
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{college.name}</h2>
              <h2 className="text-sm font-bold mb-2">ID: {college._id}</h2>
              <p className="  text-gray-700 mb-2">Country: {college.country}</p>
              <p className="text-gray-700">Students: {college.numStudents} </p>

              {/* <p className="text-sm text-gray-700">{college.courses}</p> */}
              <>
                <h2 className="text-lg font-bold mb-2">Courses:</h2>
                <ul>


                  <li className="mb-2">
                    <p className="text-sm">{college.courses}</p>
                    {/* <p>skills: {student.skills}</p> */}
                  </li>

                </ul>
              </>

            </div>
          </div>
        ))
        }
      </div>
      <div className="flex justify-center mt-4">
        {renderPageNumbers}
      </div>
    </div>
  );
};

export default Colleges;