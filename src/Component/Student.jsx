import React, { useState, useEffect } from "react";
import axios from "axios";
import { range } from "lodash";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  /*Otherwise it sets them back to their initial state (null).
  The handleSubmit function uses event parameters passed into it from outside of itself when making HTTP requests so that they can be prevented from being sent on further down the line.
  The code will create a state of null for the college, set it to the selected college and then use that state to get students.
  If no colleges are selected, it will set the college to null and then use that state to get students.*/
  const PAGE_SIZE = 20;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/students`)
      .then((response) => {
        setStudents(response.data);
        setTotalPages(Math.ceil(response.data.length / PAGE_SIZE));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  /*One function called handlePageClick will be executed every time a user clicks on one of the pages in the list view.
   Another function called handleSortClick will execute whenever a user clicks on one of the columns in order to change its sort order from ascending to descending or vice versa.*/
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSortClick = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  const renderPageNumbers = () => {
    const totalPagesArray = range(1, totalPages + 1);
    const maxPageNumbers = 10;
    let startPageNumber = 1;
    let endPageNumber = totalPagesArray.length / 40;
    /*If it is greater than 10, then startPageNumber will be set to Math.max(page - Math.floor(maxPageNumbers / 2), 1) and endPageNumber will be set to Math.min(startPageNumber + maxPageNumbers - 1, totalPagesArray).
    The code first sets startPageNumber equal to page minus floor (Math) of max Page Numbers divided by two because there are only 40 pages in this book so far; however, we want our numbers starting on page one instead of 0 like they would have been without this line of code: if (page > Math.floor(maxPageNumbers / 2)) { Next, the code sets endPoint number as being either startPoint plus maxPoints minus one or until the last point in the range has been reached: } else {endPoint = startPoint + maxPoints-1}*/
    if (page > Math.floor(maxPageNumbers / 2)) {
      startPageNumber = Math.max(page - Math.floor(maxPageNumbers / 2), 1);
      endPageNumber = Math.min(
        startPageNumber + maxPageNumbers - 1,
        totalPagesArray.length
      );
    }

    return (
      <div className="flex mt-4">
        {page > 1 && (
          <button
            className="mx-1 px-3 py-1 rounded bg-white text-gray-700"
            onClick={() => handlePageClick(page - 1)}
          >
            Previous
          </button>
        )}
        {totalPagesArray
          .slice(startPageNumber - 1, endPageNumber)
          .map((pageNumber) => (
            <button
              key={pageNumber}
              className={`mx-1 px-3 py-1 rounded ${pageNumber === page
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
                }`}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        {page < totalPages && (
          <button
            className="mx-1 px-3 py-1 rounded bg-white text-gray-700"
            onClick={() => handlePageClick(page + 1)}
          >
            Next
          </button>
        )}
      </div>
    );
  };

  const renderStudents = () => {
    let displayedStudents = [...students];

    if (sortBy) {
      displayedStudents.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] < b[sortBy] ? -1 : 1;
        } else {
          return a[sortBy] > b[sortBy] ? -1 : 1;
        }
      });
    }

    const startIndex = (page - 1
    ) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    displayedStudents = displayedStudents.slice(startIndex, endIndex);
    return (
      <table className="table-auto">
        <thead>
          <tr>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSortClick("name")}
            >
              Name{" "}
              {sortBy === "name" && (
                <span className="ml-1">
                  {sortOrder === "asc" ? "▲" : "▼"}
                </span>
              )}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSortClick("_id")}
            >
              _id{" "}
              {sortBy === "_id" && (
                <span className="ml-1">
                  {sortOrder === "asc" ? "▲" : "▼"}
                </span>
              )}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSortClick("yearOfBatch")}
            >
              yearOfBatch{" "}
              {sortBy === "yearOfBatch" && (
                <span className="ml-1">
                  {sortOrder === "asc" ? "▲" : "▼"}
                </span>
              )}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSortClick("skills")}
            >
              skills{" "}
              {sortBy === "skills" && (
                <span className="ml-1">
                  {sortOrder === "asc" ? "▲" : "▼"}
                </span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedStudents.map((student) => (
            <tr key={student.id}>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student._id}</td>
              <td className="border px-4 py-2">{student.yearOfBatch}</td>
              <td className="border px-4 py-2">{student.skills}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mt-8 mb-4">Student List</h1>
      {renderStudents()}
      {renderPageNumbers()}
    </div>
  );
};

export default Home;      