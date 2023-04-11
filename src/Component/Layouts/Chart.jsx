import React from 'react';
import Layout from './Layout';
import Chart from '../Chart';

function Student() {
  return (
    <Layout>
    <div className="bg-blue-500 p-4 rounded-md shadow-lg">
      <h1 className="text-3xl font-bold text-white">Welcome to Chart page</h1>
      <p className="mt-2 text-lg text-white">Here you can find information about State and Courses in Pie Chart form.</p>
    </div>
    <div className="mt-8">
      <Chart />
    </div>
  </Layout>
  );
}

export default Student;
