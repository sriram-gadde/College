import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4 mt-auto" style={{position: "fixed", bottom: "0", width: "100%"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm">
          &copy; 2023 My App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
