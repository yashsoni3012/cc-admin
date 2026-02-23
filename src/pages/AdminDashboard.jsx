import React, { useState, useEffect, useRef } from 'react';
import {
    FaHome, FaUser, FaBook, FaHeart, FaStar, FaHistory, FaShoppingBag,
    FaBullhorn, FaClipboardList, FaCog, FaSignOutAlt, FaBookOpen,
    FaTv, FaAward, FaUserFriends, FaGift, FaDollarSign, FaArrowRight
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AdminProfile from '../components/AdminComponents/AdminProfile'
import Category from '../components/AdminComponents/CategoryManager'
import Course from '../components/AdminComponents/CourseManager'
import FaqManager from '../components/AdminComponents/FaqManager'
import ModuleManager from '../components/AdminComponents/ModuleManager'
import TopicManager from '../components/AdminComponents/TopicManager'
import TestimonialManager from '../components/AdminComponents/TestimonialManager'
import RegisterMessageManager from '../components/AdminComponents/RegisterMessageManager'
import ArticleManager from '../components/AdminComponents/ArticleManager'
// --- 1. DUMMY ADMIN PROFILE COMPONENT (Content to show when clicked) ---

import BannerManager from '../components/AdminComponents/BannerManager';

// --- 2. COUNT UP COMPONENT ---
const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const numberPart = parseInt(end.toString().replace(/,/g, ''), 10);
    const suffix = end.toString().replace(/[0-9,]/g, '');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
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

    return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
};


// --- 3. MAIN DASHBOARD COMPONENT ---
const Dashboard = () => {
    const navigate = useNavigate();

    // --- STATE TO TRACK WHICH TAB IS ACTIVE ---
    const [activeTab, setActiveTab] = useState('dashboard'); // Default is 'dashboard'

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/login');
        window.location.reload();
    };

    const stats = [
        { id: 1, count: "30", label: "Enrolled Courses", icon: <FaBookOpen />, bg: "bg-[#F0F4FF]", color: "text-[#5B8EFF]", iconBg: "bg-[#DDE7FF]" },
        { id: 2, count: "10", label: "Active Courses", icon: <FaTv />, bg: "bg-[#FDF0FF]", color: "text-[#C65BFF]", iconBg: "bg-[#F4D9FF]" },
        { id: 3, count: "7", label: "Completed Courses", icon: <FaAward />, bg: "bg-[#F4E9FA]", color: "text-[#9E5BFF]", iconBg: "bg-[#E6D4F5]" },
        { id: 4, count: "160", label: "Total Students", icon: <FaUserFriends />, bg: "bg-[#FFF0F2]", color: "text-[#FF5B7A]", iconBg: "bg-[#FFDDE3]" },
        { id: 5, count: "20", label: "Total Courses", icon: <FaGift />, bg: "bg-[#FFF4EB]", color: "text-[#FF9F43]", iconBg: "bg-[#FFE0CC]" },
        { id: 6, count: "25,000+", label: "Total Earnings", icon: <FaDollarSign />, bg: "bg-[#FFFBF0]", color: "text-[#FFC05B]", iconBg: "bg-[#FFF5D9]" },
    ];

    return (
        <div className="">
            <div className="min-h-screen bg-white flex font-sans text-gray-800">

                {/* --- SIDEBAR --- */}
                {/* --- SIDEBAR --- */}
                <aside className="w-64 border-r border-gray-200 bg-white flex-shrink-0 hidden md:block ">
                    <div className="p-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
                            Welcome, Jone Due
                        </p>

                        <nav className="space-y-1">

                            {/* 1. DASHBOARD BUTTON */}
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'dashboard'
                                    ? 'bg-[#4522f0] text-white' // ACTIVE STATE
                                    : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
                                    }`}
                            >
                                <FaHome /> Dashboard
                            </button>

                            {/* 2. MY PROFILE BUTTON */}
                            {/* <button
                                onClick={() => setActiveTab('profile')}
                                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'profile'
                                    ? 'bg-[#4522f0] text-white' // ACTIVE STATE
                                    : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
                                    }`}
                            >
                                <FaUser /> My Profile
                            </button> */}

                            <button
                                onClick={() => setActiveTab('category')}
                                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'category'
                                    ? 'bg-[#4522f0] text-white' // ACTIVE STATE
                                    : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
                                    }`}
                            >
                                Category
                            </button>

                            <button
                                onClick={() => setActiveTab('Course')}
                                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'Course'
                                    ? 'bg-[#4522f0] text-white' // ACTIVE STATE
                                    : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
                                    }`}
                            >
                                Course
                            </button>

                            <button
                                onClick={() => setActiveTab('FaqManager')}
                                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'FaqManager'
                                    ? 'bg-[#4522f0] text-white' // ACTIVE STATE
                                    : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
                                    }`}
                            >
                                FaqManager
                            </button>

                            <button
                                onClick={() => setActiveTab('ModuleManager')}
                                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'ModuleManager'
                                    ? 'bg-[#4522f0] text-white' // ACTIVE STATE
                                    : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
                                    }`}
                            >
                                Modules
                            </button>

                            <button
                                onClick={() => setActiveTab('TopicManager')}
                                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'TopicManager'
                                    ? 'bg-[#4522f0] text-white' // ACTIVE STATE
                                    : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
                                    }`}
                            >
                                Topics
                            </button>

                            <button
                                onClick={() => setActiveTab('BannerManager')}
                                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'BannerManager'
                                    ? 'bg-[#4522f0] text-white' // ACTIVE STATE
                                    : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
                                    }`}
                            >
                                Banner Manager
                            </button>

                            <button
                                onClick={() => setActiveTab('TestimonialManager')}
                                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'TestimonialManager'
                                    ? 'bg-[#4522f0] text-white' // ACTIVE STATE
                                    : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
                                    }`}
                            >
                                Testimonial Manager
                            </button>

                            <button
                                onClick={() => setActiveTab('RegisterMessageManager')}
                                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'RegisterMessageManager'
                                    ? 'bg-[#4522f0] text-white' // ACTIVE STATE
                                    : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
                                    }`}
                            >
                                Register Manager
                            </button>

                           

                            <button
                                onClick={() => setActiveTab('ArticleManager')}
                                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'ArticleManager'
                                    ? 'bg-[#4522f0] text-white' // ACTIVE STATE
                                    : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
                                    }`}
                            >
                                Article Manager
                            </button>

                           
                        </nav>

                        
                        {/* USER SECTION */}
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-8 mb-4">User</p>
                        <nav className="space-y-1">
                            <div className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#6A4DF4] rounded-lg font-medium transition-colors cursor-pointer">
                                <FaSignOutAlt />
                                <button onClick={handleLogout} className="text-red-500 text-sm font-medium">Logout</button>
                            </div>
                        </nav>
                    </div>
                </aside>

                {/* --- MAIN CONTENT (Changes based on activeTab) --- */}
                <main className="flex-1  bg-white">

                    {/* CONDITIONAL RENDERING */}

                    <div className='p-4'>

                        {/* 1. Show Dashboard Stats if activeTab is 'dashboard' */}
                        {activeTab === 'dashboard' && (
                            <>
                                <h2 className="text-3xl font-bold text-[#1a1a2e] mb-8">Dashboard</h2>
                                <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-12">
                                    {stats.map((stat) => (
                                        <div key={stat.id} className={`${stat.bg} p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300`}>
                                            <div className={`${stat.iconBg} ${stat.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm`}>
                                                {stat.icon}
                                            </div>
                                            <h3 className={`text-3xl font-extrabold ${stat.color} mb-2`}>
                                                <CountUp end={stat.count} />
                                            </h3>
                                            <p className={`${stat.color} opacity-80 text-xs font-bold uppercase tracking-wider`}>
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                    </div>

                    <div className='-mt-8'>

                        {/* 2. Show Admin Profile if activeTab is 'profile' */}
                        {activeTab === 'profile' && (
                            <AdminProfile />
                        )}
                    </div>


                    <div className=''>

                        {activeTab === 'category' && (
                            <div>
                                <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
                                    Category Manager
                                </h1>
                                <Category />
                            </div>
                        )}

                    </div>

                    <div className=''>

                        {activeTab === 'Course' && (
                            <div>
                                <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
                                    Course Manager
                                </h1>
                                <Course />
                            </div>
                        )}

                    </div>

                    <div className=''>

                        {activeTab === 'FaqManager' && (
                            <div>
                                <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
                                    Faq Manager
                                </h1>
                                <FaqManager />
                            </div>
                        )}

                    </div>

                    <div className=''>

                        {activeTab === 'ModuleManager' && (
                            <div>
                                <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
                                    Faq Manager
                                </h1>
                                <ModuleManager />
                            </div>
                        )}

                    </div>

                    <div className=''>

                        {activeTab === 'TopicManager' && (
                            <div>
                                <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
                                    Topic Manager
                                </h1>
                                <TopicManager />
                            </div>
                        )}

                    </div>

                    <div className=''>

                        {activeTab === 'BannerManager' && (
                            <div>
                                <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
                                    Topic Manager
                                </h1>
                                <BannerManager />
                            </div>
                        )}

                    </div>



                    <div className=''>

                        {activeTab === 'TestimonialManager' && (
                            <div>
                                <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
                                    Testimonial Manager
                                </h1>
                                <TestimonialManager />
                            </div>
                        )}

                    </div>



                    <div className=''>

                        {activeTab === 'RegisterMessageManager' && (
                            <div>
                                <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
                                    Register Message Manager
                                </h1>
                                <RegisterMessageManager />
                            </div>
                        )}

                    </div>
                    <div className=''>

                        {activeTab === 'ArticleManager' && (
                            <div>
                                <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
                                    Register Message Manager
                                </h1>
                                <ArticleManager />
                            </div>
                        )}

                    </div>


                </main>
            </div>
        </div>
    );
};

export default Dashboard;