import React from 'react';
import Layout from './Layouts/Layout';
import Colleges from './Collges';

function Home() {
  return (
    <Layout>
      <div className="bg-blue-500 p-4 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-white">Welcome to College page</h1>
        <p className="mt-2 text-lg text-white">Here you can find information about Colleges.</p>
      </div>
      <div className="mt-8">
        <Colleges />
      </div>
    </Layout>
  );
}

export default Home;
