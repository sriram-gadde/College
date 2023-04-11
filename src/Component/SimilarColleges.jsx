import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CollegeCard from './CollegeCard';

const SimilarColleges = () => {
  const [similarColleges, setSimilarColleges] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getSimilarColleges = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/colleges/similar/${id}`);
        setSimilarColleges(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getSimilarColleges();
  }, [id]);

  return (
    <div className="container mx-auto my-4">
      <h1 className="text-2xl font-bold mb-4">Similar Colleges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {similarColleges.map((college) => (
          <CollegeCard key={college._id} college={college} />
        ))}
      </div>
    </div>
  );
};

export default SimilarColleges;
