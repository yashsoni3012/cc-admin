import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaFacebookSquare,
  FaLinkedinIn,
  FaTwitter,
  FaChevronUp,
  FaSearch,
  FaFolderMinus,
} from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { RiAdminLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- 1. State to track if user is Admin ---
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // --- 2. Check Browser Storage on Load ---
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isAdmin");
    if (loggedInStatus === "true") {
      setIsAdmin(true);
    }
  }, []);

  // --- 3. Logout Function ---
  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // Delete the "key"
    setIsAdmin(false);
    navigate("/login"); // Go to login page
    window.location.reload(); // Refresh to update UI
  };

  return (
    <header className="header">
      <nav className="h-12 shadow text-sm bg-gray-800 text-gray-400 flex justify-between items-center px-5">
        <ul className=" flex items-center gap-5 px-4">
          <li className="flex items-center gap-2 hover:text-gray-200 cursor-pointer">
            <FaInstagram />
            <p>100K</p>
          </li>

          <li className="flex items-center gap-2 hover:text-gray-200 cursor-pointer">
            <FaFacebookSquare />
            <p>500K</p>
          </li>

          <li className="flex items-center gap-2 hover:text-gray-200 cursor-pointer">
            <IoCallOutline />
            <p>+1-202-555-0174</p>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <p className="bg-blue-600 px-4 py-0.5 rounded-2xl text-amber-50">
            Hot
          </p>
          <p className="h-5 flex gap-1">
            <img
              src="https://histudy.pixcelsthemes.com/livepreview/histudy/assets/images/icons/hand-emojji.svg"
              alt=""
              className="h-5"
            />
            <span>Intro price. Get Histudy for Big Sale -95% off.</span>
          </p>
        </div>

        <div className="flex items-center gap-5 ">
          <div className="icons flex items-center  border-r-2 px-3 ">
            <div className="cursor-pointer transition hover:scale-120 duration-500 ease-in-out  hover:text-gray-50 hover:bg-gray-900 rounded-4xl p-2">
              <FaInstagram />
            </div>
            <div className="cursor-pointer transition hover:scale-120 duration-500 ease-in-out  hover:text-gray-50 hover:bg-gray-900 rounded-4xl p-2">
              <FaFacebookSquare />
            </div>
            <div className="cursor-pointer transition hover:scale-120 duration-500 ease-in-out  hover:text-gray-50 hover:bg-gray-900 rounded-4xl p-2">
              <FaLinkedinIn />
            </div>
            <div className="cursor-pointer transition hover:scale-120 duration-500 ease-in-out  hover:text-gray-50 hover:bg-gray-900 rounded-4xl p-2">
              <FaTwitter />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* LANGUAGE DROPDOWN */}
            <div className="relative group py-4">
              <div className="flex items-center gap-1 cursor-pointer">
                <p className="flex items-center gap-2">
                  <img
                    src="https://flagcdn.com/us.svg"
                    alt="English"
                    className="h-4 w-6 object-cover"
                  />
                  English
                </p>
                <FaChevronUp className="transition-transform group-hover:rotate-180" />
              </div>

              {/* DROPDOWN MENU */}

              <div className="absolute hidden group group-hover:block bg-white text-black shadow-lg rounded-md top-10 left-0 w-32 py-2 z-50">
                <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  {" "}
                  <span>English</span>{" "}
                </p>
                <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  {" "}
                  <span>Hindi</span>
                </p>
                <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  <span>Marathi</span>
                </p>
              </div>
            </div>

            <div className="relative group  py-4">
              <div className="flex items-center gap-1 cursor-pointer ">
                <p> USD </p>
                <FaChevronUp className="group-hover:rotate-180 transition-transform" />
              </div>

              <div className="absolute hidden group group-hover:block bg-white text-black shadow-lg rounded-md top-10 right-0 w-20 py-4 z-50">
                <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  INR
                </p>
                <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  EUR
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav className="bg-gray-100 w-full rel  transform duration-500  ease-in-out flex items-center justify-between  px-4 ">
        <div className="logo shadow-2xl flex gap-5 ">
          <div>
            <h1>Histudy</h1>
          </div>
          <div className="bg-gray-300 py-1 px-4 rounded-full">
            <p>Category</p>
          </div>
        </div>

        <nav className="  bg-gray-100  flex gap-8 items-center transform duration-500  ease-in-out ">
          <ul className={isMenuOpen ? "show" : "flex gap-3 font-bold"}>
            <div className="group ">
              <li className="flex justify-center items-center gap-1 group-hover:text-blue-500  py-5">
                <a href="#home" className="group-hover:text-blue-500 ">
                  Home
                </a>{" "}
                <FaChevronUp className="group-hover:rotate-180 transition duration-400" />
              </li>
              <div className="absolute z-100 left-5 items-center place-items-center justify-center top-28 w-[90%]  bg-gray-800 text-white rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all  duration-500 ease-in-out grid grid-cols-5  gap-4 p-5">
                {/* <div className="absolute  grid grid-cols-5  gap-4 p-5"  > */}
                {/* Grid Items */}

                <div className="relative cursor-pointer group transform transition-transform duration-300 ease-in-out hover:-translate-y-2 group1">
                  <div className="bg-amber-900 h-32 w-50 rounded-2xl  "></div>

                  <p className=" text-white font-bold hidden group-hover:block">
                    HOME
                  </p>
                </div>

                <div className="bg-amber-900 h-32 w-50 rounded-2xl cursor-pointer  transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
                  <p className="opacity-0 translate-y-2 hover:opacity-100 hover:translate-y-0 transition-all duration-300 ease-in-out absolute text-white font-bold">
                    HOME
                  </p>
                </div>

                <div className="bg-amber-900 h-32 w-50 rounded-2xl cursor-pointer  transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
                  <p className="opacity-0 translate-y-2 hover:opacity-100 hover:translate-y-0 transition-all duration-300 ease-in-out absolute text-white font-bold">
                    HOME
                  </p>
                </div>

                <div className="bg-amber-900 h-32 w-50 rounded-2xl cursor-pointer  transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
                  <p className="opacity-0 translate-y-2 hover:opacity-100 hover:translate-y-0 transition-all duration-300 ease-in-out absolute text-white font-bold">
                    HOME
                  </p>
                </div>

                <div className="bg-amber-900 h-32 w-50 rounded-2xl cursor-pointer  transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
                  <p className="opacity-0 translate-y-2 hover:opacity-100 hover:translate-y-0 transition-all duration-300 ease-in-out absolute text-white font-bold">
                    HOME
                  </p>
                </div>

                <div className="bg-amber-900 h-32 w-50 rounded-2xl cursor-pointer  transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
                  <p className="opacity-0 translate-y-2 hover:opacity-100 hover:translate-y-0 transition-all duration-300 ease-in-out absolute text-white font-bold">
                    HOME
                  </p>
                </div>

                <div className="bg-amber-900 h-32 w-50 rounded-2xl cursor-pointer  transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
                  <p className="opacity-0 translate-y-2 hover:opacity-100 hover:translate-y-0 transition-all duration-300 ease-in-out absolute text-white font-bold">
                    HOME
                  </p>
                </div>

                <div className="bg-amber-900 h-32 w-50 rounded-2xl cursor-pointer  transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
                  <p className="opacity-0 translate-y-2 hover:opacity-100 hover:translate-y-0 transition-all duration-300 ease-in-out absolute text-white font-bold">
                    HOME
                  </p>
                </div>

                <div className="bg-amber-900 h-32 w-50 rounded-2xl cursor-pointer  transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
                  <p className="opacity-0 translate-y-2 hover:opacity-100 hover:translate-y-0 transition-all duration-300 ease-in-out absolute text-white font-bold">
                    HOME
                  </p>
                </div>

                <div className="bg-amber-900 h-32 w-50 rounded-2xl cursor-pointer  transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
                  <p className="opacity-0 translate-y-2 hover:opacity-100 hover:translate-y-0 transition-all duration-300 ease-in-out absolute text-white font-bold">
                    HOME
                  </p>
                </div>

                <div className="bg-amber-900 h-32 w-50 rounded-2xl cursor-pointer  transform transition-transform duration-300 ease-in-out hover:-translate-y-2">
                  <p className="opacity-0 translate-y-2 hover:opacity-100 hover:translate-y-0 transition-all duration-300 ease-in-out absolute text-white font-bold">
                    HOME
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <li className="flex justify-center items-center py-5 gap-1 group-hover:text-blue-500">
                <a href="#courses" className="group-hover:text-blue-500">
                  Courses
                </a>
                <FaChevronUp className="group-hover:rotate-180 transition duration-400" />
              </li>

              {/* <div className="absolute w-1/2 mt-5.5"> */}

              <div className="absolute z-100 w-1/2 top-28.5 bg-gray-800 text-white rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all  duration-500 ease-in-out navbar-banner">
                <div className="w-full  bg-black h-30 navbar-banner  ">
                  <div className="w-120 relative text-gray-50 flex flex-col justify-center ">
                    <div className="flex">
                      <div className="bg-black w-30 h-30"></div>
                      <div className="bg-gradient-to-r h-30   from-black to-transparent w-50 p-2 text-gray-50 flex flex-col justify-center "></div>
                    </div>
                    <div className="absolute">
                      <h2 className="font-bold ml-5">Developer Hub</h2>
                      <p className="font-normal ml-5">
                        Start building fast, with code samples, key{" "}
                      </p>
                      <p className="font-normal ml-5">resources and more</p>
                    </div>
                  </div>

                  <div className=" bg-white text-gray-600 flex gap-10 pb-6">
                    <div className=" w-1/2 ml-5 mt-8 ">
                      <p className="text-gray-400 mb-2 ">COURSE LAYOUT</p>

                      <div className="border-gray-300 border-b mb-2"></div>

                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                    </div>

                    <div className="w-1/2 mt-8 mr-5 ">
                      <p className="text-gray-400 mb-2">COURSE LAYOUT</p>

                      <div className="border-gray-300 border-b mb-2"></div>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-gray-300 h-25 font-bold rounded-b-2xl">
                    <div className="flex gap-34 ml-4 mb-2">
                      <div className="hover:text-blue-600 cursor-pointer flex gap-4 items-center justify-center ">
                        <FaFolderMinus />
                        <p>Quick Start Guide</p>
                      </div>
                      <div className="hover:text-blue-600 cursor-pointer flex gap-4 items-center justify-center ">
                        <FaFolderMinus />
                        <p>Quick Start Guide</p>
                      </div>
                    </div>
                    <div className="flex gap-34 ml-4">
                      <div className="hover:text-blue-600  cursor-pointer flex gap-4 items-center justify-center ">
                        <FaFolderMinus />
                        <p>Quick Start Guide</p>
                      </div>
                      <div className="hover:text-blue-600 cursor-pointer flex gap-4 items-center justify-center ">
                        <FaFolderMinus />
                        <p>Quick Start Guide</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <li className="py-5 flex justify-center items-center gap-1 group-hover:text-blue-500 cursor-pointer">
                <span className="">Dashboard</span>
                <FaChevronUp className="group-hover:rotate-180 transition-transform duration-300" />
              </li>

              <div className="absolute z-100 w-60 top-14 left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-40">
                <div className="p-4">
                  <div className="relative group/sub">
                    <div className="flex justify-between items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg cursor-pointer">
                      <span className=" ">Instructor Dashboard</span>
                      <span className="text-gray-400">›</span>
                    </div>

                    <div className="absolute -right-51 top-0 ml-1 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 z-50 -mt-4">
                      <div className="p-4 border-l-2 border-blue-100">
                        <p className="mb-3 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                          Dashboard
                        </p>
                        <p className="mb-3 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                          Profile
                        </p>
                        <p className="mb-3 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                          Enroll Courses
                        </p>
                        <p className="mb-3 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                          Wishlist
                        </p>
                        <p className="mb-3 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                          Reviews
                        </p>
                        <p className="mb-3 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                          Messages
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Student Dashboard */}
                  <div className="relative group/sub">
                    <div className="flex justify-between items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg cursor-pointer">
                      <span className=" ">Student Dashboard</span>
                      <span className="text-gray-400">›</span>
                    </div>

                    <div className="absolute -right-51 top-0 ml-1 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 z-50 -mt-4">
                      <div className="p-4 border-l-2 border-blue-100">
                        <p className="mb-3 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                          Dashboard
                        </p>
                        <p className="mb-3 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                          Profile
                        </p>
                        <p className="mb-3 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                          Enroll Courses
                        </p>
                        <p className="mb-3 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                          Wishlist
                        </p>
                        <p className="mb-3 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                          Reviews
                        </p>
                        <p className="mb-3 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded cursor-pointer">
                          Messages
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <li className="flex justify-center items-center py-5 gap-1 group-hover:text-blue-500">
                <a href="#courses" className="">
                  Pages
                </a>
                <FaChevronUp className="group-hover:rotate-180 transition duration-400" />
              </li>

              {/* <div className="absolute w-1/2 mt-5.5"> */}

              <div className="absolute z-100  w-[80%]  left-10 top-28.5 bg-gray-800 text-white rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all  duration-500 ease-in-out navbar-banner">
                <div className="w-full  bg-black h-30 navbar-banner  ">
                  <div className=" bg-white text-gray-600 flex gap-10 pb-6">
                    <div className=" w-1/2 ml-5 mt-8 ">
                      <p className="text-gray-400 mb-2 ">COURSE LAYOUT</p>

                      <div className="border-gray-300 border-b mb-2"></div>

                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                    </div>

                    <div className="w-1/2 mt-8 mr-5 ">
                      <p className="text-gray-400 mb-2">COURSE LAYOUT</p>

                      <div className="border-gray-300 border-b mb-2"></div>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                    </div>

                    <div className="w-1/2 mt-8 mr-5 ">
                      <p className="text-gray-400 mb-2">COURSE LAYOUT</p>

                      <div className="border-gray-300 border-b mb-2"></div>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                    </div>

                    <div className="w-1/2 mt-8 mr-5 ">
                      <div className=" bg-gray-300 h-20 w-60 rounded-t-xl"></div>
                      <div className=" bg-gray-100 h-20 w-60 "></div>
                      <div className=" bg-gray-300 h-20 w-60 "></div>
                      <div className=" bg-gray-100 h-20 w-60 "></div>
                      <div className=" bg-gray-300 h-20 w-60 rounded-b-xl"></div>
                    </div>
                  </div>

                  <div className="p-5 bg-gray-300 h-25 font-bold rounded-b-2xl">
                    <div className="flex gap-34 ml-4 mb-2">
                      <div className="hover:text-blue-600 cursor-pointer flex gap-4 items-center justify-center ">
                        <FaFolderMinus />
                        <p>Quick Start Guide</p>
                      </div>
                      <div className="hover:text-blue-600 cursor-pointer flex gap-4 items-center justify-center ">
                        <FaFolderMinus />
                        <p>Quick Start Guide</p>
                      </div>
                    </div>
                    <div className="flex gap-34 ml-4">
                      <div className="hover:text-blue-600  cursor-pointer flex gap-4 items-center justify-center ">
                        <FaFolderMinus />
                        <p>Quick Start Guide</p>
                      </div>
                      <div className="hover:text-blue-600 cursor-pointer flex gap-4 items-center justify-center ">
                        <FaFolderMinus />
                        <p>Quick Start Guide</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <li className="flex justify-center items-center py-5 gap-1 hover:text-blue-500">
                <a href="#courses" className="hover:text-blue-500">
                  Element
                </a>
                <FaChevronUp className="group-hover:rotate-180 transition duration-400" />
              </li>

              {/* <div className="absolute w-1/2 mt-5.5"> */}

              <div className="absolute z-100 w-[70%]  left-30 top-28.5 bg-gray-800 text-white rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all  duration-500 ease-in-out navbar-banner">
                <div className="w-full  bg-black h-30 navbar-banner  ">
                  <div className=" bg-white text-gray-600 flex gap-10 pb-6">
                    <div className=" w-1/2 ml-5 mt-8 ">
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                    </div>

                    <div className="w-1/2 mt-8 mr-5 ">
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                    </div>

                    <div className="w-1/2 mt-8 mr-5 ">
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                    </div>
                  </div>

                  <div className="p-5 bg-gradient-to-r from-blue-600 to-purple-600 h-20 font-bold rounded-b-2xl flex justify-center items-center">
                    <h1>Visit Histudy Template</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <li className="flex justify-center items-center py-5 gap-1 hover:text-blue-500">
                <a href="#courses" className="hover:text-blue-500">
                  Pages
                </a>
                <FaChevronUp className="group-hover:rotate-180 transition duration-400" />
              </li>

              {/* <div className="absolute w-1/2 mt-5.5"> */}

              <div className="absolute z-100 w-[80%]  left-10 top-28.5 bg-gray-800 text-white rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all  duration-500 ease-in-out navbar-banner">
                <div className="w-full  bg-black h-30 navbar-banner   ">
                  <div className=" bg-white text-gray-600 flex gap-10 pb-6">
                    <div className=" w-1/2 ml-5 mt-8 ">
                      <p className="text-gray-400 mb-2 ">COURSE LAYOUT</p>

                      <div className="border-gray-300 border-b mb-2"></div>

                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                    </div>

                    <div className="w-1/2 mt-8 mr-5 ">
                      <p className="text-gray-400 mb-2">COURSE LAYOUT</p>

                      <div className="border-gray-300 border-b mb-2"></div>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                      <p className=" hover:text-blue-600 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in p-2 px-3 rounded">
                        Filter One Toggle
                      </p>
                    </div>

                    <div className="w-1/2 mt-8 mr-5 ">
                      <div className=" bg-gray-300 h-80 w-60 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ul>

          <div className="flex gap-5 font-bold items-center">
            <div className="flex items-center  border-r-2 px-3 gap-5 ">
              <div>
                <FaSearch />
              </div>
              <div>
                <CiShoppingCart className="h-5 w-5 font-bold" />
              </div>
            </div>

            {/* --- MODIFIED LOGIN SECTION --- */}
            <div className="flex gap-3 items-center font-bold">
              <RiAdminLine />

              {/* Check: If Admin, show "Admin" & "Logout". If not, show "Login" */}
              {isAdmin ? (
                <div className="flex gap-3 items-center">
                  <Link to="/admin" className="text-blue-600">
                    Admin
                  </Link>
                  <span className="text-gray-300 font-light">|</span>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
            {/* ------------------------------- */}

            <div className="border-2 rounded-4xl px-3 py-1 overflow-hidden w-25">
              <p className="animate-slide text-nowrap">Enroll Know</p>
            </div>
          </div>
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
