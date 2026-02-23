// import React, { useState, useEffect, useRef } from 'react';
// import {
//     FaHome, FaUser, FaBook, FaHeart, FaStar, FaHistory, FaShoppingBag,
//     FaBullhorn, FaClipboardList, FaCog, FaSignOutAlt, FaBookOpen,
//     FaTv, FaAward, FaUserFriends, FaGift, FaDollarSign, FaArrowRight
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import AdminProfile from '../components/AdminComponents/AdminProfile'
// import Category from '../components/AdminComponents/CategoryManager'
// import Course from '../components/AdminComponents/CourseManager'
// import FaqManager from '../components/AdminComponents/FaqManager'
// import ModuleManager from '../components/AdminComponents/ModuleManager'
// import TopicManager from '../components/AdminComponents/TopicManager'
// import TestimonialManager from '../components/AdminComponents/TestimonialManager'
// import RegisterMessageManager from '../components/AdminComponents/RegisterMessageManager'
// import ArticleManager from '../components/AdminComponents/ArticleManager'
// // --- 1. DUMMY ADMIN PROFILE COMPONENT (Content to show when clicked) ---

// import BannerManager from '../components/AdminComponents/BannerManager';

// // --- 2. COUNT UP COMPONENT ---
// const CountUp = ({ end, duration = 2000 }) => {
//     const [count, setCount] = useState(0);
//     const countRef = useRef(null);
//     const [isVisible, setIsVisible] = useState(false);

//     const numberPart = parseInt(end.toString().replace(/,/g, ''), 10);
//     const suffix = end.toString().replace(/[0-9,]/g, '');

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     setIsVisible(true);
//                     observer.disconnect();
//                 }
//             },
//             { threshold: 0.5 }
//         );
//         if (countRef.current) observer.observe(countRef.current);
//         return () => observer.disconnect();
//     }, []);

//     useEffect(() => {
//         if (!isVisible) return;
//         let start = 0;
//         const totalFrames = (duration / 1000) * 60;
//         const increment = numberPart / totalFrames;
//         const timer = setInterval(() => {
//             start += increment;
//             if (start >= numberPart) {
//                 setCount(numberPart);
//                 clearInterval(timer);
//             } else {
//                 setCount(Math.floor(start));
//             }
//         }, 1000 / 60);
//         return () => clearInterval(timer);
//     }, [isVisible, numberPart, duration]);

//     return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
// };


// // --- 3. MAIN DASHBOARD COMPONENT ---
// const Dashboard = () => {
//     const navigate = useNavigate();

//     // --- STATE TO TRACK WHICH TAB IS ACTIVE ---
//     const [activeTab, setActiveTab] = useState('dashboard'); // Default is 'dashboard'

//     const handleLogout = () => {
//         localStorage.removeItem('isAdmin');
//         navigate('/login');
//         window.location.reload();
//     };

//     const stats = [
//         { id: 1, count: "30", label: "Enrolled Courses", icon: <FaBookOpen />, bg: "bg-[#F0F4FF]", color: "text-[#5B8EFF]", iconBg: "bg-[#DDE7FF]" },
//         { id: 2, count: "10", label: "Active Courses", icon: <FaTv />, bg: "bg-[#FDF0FF]", color: "text-[#C65BFF]", iconBg: "bg-[#F4D9FF]" },
//         { id: 3, count: "7", label: "Completed Courses", icon: <FaAward />, bg: "bg-[#F4E9FA]", color: "text-[#9E5BFF]", iconBg: "bg-[#E6D4F5]" },
//         { id: 4, count: "160", label: "Total Students", icon: <FaUserFriends />, bg: "bg-[#FFF0F2]", color: "text-[#FF5B7A]", iconBg: "bg-[#FFDDE3]" },
//         { id: 5, count: "20", label: "Total Courses", icon: <FaGift />, bg: "bg-[#FFF4EB]", color: "text-[#FF9F43]", iconBg: "bg-[#FFE0CC]" },
//         { id: 6, count: "25,000+", label: "Total Earnings", icon: <FaDollarSign />, bg: "bg-[#FFFBF0]", color: "text-[#FFC05B]", iconBg: "bg-[#FFF5D9]" },
//     ];

//     return (
//         <div className="">
//             <div className="min-h-screen bg-white flex font-sans text-gray-800">

//                 {/* --- SIDEBAR --- */}
//                 {/* --- SIDEBAR --- */}
//                 <aside className="w-64 border-r border-gray-200 bg-white flex-shrink-0 hidden md:block ">
//                     <div className="p-6">
//                         <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
//                             Welcome, Jone Due
//                         </p>

//                         <nav className="space-y-1">

//                             {/* 1. DASHBOARD BUTTON */}
//                             <button
//                                 onClick={() => setActiveTab('dashboard')}
//                                 className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'dashboard'
//                                     ? 'bg-[#4522f0] text-white' // ACTIVE STATE
//                                     : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
//                                     }`}
//                             >
//                                 <FaHome /> Dashboard
//                             </button>

//                             {/* 2. MY PROFILE BUTTON */}
//                             {/* <button
//                                 onClick={() => setActiveTab('profile')}
//                                 className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'profile'
//                                     ? 'bg-[#4522f0] text-white' // ACTIVE STATE
//                                     : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
//                                     }`}
//                             >
//                                 <FaUser /> My Profile
//                             </button> */}

//                             <button
//                                 onClick={() => setActiveTab('category')}
//                                 className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'category'
//                                     ? 'bg-[#4522f0] text-white' // ACTIVE STATE
//                                     : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
//                                     }`}
//                             >
//                                 Category
//                             </button>

//                             <button
//                                 onClick={() => setActiveTab('Course')}
//                                 className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'Course'
//                                     ? 'bg-[#4522f0] text-white' // ACTIVE STATE
//                                     : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
//                                     }`}
//                             >
//                                 Course
//                             </button>

//                             <button
//                                 onClick={() => setActiveTab('FaqManager')}
//                                 className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'FaqManager'
//                                     ? 'bg-[#4522f0] text-white' // ACTIVE STATE
//                                     : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
//                                     }`}
//                             >
//                                 FaqManager
//                             </button>

//                             <button
//                                 onClick={() => setActiveTab('ModuleManager')}
//                                 className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'ModuleManager'
//                                     ? 'bg-[#4522f0] text-white' // ACTIVE STATE
//                                     : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
//                                     }`}
//                             >
//                                 Modules
//                             </button>

//                             <button
//                                 onClick={() => setActiveTab('TopicManager')}
//                                 className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'TopicManager'
//                                     ? 'bg-[#4522f0] text-white' // ACTIVE STATE
//                                     : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
//                                     }`}
//                             >
//                                 Topics
//                             </button>

//                             <button
//                                 onClick={() => setActiveTab('BannerManager')}
//                                 className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'BannerManager'
//                                     ? 'bg-[#4522f0] text-white' // ACTIVE STATE
//                                     : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
//                                     }`}
//                             >
//                                 Banner Manager
//                             </button>

//                             <button
//                                 onClick={() => setActiveTab('TestimonialManager')}
//                                 className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'TestimonialManager'
//                                     ? 'bg-[#4522f0] text-white' // ACTIVE STATE
//                                     : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
//                                     }`}
//                             >
//                                 Testimonial Manager
//                             </button>

//                             <button
//                                 onClick={() => setActiveTab('RegisterMessageManager')}
//                                 className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'RegisterMessageManager'
//                                     ? 'bg-[#4522f0] text-white' // ACTIVE STATE
//                                     : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
//                                     }`}
//                             >
//                                 Register Manager
//                             </button>

                           

//                             <button
//                                 onClick={() => setActiveTab('ArticleManager')}
//                                 className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'ArticleManager'
//                                     ? 'bg-[#4522f0] text-white' // ACTIVE STATE
//                                     : 'text-gray-600 hover:bg-[#3c21bf] hover:text-white' // INACTIVE STATE
//                                     }`}
//                             >
//                                 Article Manager
//                             </button>

                           
//                         </nav>

                        
//                         {/* USER SECTION */}
//                         <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-8 mb-4">User</p>
//                         <nav className="space-y-1">
//                             <div className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-[#6A4DF4] rounded-lg font-medium transition-colors cursor-pointer">
//                                 <FaSignOutAlt />
//                                 <button onClick={handleLogout} className="text-red-500 text-sm font-medium">Logout</button>
//                             </div>
//                         </nav>
//                     </div>
//                 </aside>

//                 {/* --- MAIN CONTENT (Changes based on activeTab) --- */}
//                 <main className="flex-1  bg-white">

//                     {/* CONDITIONAL RENDERING */}

//                     <div className='p-4'>

//                         {/* 1. Show Dashboard Stats if activeTab is 'dashboard' */}
//                         {activeTab === 'dashboard' && (
//                             <>
//                                 <h2 className="text-3xl font-bold text-[#1a1a2e] mb-8">Dashboard</h2>
//                                 <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-12">
//                                     {stats.map((stat) => (
//                                         <div key={stat.id} className={`${stat.bg} p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300`}>
//                                             <div className={`${stat.iconBg} ${stat.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 shadow-sm`}>
//                                                 {stat.icon}
//                                             </div>
//                                             <h3 className={`text-3xl font-extrabold ${stat.color} mb-2`}>
//                                                 <CountUp end={stat.count} />
//                                             </h3>
//                                             <p className={`${stat.color} opacity-80 text-xs font-bold uppercase tracking-wider`}>
//                                                 {stat.label}
//                                             </p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </>
//                         )}

//                     </div>

//                     <div className='-mt-8'>

//                         {/* 2. Show Admin Profile if activeTab is 'profile' */}
//                         {activeTab === 'profile' && (
//                             <AdminProfile />
//                         )}
//                     </div>


//                     <div className=''>

//                         {activeTab === 'category' && (
//                             <div>
//                                 <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
//                                     Category Manager
//                                 </h1>
//                                 <Category />
//                             </div>
//                         )}

//                     </div>

//                     <div className=''>

//                         {activeTab === 'Course' && (
//                             <div>
//                                 <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
//                                     Course Manager
//                                 </h1>
//                                 <Course />
//                             </div>
//                         )}

//                     </div>

//                     <div className=''>

//                         {activeTab === 'FaqManager' && (
//                             <div>
//                                 <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
//                                     Faq Manager
//                                 </h1>
//                                 <FaqManager />
//                             </div>
//                         )}

//                     </div>

//                     <div className=''>

//                         {activeTab === 'ModuleManager' && (
//                             <div>
//                                 <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
//                                     Faq Manager
//                                 </h1>
//                                 <ModuleManager />
//                             </div>
//                         )}

//                     </div>

//                     <div className=''>

//                         {activeTab === 'TopicManager' && (
//                             <div>
//                                 <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
//                                     Topic Manager
//                                 </h1>
//                                 <TopicManager />
//                             </div>
//                         )}

//                     </div>

//                     <div className=''>

//                         {activeTab === 'BannerManager' && (
//                             <div>
//                                 <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
//                                     Topic Manager
//                                 </h1>
//                                 <BannerManager />
//                             </div>
//                         )}

//                     </div>



//                     <div className=''>

//                         {activeTab === 'TestimonialManager' && (
//                             <div>
//                                 <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
//                                     Testimonial Manager
//                                 </h1>
//                                 <TestimonialManager />
//                             </div>
//                         )}

//                     </div>



//                     <div className=''>

//                         {activeTab === 'RegisterMessageManager' && (
//                             <div>
//                                 <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
//                                     Register Message Manager
//                                 </h1>
//                                 <RegisterMessageManager />
//                             </div>
//                         )}

//                     </div>
//                     <div className=''>

//                         {activeTab === 'ArticleManager' && (
//                             <div>
//                                 <h1 className="text-3xl font-bold mb-6 text-gray-800 p-4">
//                                     Register Message Manager
//                                 </h1>
//                                 <ArticleManager />
//                             </div>
//                         )}

//                     </div>

//                 </main>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

import React, { useState, useEffect, useRef } from 'react';
import {
    FaHome, FaUser, FaBook, FaHeart, FaStar, FaHistory, FaShoppingBag,
    FaBullhorn, FaClipboardList, FaCog, FaSignOutAlt, FaBookOpen,
    FaTv, FaAward, FaUserFriends, FaGift, FaDollarSign, FaArrowRight,
    FaBars, FaTimes, FaChevronRight, FaPhone  
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AdminProfile from '../components/AdminComponents/AdminProfile';
import Category from '../components/AdminComponents/CategoryManager';
import Course from '../components/AdminComponents/CourseManager';
import FaqManager from '../components/AdminComponents/FaqManager';
import ModuleManager from '../components/AdminComponents/ModuleManager';
import TopicManager from '../components/AdminComponents/TopicManager';
import TestimonialManager from '../components/AdminComponents/TestimonialManager';
import RegisterMessageManager from '../components/AdminComponents/RegisterMessageManager';
import ArticleManager from '../components/AdminComponents/ArticleManager';
import BannerManager from '../components/AdminComponents/BannerManager';
import ContactUs from '../components/AdminComponents/ContactUs';
import Enroll from '../components/AdminComponents/Enroll';

// --- COUNT UP COMPONENT ---
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

// --- NAV ITEM COMPONENT ---
const NavItem = ({ label, icon, tabKey, activeTab, setActiveTab, closeSidebar }) => {
    const isActive = activeTab === tabKey;
    return (
        <button
            onClick={() => { setActiveTab(tabKey); closeSidebar && closeSidebar(); }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group relative overflow-hidden ${
                isActive
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-lg shadow-violet-200'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
        >
            {icon && <span className={`text-base flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-violet-500'}`}>{icon}</span>}
            <span className="truncate">{label}</span>
            {isActive && <FaChevronRight className="ml-auto text-xs opacity-70" />}
        </button>
    );
};

// --- MAIN DASHBOARD COMPONENT ---
const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/login');
        window.location.reload();
    };

    const closeSidebar = () => setSidebarOpen(false);

    const stats = [
        { id: 1, count: "30", label: "Enrolled Courses", icon: <FaBookOpen />, gradient: "from-blue-500 to-cyan-400", light: "bg-blue-50", text: "text-blue-600" },
        { id: 2, count: "10", label: "Active Courses", icon: <FaTv />, gradient: "from-violet-500 to-purple-400", light: "bg-violet-50", text: "text-violet-600" },
        { id: 3, count: "7", label: "Completed Courses", icon: <FaAward />, gradient: "from-indigo-500 to-blue-400", light: "bg-indigo-50", text: "text-indigo-600" },
        { id: 4, count: "160", label: "Total Students", icon: <FaUserFriends />, gradient: "from-rose-500 to-pink-400", light: "bg-rose-50", text: "text-rose-600" },
        { id: 5, count: "20", label: "Total Courses", icon: <FaGift />, gradient: "from-orange-500 to-amber-400", light: "bg-orange-50", text: "text-orange-600" },
        { id: 6, count: "25,000+", label: "Total Earnings", icon: <FaDollarSign />, gradient: "from-emerald-500 to-teal-400", light: "bg-emerald-50", text: "text-emerald-600" },
    ];

    const navItems = [
        { label: 'Dashboard', icon: <FaHome />, tabKey: 'dashboard' },
        { label: 'Category', icon: <FaClipboardList />, tabKey: 'category' },
        { label: 'Course', icon: <FaBook />, tabKey: 'Course' },
        { label: 'FAQ Manager', icon: <FaBullhorn />, tabKey: 'FaqManager' },
        { label: 'Modules', icon: <FaBookOpen />, tabKey: 'ModuleManager' },
        { label: 'Topics', icon: <FaStar />, tabKey: 'TopicManager' },
        { label: 'Banner Manager', icon: <FaTv />, tabKey: 'BannerManager' },
        { label: 'Testimonials', icon: <FaHeart />, tabKey: 'TestimonialManager' },
        { label: 'Register Manager', icon: <FaUserFriends />, tabKey: 'RegisterMessageManager' },
        { label: 'Article Manager', icon: <FaHistory />, tabKey: 'ArticleManager' },
        { label: 'Contact us', icon:  <FaPhone   />, tabKey: 'ContactUs' },
        { label: 'Enroll', icon:  <FaPhone   />, tabKey: 'Enroll' },
    ];

    const activeLabel = navItems.find(n => n.tabKey === activeTab)?.label || 'Dashboard';

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo / Brand */}
            <div className="px-6 py-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center shadow-md">
                        <FaCog className="text-white text-sm" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-800 leading-none">AdminPanel</p>
                        <p className="text-xs text-slate-400 mt-0.5">Management Suite</p>
                    </div>
                </div>
            </div>

            {/* User greeting */}
            <div className="px-6 py-4">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl border border-violet-100">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        JD
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-700 truncate">Jone Due</p>
                        <p className="text-xs text-violet-500">Administrator</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">Main Menu</p>
                <nav className="space-y-0.5">
                    {navItems.map(item => (
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

            {/* Logout */}
            <div className="px-4 py-4 border-t border-slate-100">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all duration-200 group"
                >
                    <FaSignOutAlt className="group-hover:translate-x-0.5 transition-transform" />
                    Logout
                </button>
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
            <aside className={`fixed top-0 left-0 h-full w-72 bg-white z-40 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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

                {/* Top header bar */}
                <header className="bg-white border-b border-slate-100 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
                    <div className="flex items-center gap-3">
                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-violet-100 hover:text-violet-600 transition-colors"
                        >
                            <FaBars />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-slate-800">{activeLabel}</h1>
                            <p className="text-xs text-slate-400 hidden sm:block">Welcome back, Jone Due</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400 flex items-center justify-center text-white font-bold text-xs shadow">
                            JD
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <div className="flex-1 p-4 sm:p-6">

                    {/* Dashboard Stats */}
                    {activeTab === 'dashboard' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
                                <p className="text-slate-500 text-sm mt-1">Here's what's happening with your platform today.</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                                {stats.map((stat) => (
                                    <div
                                        key={stat.id}
                                        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white text-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                                {stat.icon}
                                            </div>
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stat.light} ${stat.text}`}>Active</span>
                                        </div>
                                        <h3 className="text-3xl font-extrabold text-slate-800 mb-1">
                                            <CountUp end={stat.count} />
                                        </h3>
                                        <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* All other tab views */}
                    {activeTab === 'profile' && <AdminProfile />}

                    {activeTab === 'category' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">Category Manager</h2>
                                <p className="text-slate-500 text-sm mt-1">Manage all your course categories here.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                                <Category />
                            </div>
                        </div>
                    )}

                    {activeTab === 'Course' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">Course Manager</h2>
                                <p className="text-slate-500 text-sm mt-1">Create and manage your courses.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                                <Course />
                            </div>
                        </div>
                    )}

                    {activeTab === 'FaqManager' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">FAQ Manager</h2>
                                <p className="text-slate-500 text-sm mt-1">Manage frequently asked questions.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                                <FaqManager />
                            </div>
                        </div>
                    )}

                    {activeTab === 'ModuleManager' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">Module Manager</h2>
                                <p className="text-slate-500 text-sm mt-1">Organize your course modules.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                                <ModuleManager />
                            </div>
                        </div>
                    )}

                    {activeTab === 'TopicManager' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">Topic Manager</h2>
                                <p className="text-slate-500 text-sm mt-1">Manage topics within your modules.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                                <TopicManager />
                            </div>
                        </div>
                    )}

                    {activeTab === 'BannerManager' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">Banner Manager</h2>
                                <p className="text-slate-500 text-sm mt-1">Control your site banners and promotions.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                                <BannerManager />
                            </div>
                        </div>
                    )}

                    {activeTab === 'TestimonialManager' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">Testimonial Manager</h2>
                                <p className="text-slate-500 text-sm mt-1">Showcase student reviews and testimonials.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                                <TestimonialManager />
                            </div>
                        </div>
                    )}

                    {activeTab === 'RegisterMessageManager' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">Register Message Manager</h2>
                                <p className="text-slate-500 text-sm mt-1">Manage registration messages and notifications.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                                <RegisterMessageManager />
                            </div>
                        </div>
                    )}

                    {activeTab === 'ArticleManager' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">Article Manager</h2>
                                <p className="text-slate-500 text-sm mt-1">Write and publish platform articles.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                                <ArticleManager />
                            </div>
                        </div>
                    )}
                    {activeTab === 'ContactUs' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">Article Manager</h2>
                                <p className="text-slate-500 text-sm mt-1">Write and publish platform articles.</p>
                            </div>
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6">
                                <ContactUs />
                            </div>
                        </div>
                    )}
                    {activeTab === 'Enroll' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">Article Manager</h2>
                                <p className="text-slate-500 text-sm mt-1">Write and publish platform articles.</p>
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