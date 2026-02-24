import React, { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaUser,
  FaBook,
  FaHeart,
  FaStar,
  FaHistory,
  FaShoppingBag,
  FaBullhorn,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaBookOpen,
  FaTv,
  FaAward,
  FaUserFriends,
  FaGift,
  FaDollarSign,
  FaArrowRight,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaPhone,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminProfile from "../components/AdminComponents/AdminProfile";
import Category from "../components/AdminComponents/CategoryManager";
import Course from "../components/AdminComponents/CourseManager";
import FaqManager from "../components/AdminComponents/FaqManager";
import ModuleManager from "../components/AdminComponents/ModuleManager";
import TopicManager from "../components/AdminComponents/TopicManager";
import TestimonialManager from "../components/AdminComponents/TestimonialManager";
import RegisterMessageManager from "../components/AdminComponents/RegisterMessageManager";
import ArticleManager from "../components/AdminComponents/ArticleManager";
import BannerManager from "../components/AdminComponents/BannerManager";
import ContactUs from "../components/AdminComponents/ContactUs";
import Enroll from "../components/AdminComponents/Enroll";

// --- COUNT UP COMPONENT ---
const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const numberPart = parseInt(end.toString().replace(/,/g, ""), 10);
  const suffix = end.toString().replace(/[0-9,]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const totalFrames = (duration / 1000) * 60;
    const increment = numberPart / totalFrames;
    const timer = setInterval(() => {
      start += increment;
      if (start >= numberPart) {
        setCount(numberPart);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isVisible, numberPart, duration]);

  return (
    <span ref={countRef}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// --- ADMIN DROPDOWN COMPONENT (for header) - UPDATED: Removed Profile and Settings ---
const AdminDropdown = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors group"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
          JD
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold text-slate-700">Jone Due</p>
          <p className="text-xs text-violet-500">Administrator</p>
        </div>
        <FaChevronDown
          className={`text-slate-400 text-xs transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu - Now only shows Logout */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <FaSignOutAlt className="text-sm" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

// --- NAV ITEM COMPONENT ---
const NavItem = ({
  label,
  icon,
  tabKey,
  activeTab,
  setActiveTab,
  closeSidebar,
}) => {
  const isActive = activeTab === tabKey;
  return (
    <button
      onClick={() => {
        setActiveTab(tabKey);
        closeSidebar && closeSidebar();
      }}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group relative overflow-hidden ${
        isActive
          ? "bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-lg shadow-violet-200"
          : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
      }`}
    >
      {icon && (
        <span
          className={`text-base flex-shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-violet-500"}`}
        >
          {icon}
        </span>
      )}
      <span className="truncate">{label}</span>
      {isActive && <FaChevronRight className="ml-auto text-xs opacity-70" />}
    </button>
  );
};

// --- MAIN DASHBOARD COMPONENT ---
const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
    window.location.reload();
  };

  const closeSidebar = () => setSidebarOpen(false);

  const stats = [
    {
      id: 1,
      count: "30",
      label: "Enrolled Courses",
      icon: <FaBookOpen />,
      gradient: "from-blue-500 to-cyan-400",
      light: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      id: 2,
      count: "10",
      label: "Active Courses",
      icon: <FaTv />,
      gradient: "from-violet-500 to-purple-400",
      light: "bg-violet-50",
      text: "text-violet-600",
    },
    {
      id: 3,
      count: "7",
      label: "Completed Courses",
      icon: <FaAward />,
      gradient: "from-indigo-500 to-blue-400",
      light: "bg-indigo-50",
      text: "text-indigo-600",
    },
    {
      id: 4,
      count: "160",
      label: "Total Students",
      icon: <FaUserFriends />,
      gradient: "from-rose-500 to-pink-400",
      light: "bg-rose-50",
      text: "text-rose-600",
    },
    {
      id: 5,
      count: "20",
      label: "Total Courses",
      icon: <FaGift />,
      gradient: "from-orange-500 to-amber-400",
      light: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      id: 6,
      count: "25,000+",
      label: "Total Earnings",
      icon: <FaDollarSign />,
      gradient: "from-emerald-500 to-teal-400",
      light: "bg-emerald-50",
      text: "text-emerald-600",
    },
  ];

  const navItems = [
    { label: "Dashboard", icon: <FaHome />, tabKey: "dashboard" },
    { label: "Category", icon: <FaClipboardList />, tabKey: "category" },
    { label: "Course", icon: <FaBook />, tabKey: "Course" },
    { label: "FAQ Manager", icon: <FaBullhorn />, tabKey: "FaqManager" },
    { label: "Modules", icon: <FaBookOpen />, tabKey: "ModuleManager" },
    { label: "Topics", icon: <FaStar />, tabKey: "TopicManager" },
    { label: "Banner Manager", icon: <FaTv />, tabKey: "BannerManager" },
    { label: "Testimonials", icon: <FaHeart />, tabKey: "TestimonialManager" },
    {
      label: "Register Manager",
      icon: <FaUserFriends />,
      tabKey: "RegisterMessageManager",
    },
    { label: "Article Manager", icon: <FaHistory />, tabKey: "ArticleManager" },
    { label: "Contact us", icon: <FaPhone />, tabKey: "ContactUs" },
    { label: "Enroll", icon: <FaShoppingBag />, tabKey: "Enroll" },
  ];

  const activeLabel =
    navItems.find((n) => n.tabKey === activeTab)?.label || "Dashboard";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo / Brand */}
      <div className="px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center shadow-md">
            <FaCog className="text-white text-sm" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 leading-none">
              AdminPanel
            </p>
            <p className="text-xs text-slate-400 mt-0.5">Management Suite</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 mt-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
          Main Menu
        </p>
        <nav className="space-y-0.5">
          {navItems.map((item) => (
            <NavItem
              key={item.tabKey}
              {...item}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              closeSidebar={closeSidebar}
            />
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-gray-800">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="w-64 bg-white border-r border-slate-100 flex-shrink-0 hidden md:flex flex-col h-screen sticky top-0 shadow-sm">
        <SidebarContent />
      </aside>

      {/* --- SIDEBAR (Mobile Drawer) --- */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-40 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <FaTimes className="text-sm" />
        </button>
        <SidebarContent />
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top header bar with admin section */}
        <header className="bg-white border-b border-slate-100 px-4 sm:px-6 py-2 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-violet-100 hover:text-violet-600 transition-colors"
            >
              <FaBars />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-800">
                {activeLabel}
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Welcome back, Jone Due
              </p>
            </div>
          </div>

          {/* Admin Section in header - Updated to remove Profile and Settings */}
          <AdminDropdown handleLogout={handleLogout} />
        </header>

        {/* Page content */}
        <div className="flex-1 p-4 sm:p-6">
          {/* Dashboard Stats */}
          {activeTab === "dashboard" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
                <p className="text-slate-500 text-sm mt-1">
                  Here's what's happening with your platform today.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white text-lg shadow-md group-hover:scale-110 transition-transform duration-300`}
                      >
                        {stat.icon}
                      </div>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stat.light} ${stat.text}`}
                      >
                        Active
                      </span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-slate-800 mb-1">
                      <CountUp end={stat.count} />
                    </h3>
                    <p className="text-slate-500 text-sm font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All other tab views */}
          {activeTab === "category" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Category Manager
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Manage all your course categories here.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                <Category />
              </div>
            </div>
          )}

          {activeTab === "Course" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Course Manager
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Create and manage your courses.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                <Course />
              </div>
            </div>
          )}

          {activeTab === "FaqManager" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  FAQ Manager
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Manage frequently asked questions.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                <FaqManager />
              </div>
            </div>
          )}

          {activeTab === "ModuleManager" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Module Manager
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Organize your course modules.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                <ModuleManager />
              </div>
            </div>
          )}

          {activeTab === "TopicManager" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Topic Manager
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Manage topics within your modules.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                <TopicManager />
              </div>
            </div>
          )}

          {activeTab === "BannerManager" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Banner Manager
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Control your site banners and promotions.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                <BannerManager />
              </div>
            </div>
          )}

          {activeTab === "TestimonialManager" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Testimonial Manager
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Showcase student reviews and testimonials.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                <TestimonialManager />
              </div>
            </div>
          )}

          {activeTab === "RegisterMessageManager" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Register Message Manager
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Manage registration messages and notifications.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                <RegisterMessageManager />
              </div>
            </div>
          )}

          {activeTab === "ArticleManager" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Article Manager
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Write and publish platform articles.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                <ArticleManager />
              </div>
            </div>
          )}

          {activeTab === "ContactUs" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Contact Messages
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  View and manage contact form submissions.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                <ContactUs />
              </div>
            </div>
          )}

          {activeTab === "Enroll" && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Enrollments
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  Manage student enrollments and applications.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                <Enroll />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;