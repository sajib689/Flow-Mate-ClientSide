import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import DashBoardChart from "./dashBoardChart/DashBoardChart";
import CommonButton from "@/components/commonButton/CommonButton";
import ProjectCreate from "@/components/projectCreate/ProjectCreate";
import DashBoardCards from "../dashBoardCards/DashBoardCards";
import VisitorInsightsChart from "../visitorInsightsChart/VisitorInsightsChart";
import DashBoardLoginUser from "../dashBoardLoginUser/DashBoardLoginUser";
import DashBoardPaidUser from "../dashBoardPaidUser/DashBoardPaidUser";
import DashBoardSubscriptionUser from "../dashBoardSubscriptionUser/DashBoardSubscriptionUser";
import { Link } from "react-router-dom";

import BoardSystem from "./boardSystem/BoardSystem";

const DashBoardHome = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toggleOpen, setToggleOpen] = useState(false);

  // Toggle create task dropdown
  const toggleHandler = () => {
    setToggleOpen(!toggleOpen);
  };

  // Toggle user profile dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="mb-20">
      {/* Navbar */}
      <nav className="absolute top-0 right-0 h-16">
        <div className="p-4">
          <div className="flex justify-between gap-5 items-center">
            <div className="flex items-center justify-between space-x-4 lg:space-x-9 ml-auto">
              {/* Create Button */}
              <div className="relative" onClick={toggleHandler}>
                <CommonButton text="Create" />
              </div>
              {toggleOpen && <ProjectCreate />}

              {/* Notification Bell */}
              <FaBell className="h-6 w-6" />

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    className="h-10 w-10 rounded-full border-2 border-white"
                    src={user?.photoURL}
                    alt="Avatar"
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                    <a
                      href="#profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      <Link to="/dashboard/dbprofile">Profile</Link>
                    </a>
                    <a
                      href="#logout"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="lg:flex flex-1 my-10">
        {/* User Dashboard Section */}
        <div className="lg:ml-16 bg-gray-200 p-10 rounded-2xl shadow-lg hover:shadow-sky-100 w-full">
          <h1 className="mb-2 font-bold text-2xl">FlowMate User Dashboard</h1>
          <p className="text-gray-500 text-sm mb-4">
            Here is some user information
          </p>
          <DashBoardCards />
        </div>

        {/* Board System */}
        <div className="mx-10 my-10">
          <BoardSystem />
        </div>
      </div>

      {/* User Stats */}
      <div className="lg:flex lg:justify-evenly mx-auto flex-1"></div>

      {/* Charts and Graphs */}
      <div className="flex lg:flex-row flex-col justify-between mx-14 my-10 gap-6">
        {/* Visitor Insights Chart */}
        <div className="flex-1 bg-white rounded-2xl">
          <VisitorInsightsChart />
        </div>

        {/* Round Graph */}
        <div className="bg-white rounded-2xl h-96 p-10"></div>
      </div>
    </div>
  );
};

export default DashBoardHome;
