import React from "react";
import img from "../../../assets/men.webp";
import { Link } from "react-router-dom";

const ForPrice = () => {
  return (
    <div>
      <div className="flex justify-center items-center bg-gray-100">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <div className="flex justify-center items-center">
            <img src={img} alt="Illustration" className="h-60 md:h-80" />
          </div>

          <div className="text-center md:text-left max-w-md">
            <h1 className="text-3xl md:text-5xl text-gray-800 mb-4">
              Flexible Pricing for Every Team
            </h1>
            <p className="text-lg text-gray-500 mb-6">
              Whether you're a small team or a large enterprise, we have the
              right plan for you. Explore our pricing options to find a plan
              that fits your needs and budget.
            </p>
            <Link
              to="/pricing"
              className="px-8 py-3 bg-[#00053d] text-white text-lg rounded-full hover:bg-blue-300 transition"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForPrice;
