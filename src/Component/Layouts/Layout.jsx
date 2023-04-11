import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

function Layout({ children }) {
  return (
    <>
      <Navbar className="bg-indigo-600" />
      <div className="bg-gray-100 dark:bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {children}
        </div>
      </div>
      <Footer className="bg-gray-200 dark:bg-gray-800" />
    </>
  );
}

export default Layout;
