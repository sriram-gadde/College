import React from 'react';
import Layout from './Layout';
import Students from '../Student';

function Student() {
  return (
    <Layout>
      <div className="bg-blue-500 p-4 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-white">Welcome to Student page</h1>
        <p className="mt-2 text-lg text-white">Here you can find information about Students.</p>
      </div>
      <div className="mt-8">
        <Students />
      </div>
    </Layout>
  );
}

export default Student;
