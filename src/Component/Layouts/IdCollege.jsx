import React from 'react';
import Layout from './Layout';
import IdCollege from '../IdCollege';

function Student() {
  return (
    <Layout>
    <div className="bg-blue-500 p-4 rounded-md shadow-lg">
      <h1 className="text-3xl font-bold text-white">Welcome to College page</h1>
      <p className="mt-2 text-lg text-white">Here you can find information about Colleges by Searching by Name or ID .</p>
    </div>
    <div className="mt-8">
      <IdCollege />
    </div>
  </Layout>
  );
}

export default Student;

