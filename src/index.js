import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chart from './Component/Layouts/Chart';
import Home from './Component/Home';
import IdCollege from './Component/Layouts/IdCollege';
import SimilarColleges from './Component/SimilarColleges';
import Student from './Component/Layouts/Student';
import './index.css';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/idcollege" element={<IdCollege />} />
        <Route path="/similarcolleges" element={<SimilarColleges />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
