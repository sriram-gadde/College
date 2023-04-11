import React from "react";
import { Link } from "react-router-dom";

const CollegeCard = ({ college }) => {
  return (
    <div className="w-full lg:w-1/2 xl:w-1/3 p-3">
      <Link to={`/colleges/${college.id}`} className="hover:underline">
        <div className="bg-white border rounded shadow p-2">
          <div className="flex flex-row items-center">
            <div className="flex-shrink pr-4">
              <div className="rounded-full p-3 bg-blue-600">
                <i className="fa fa-university fa-2x fa-inverse"></i>
              </div>
            </div>
            <div className="flex-1 text-right md:text-center">
              <h5 className="font-bold uppercase text-gray-500">
                {college.name}
              </h5>
              <h3 className="font-bold text-3xl">
                {college.city}, {college.state}
              </h3>
            </div>
          </div>
          <div className="flex flex-row items-center mt-4">
            <div className="flex-1">
              <p className="text-gray-600 mb-2">{college.courses.join(", ")}</p>
              <p className="text-gray-600">
                No. of Students: {college.no_of_students}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CollegeCard;
