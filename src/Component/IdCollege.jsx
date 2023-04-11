import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Card } from '@windmill/react-ui';

function IdCollege() {
  const [college, setCollege] = useState(null);
  const [students, setStudents] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [check, setCheck] = useState(false); // add check state
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/api/colleges?name=${inputValue}&id=${inputValue}`);
      if (response.data.length > 0) {
        const selectedCollege = response.data.find(college => college._id === inputValue || college.name === inputValue);
        if (selectedCollege) {
          setCollege(selectedCollege);
          const studentResponse = await axios.get(`http://localhost:3000/api/students?collegeName=${selectedCollege.name}`);
          setStudents(studentResponse.data);
          setCheck(false);
        } else {
          setCollege(null);
          setStudents([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="college-input">
          Enter college name or id:
        </label>
        <Input
          id="college-input"
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Enter college name or id"
          className="w-full py-2 px-3 text-gray-700 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <Button
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white tracking-widest hover:bg-indigo-500 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring focus:ring-indigo-300 disabled:opacity-25 transition"
        >
          Submit
        </Button>
      </form>
      {college ? (
        <Card className="p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
          <h1 className="text-3xl font-bold mb-4">{college.name}</h1>
          <p className="mb-4">
            <span className="font-bold cursor-pointer" onClick={() => setCheck(true)}>No. of Students:</span>{' '}
            {college.numStudents}
          </p>
          <p className="mb-4">
            <span className="font-bold">Courses:</span>{' '}
            {college.courses?.join(', ')}
          </p>
          <p className="mb-4">
            <span className="font-bold">Country:</span>{' '}
            {college.country}
          </p>
          <p className="mb-4">
            <span className="font-bold">State:</span>{' '}
            {college.state}
          </p>
          <p className="mb-4">
            <span className="font-bold">City:</span>{' '}
            {college.city}
          </p>
          <p className="mb-4">
            <span className="font-bold">ID:</span>{' '}
            {college._id}
          </p>
          <p className="mb-4">
            <span className="font-bold">Year Founded:</span>{' '}
            {college.yearFounded}
          </p>
          {students.length > 0 && check === true && (
            <>
              <h2 className="text-xl font-bold mb-2">Students:</h2>
              <ul>
                {students
                  .filter((student) => student.collegeId === college._id)
                  .map((student) => (
                    <li key={student._id} className="mb-2">
                      <p className="font-bold">Name: {student.name}</p>
                      <p>Id: {student._id}</p>
                      {/* <p>skills: {student.skills}</p> */}
                    </li>
                  ))}
              </ul>
            </>
          )}


        </Card>
      ) : (
        <p className="text-lg font-bold text-center">Enter college name to get details</p>
      )}
    </div>
  );
}
export default IdCollege; 