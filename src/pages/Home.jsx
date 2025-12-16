import React, { useState, useEffect, useRef } from 'react';
import {
    FaGoogle, FaYelp, FaFacebookF, FaHubspot, FaQuoteRight, FaMicrosoft,
    FaPlay, FaRegBookmark, FaArrowRight, FaUserGraduate, FaLaptopCode,
    FaArrowLeft, FaMapMarkerAlt, FaRegClock, FaCertificate, FaUsers, FaAward,
    FaStar, FaUser, FaPhoneAlt, FaEnvelope, FaHeart, FaBookOpen, FaShoppingCart
} from 'react-icons/fa';
import { GoPeople } from "react-icons/go";
import { LiaBookSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";
import { FiBook } from "react-icons/fi";
import Man from "../assets/Home.png"
import Blob from "../assets/blob2.png"
import KnowAboutUs from '../components/KnowAboutUs';
import TestimonialSection from '../components/TestimonialSection';
import NewsletterSection from '../components/NewsletterSection';


const homeData = {
    badge: "KNOW ABOUT US",
    title: <>Know About Histudy <br /> Learning Platform</>,
    desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.",
    features: [
        {
            id: 1,
            title: "Flexible Classes",
            desc: "It is a long established fact that a reader will be distracted by this on readable content.",
            icon: <FaHeart className="text-red-500 text-2xl" />,
            bg: "bg-red-100"
        },
        {
            id: 2,
            title: "Learn From Anywhere",
            desc: "Sed distinctio repudiandae eos recusandae laborum eaque non eius iure suscipit.",
            icon: <FaBookOpen className="text-blue-600 text-2xl" />,
            bg: "bg-blue-100"
        }
    ]
};


const courses = [
    {
        id: 1,
        title: "React Front To Back",
        lessons: 20,
        students: 40,
        desc: "React Js long fact that a reader will be distracted by the readable.",
        author: "Patrick",
        category: "Languages",
        price: 60,
        oldPrice: 120,
        discount: "-50%",
        rating: 15,
        reviews: 15,
        img: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600",
        action: "Learn More"
    },
    {
        id: 2,
        title: "PHP Beginner + Advanced",
        lessons: 12,
        students: 50,
        desc: "It is a long established fact that a reader will be distracted by the readable.",
        author: "Angela",
        category: "Development",
        price: 60,
        oldPrice: 120,
        discount: "-40%",
        rating: 15,
        reviews: 15,
        img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
        action: "Add To Cart"
    },
    {
        id: 3,
        title: "Angular Zero to Mastery",
        lessons: 8,
        students: 30,
        desc: "Angular Js long fact that a reader will be distracted by the readable.",
        author: "Slaughter",
        category: "Languages",
        price: 80,
        oldPrice: 100,
        discount: "-40%",
        rating: 5,
        reviews: 5,
        img: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
        action: "Learn More"
    }
];

// --- ANIMATED COUNTER ---
const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const numberPart = parseInt(end.toString().replace(/,/g, ''), 10);
    const suffix = end.toString().replace(/[0-9]/g, '');

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }, { threshold: 0.5 });
        if (countRef.current) observer.observe(countRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        const totalFrames = (duration / 1000) * 60;
        const increment = numberPart / totalFrames;
        let currentFrame = 0;
        const counter = setInterval(() => {
            currentFrame++;
            const currentCount = Math.min(Math.floor(increment * currentFrame), numberPart);
            setCount(currentCount);
            if (currentFrame >= totalFrames) { clearInterval(counter); setCount(numberPart); }
        }, 1000 / 60);
        return () => clearInterval(counter);
    }, [isVisible, numberPart, duration]);

    return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
};

const CardSlider = () => {
    const [cards, setCards] = useState([
        {
            id: 1,
            title: "React",
            desc: "It is a long established fact that a reader will be distracted.",
            lessons: 12,
            students: 50,
            color: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)", // Purple like image
            price: 70,
            oldPrice: 120,
            rating: 15,
            tag: "-40% Off",
            img: "https://cdn.pixabay.com/photo/2016/11/29/09/32/concept-1868728_1280.jpg",
        },
        {
            id: 2,
            title: "JavaScript",
            desc: "Mastering the web language.",
            lessons: 18,
            students: 120,
            color: "linear-gradient(135deg, #34d399 0%, #10b981 100%)", // Greenish
            price: 60,
            oldPrice: 100,
            rating: 20,
            tag: "Popular",
            img: "https://cdn.pixabay.com/photo/2015/01/08/18/26/man-593333_640.jpg"
        },
        {
            id: 3,
            title: "UI/UX Design",
            desc: "Designing for user experience.",
            lessons: 20,
            students: 80,
            color: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)", // Pinkish
            price: 50,
            oldPrice: 90,
            rating: 18,
            tag: "New",
            img: "https://cdn.pixabay.com/photo/2016/11/19/14/16/man-1839500_1280.jpg"
        }
    ]);

    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        startX.current = e.clientX;
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const diff = e.clientX - startX.current;
        setDragX(diff);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        const threshold = 100; // Lower threshold for easier swap
        if (dragX > threshold) moveCardToBack();
        else if (dragX < -threshold) moveCardToBack();
        else setDragX(0);
    };

    const moveCardToBack = () => {
        setCards((prev) => {
            const newArr = [...prev];
            const topCard = newArr.shift();
            newArr.push(topCard);
            return newArr;
        });
        setDragX(0);
    };

    return (
        // Adjusted container size to fit the right column
        <div className="slider-container w-full h-[450px] flex items-center justify-center relative">
            <div
                className="card-stack relative w-[280px] h-[380px] cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {cards.map((card, index) => {
                    let style = {};
                    // Logic for stacking cards (Top, Middle, Bottom)
                    if (index === 0) {
                        style = {
                            zIndex: 3,
                            opacity: 1,
                            transform: isDragging ? `translateX(${dragX}px) rotate(${dragX * 0.05}deg)` : `translateX(0) rotate(0)`,
                            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                        };
                    } else if (index === 1) {
                        style = {
                            zIndex: 2,
                            opacity: 1, // Keep opacity high for the layered look
                            transform: 'translateX(15px) translateY(15px) scale(0.95)', // Shift right and down slightly
                            transition: 'all 0.3s ease'
                        };
                    } else {
                        style = {
                            zIndex: 1,
                            opacity: 0.5,
                            transform: 'translateX(30px) translateY(30px) scale(0.90)',
                            transition: 'all 0.3s ease'
                        };
                    }
                    if (index > 2) style.display = 'none';

                    return (
                        <div key={card.id} className="card z-100 absolute top-0 left-0 w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100" style={style}>
                            {/* Card Top Image Section */}
                            <div
                                className={`h-[160px] p-5 relative bg-no-repeat bg-contain bg-bottom bg-cover`}
                                style={{
                                    // backgroundColor: `${card.color}`,
                                    backgroundImage: `url(${card.img})`
                                }}
                            >

                                <div className="">
                                    <h3 className="text-lg font-bold w-2/3 leading-snug"  >Difficult Things About Education.</h3>
                                    <p className="text-xs mt-1 opacity-90">By Jelhana Elena</p>
                                </div>
                                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-bold">
                                    36 Class
                                </div>
                                {/* Badge Circle */}
                                <div className="absolute top-4 right-4 w-10 h-10 bg-[#5d3eff] rounded-full flex items-center justify-center text-[10px] text-white font-bold border-2 border-dashed border-white/50">
                                    <p className="text-center">{card.tag}</p>
                                </div>
                                {/* Character Image inside card */}
                                <div className="absolute bottom-0 right-[-10px] h-[140px] w-[120px]"></div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5">
                                <div className="flex justify-between text-xs text-gray-400 mb-2">
                                    <span>📄 {card.lessons} Lessons</span>
                                    <span>👥 {card.students} Students</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-800 mb-1">{card.title}</h2>
                                <p className="text-xs text-gray-500 line-clamp-2">{card.desc}</p>

                                <div className="flex text-yellow-400 text-xs my-3">
                                    ⭐⭐⭐⭐⭐ <span className="text-gray-400 ml-1">({card.rating})</span>
                                </div>

                                <div className="flex justify-between items-center border-t pt-3 border-gray-100">
                                    <div>
                                        <span className="text-lg font-bold text-gray-800">${card.price}</span>
                                        <span className="text-xs text-gray-400 line-through ml-2">${card.oldPrice}</span>
                                    </div>
                                    <button className="text-xs font-bold text-gray-700 hover:text-blue-600">Learn More →</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};



// --- TESTIMONIAL CARD ---
const TestimonialCard = ({ item }) => {
    const isColor = item.variant === 'color';
    return (
        <div className={`shrink-0 w-[400px] p-8 rounded-2xl mx-4 relative flex flex-col justify-between transition-transform hover:scale-105 ${isColor ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white text-gray-600 shadow-xl border border-gray-100'}`}>
            <div className="flex justify-between items-start mb-6"><div>{item.logo}</div><FaQuoteRight className={`text-4xl opacity-30 ${isColor ? 'text-white' : 'text-gray-300'}`} /></div>
            <p className={`text-lg leading-relaxed mb-8 ${isColor ? 'text-blue-50' : 'text-gray-500'}`}>"{item.text}"</p>
            <div className="flex items-center gap-4">
                <img src={item.img} alt={item.author} className="w-12 h-12 rounded-full object-cover border-2 border-white/20" />
                <div><h4 className={`font-bold ${isColor ? 'text-white' : 'text-gray-900'}`}>{item.author}</h4><p className={`text-sm ${isColor ? 'text-blue-200' : 'text-gray-400'}`}>{item.role}</p></div>
            </div>
        </div>
    );
};

// --- CARD SLIDER (NEW 3D SLIDER) ---

// --- EVENTS SLIDER ---
const EventsSlider = () => {
    const scrollRef = useRef(null);
    const scroll = (direction) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const cardWidth = container.firstChild.offsetWidth + 24;
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative group/slider px-5 flex  justify-center items-center">
            {/* <button onClick={() => scroll('left')} className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-30 bg-white text-[#6A4DF4] w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#6A4DF4] hover:text-white transition-all duration-300 opacity-0 group-hover/slider:opacity-100"><FaArrowLeft /></button> */}
            <div onClick={() => scroll('left')} className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-30 bg-[#4F5DE4] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-700 transition-colors z-20 hover:text-white transition-all duration-300 opacity-0 group-hover/slider:opacity-100"><FaArrowLeft /></div>
            <div onClick={() => scroll('right')} className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-30 bg-[#4F5DE4] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-700 transition-colors z-20  hover:text-white transition-all duration-300 opacity-0 group-hover/slider:opacity-100"><FaArrowRight /></div>
            {/* <button onClick={() => scroll('right')} className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-30 bg-white text-[#6A4DF4] w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#6A4DF4] hover:text-white transition-all duration-300 opacity-0 group-hover/slider:opacity-100"><FaArrowRight /></button> */}

            <div ref={scrollRef} id="events-container" className="flex overflow-x-auto gap-6 pb-10 px-4 md:px-8  w-12/13  hide-scrollbar snap-x snap-mandatory scroll-smooth ">
                {[
                    { id: 1, date: "11 Mar", title: "Painting Art Contest 2020", loc: "Vancouver", img: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600" },
                    { id: 2, date: "11 Jan", title: "Elegant Light Box Paper Cut", loc: "IAC Building", img: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=600" },
                    { id: 3, date: "11 Mar", title: "Most Effective Ways for Education", loc: "Vancouver", img: "https://images.pexels.com/photos/1708912/pexels-photo-1708912.jpeg?auto=compress&cs=tinysrgb&w=600" },
                    { id: 4, date: "25 Apr", title: "Digital Marketing Workshop", loc: "New York", img: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=600" }
                ].map((ev) => (
                    <div key={ev.id} className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[350px] bg-white p-6 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform duration-300 group snap-center">
                        <div className="relative mb-6">
                            <div className="h-60 rounded-2xl overflow-hidden">
                                <img src={ev.img} alt="Event" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 right-4 bg-[#8053FF] text-white p-2 rounded-lg text-center min-w-[70px] shadow-lg"><p className="text-sm font-bold">{ev.date}</p><p className="text-xs">2024</p></div>
                            </div>
                            {/* <div className="absolute -bottom-5 -left-5 bg-[#4F5DE4] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-700 transition-colors z-20"><FaArrowLeft /></div> */}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 mt-8"><div className="flex items-center gap-1"> <FaMapMarkerAlt /> {ev.loc} </div><div className="flex items-center gap-1"> <FaRegClock /> 8:00 am - 5:00 pm </div></div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-snug">{ev.title}</h3>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-semibold hover:bg-[#8053FF] hover:text-white hover:border-[#8053FF] transition-all duration-300">Get Ticket <FaArrowRight /></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- TEACHERS SECTION ---
const TeachersSection = () => {
    const teachersData = [
        { id: 1, name: "Mames Mary", role: "English Teacher", location: "CO Margo, AD, USA", desc: "Histudy The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.", phone: "+1-202-555-0174", email: "example@gmail.com", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { id: 2, name: "Julienne Silva", role: "Math Teacher", location: "New York, NY, USA", desc: "Passion for equations and helping students understand complex mathematical concepts simply.", phone: "+1-202-555-0100", email: "math@histudy.com", img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { id: 3, name: "Karen Bloom", role: "Science Teacher", location: "London, UK", desc: "Exploring the wonders of the universe through physics and chemistry experiments.", phone: "+44-20-7946-0123", email: "science@histudy.com", img: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { id: 4, name: "James Anderson", role: "History Teacher", location: "Berlin, Germany", desc: "Bringing the past to life with engaging storytelling and deep historical analysis.", phone: "+49-30-123456", email: "history@histudy.com", img: "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { id: 5, name: "Michael Smith", role: "Art Teacher", location: "Paris, France", desc: "Helping students unleash their creativity through painting, sketching, and sculpture.", phone: "+33-1-23456789", email: "art@histudy.com", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { id: 6, name: "Robert Doe", role: "Music Teacher", location: "Vienna, Austria", desc: "A symphony of learning. Teaching theory, composition, and performance arts.", phone: "+43-1-123456", email: "music@histudy.com", img: "https://images.pexels.com/photos/3777564/pexels-photo-3777564.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ];
    const [activeTeacher, setActiveTeacher] = useState(teachersData[0]);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="max-w-7xl mx-auto px-5">
                <div className="text-center mb-16"><span className="inline-block px-4 py-1 mb-5 text-sm font-bold text-[#6A4DF4] bg-[#F2F0FE] rounded-full uppercase tracking-wider">OUR TEACHER</span><h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">Whose Inspirations You</h2></div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 xl:col-span-8">
                        <div className="bg-white p-6 md:p-10 rounded shadow-2xl flex flex-col md:flex-row gap-8 items-center md:items-start border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-0 translate-x-1/2 -translate-y-1/2"></div>
                            <div className="w-full md:w-5/12 shrink-0 relative z-10"><div className="rounded overflow-hidden aspect-[3/4] shadow-lg"><img src={activeTeacher.img} alt={activeTeacher.name} className="w-full h-full object-cover" /></div></div>
                            <div className="flex-1 w-full relative z-10">
                                <div className="flex justify-between items-start"><div><h3 className="text-3xl font-bold text-gray-900 mb-2">{activeTeacher.name}</h3><p className="text-[#6A4DF4] font-medium mb-4">{activeTeacher.role}</p></div></div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6"><FaMapMarkerAlt className="text-[#6A4DF4]" /><span>{activeTeacher.location}</span></div>
                                <p className="text-gray-500 leading-relaxed mb-8">{activeTeacher.desc}</p>
                                <div className="space-y-3"><div className=" flex items-center gap-3 text-gray-600"><FaPhoneAlt className="text-gray-400" /><span className="font-medium">{activeTeacher.phone}</span></div><div className=" flex items-center gap-3 text-gray-600 "><FaEnvelope className="text-gray-400" /><span className="font-medium">{activeTeacher.email}</span></div></div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-5 xl:col-span-4">
                        <div className="grid grid-cols-3 gap-4">
                            {teachersData.map((teacher) => (
                                <div key={teacher.id} onClick={() => setActiveTeacher(teacher)} className={`relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer group transition-all duration-300 ${activeTeacher.id === teacher.id ? 'ring-4 ring-[#6A4DF4] ring-offset-2' : 'hover:-translate-y-1'}`}>
                                    <img src={teacher.img} alt={teacher.name} className="w-full h-full object-cover" /><div className={`absolute inset-0 transition-opacity duration-300 ${activeTeacher.id === teacher.id ? 'bg-[#6A4DF4]/20' : 'bg-black/0 group-hover:bg-black/10'}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- BLOG SECTION ---
const BlogSection = () => {
    const blogPosts = [
        { id: 1, title: "Why Is Education So Famous?", img: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { id: 2, title: "Difficult Things About Education.", img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { id: 3, title: "Education Is So Famous, But Why?", img: "https://images.pexels.com/photos/4308095/pexels-photo-4308095.jpeg?auto=compress&cs=tinysrgb&w=600" }
    ];
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-5">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div><span className="inline-block px-4 py-1 mb-4 text-sm font-bold text-[#6A4DF4] bg-[#F2F0FE] rounded-full uppercase tracking-wider">BLOG POST</span><h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">Post Popular Post.</h2></div>
                    <button className="bg-[#8053FF] hover:bg-[#6f42ef] text-white px-8 py-3 rounded-lg font-bold shadow-lg transition-colors flex items-center gap-2">See All Articles <FaArrowRight /></button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="cursor-pointer rounded-xl bg-white hover:scale-[1.02] transition-transform duration-300 shadow-md">
                        <div className="rounded-t-xl overflow-hidden mb-6 h-[300px] md:h-[400px]"><img src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Featured" className="w-full h-full object-cover" /></div>
                        <div className="pr-4 px-10 pb-10"><h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#6A4DF4] transition-colors">React</h3><p className="text-gray-500 mb-4 leading-relaxed">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p><button className="text-gray-900 font-bold flex items-center gap-2 transition-colors">Learn More <FaArrowRight /></button></div>
                    </div>
                    <div className="flex flex-col gap-8">
                        {blogPosts.map((post) => (
                            <div key={post.id} className="flex flex-col sm:flex-row items-center gap-6 group cursor-pointer rounded-xl hover:bg-white p-4 transition-colors">
                                <div className="w-full sm:w-48 h-32 shrink-0 overflow-hidden shadow-md rounded-lg"><img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" /></div>
                                <div><h4 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#6A4DF4] transition-colors">{post.title}</h4><button className="text-gray-500 font-bold text-sm flex items-center gap-2 transition-colors">Read Article <FaArrowRight className="text-xs" /></button></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- NEWSLETTER SECTION ---



// --- Course Card Sub-Component ---
const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* --- Top Banner Section --- */}
      <div className="relative bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] p-6 pr-36 h-[220px] text-white">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-20">
            <svg className="h-full w-full" viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,100 C150,200 250,0 400,100" stroke="white" strokeWidth="2" fill="none" />
            </svg>
        </div>

        {/* Banner Content */}
        <div className="relative z-10">
            <h3 className="text-xl font-bold leading-tight mb-2">
                {course.bannerTitle}
            </h3>
            <p className="text-sm font-medium text-purple-200 mb-4">
                By {course.bannerAuthor}
            </p>

            {/* Info Pills */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="bg-white/20 px-3 py-1 rounded-full">{course.classes} Class</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">{course.videos} Videos</span>
                <span className="bg-white/20 px-3 py-1 rounded-full mt-2">{course.students} Enroll Students</span>
            </div>
        </div>

        {/* Instructor Image */}
        <div className="absolute top-4 right-4 w-32 h-full">
            <img
                src={course.instructorImg}
                alt={course.bannerAuthor}
                className="w-full h-full object-cover object-top rounded-tl-[40px] rounded-br-[40px]"
            />
        </div>

        {/* Discount Badge */}
        <div className="absolute bottom-4 right-32 transform translate-x-1/2 bg-white text-[#6D28D9] text-sm font-bold w-14 h-14 rounded-full flex items-center justify-center shadow-md text-center leading-tight">
            {course.discount} <br/> Off
        </div>
      </div>

      {/* --- Card Body --- */}
      <div className="p-6">
        {/* Rating & Bookmark */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-orange-400 text-sm">
            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
            <span className="text-gray-500 ml-2">({course.reviews} Reviews)</span>
          </div>
          <FaRegBookmark className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors" />
        </div>

        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#6D28D9] cursor-pointer transition-colors">
            {course.title}
        </h3>

        {/* Lesson & Student Counts */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 font-medium">
            <span>📖 {course.lessons} Lessons</span>
            <span>👨‍🎓 {course.students} Students</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {course.desc}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-6">
            <img src={course.authorImg} alt={course.author} className="w-8 h-8 rounded-full object-cover" />
            <p className="text-sm text-gray-500">
                By <span className="font-bold text-gray-900">{course.author}</span> In <span className="font-bold text-gray-900">{course.category}</span>
            </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-100 mb-4"></div>

        {/* Price & Action Button */}
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                <span className="text-2xl font-extrabold text-gray-900">${course.price}</span>
                <span className="text-sm text-gray-400 line-through">${course.oldPrice}</span>
            </div>
            
            {course.actionType === "cart" ? (
                <button className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-[#6D28D9] transition-colors">
                    <FaShoppingCart /> Add To Cart
                </button>
            ) : (
                <button className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group">
                    Learn More <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
                </button>
            )}
        </div>
      </div>
    </div>
  );
};


//  MAIN COMPONENT (Home)

function Home() {
    // --- DATA ---
    const stats = [
        { icon: <FaUserGraduate className="text-pink-500 text-3xl" />, number: "500+", label: "Learners & counting", hasGradient: true },
        { icon: <FaLaptopCode className="text-pink-500 text-3xl" />, number: "800+", label: "Courses & Video" },
        { icon: <FaAward className="text-pink-500 text-3xl" />, number: "999+", label: "Certified Students" },
        { icon: <FaUsers className="text-pink-500 text-3xl" />, number: "100+", label: "Registered Enrolls", hasGradient: true },
    ];
    const reviewsRow1 = [
        { id: 1, company: "Google", logo: <FaGoogle className="text-4xl text-red-500" />, text: "The platform is intuitive.", author: "Michael D.", role: "CEO", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "white" },
        { id: 2, company: "Yelp", logo: <FaYelp className="text-4xl text-white" />, text: "Our educational foundation is strong.", author: "Valerie J.", role: "Manager", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "color" },
        { id: 3, company: "Facebook", logo: <FaFacebookF className="text-4xl text-blue-600" />, text: "Connecting with learners globally.", author: "Hannah R.", role: "Director", img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "white" },
        { id: 4, company: "Microsoft", logo: <FaMicrosoft className="text-4xl text-white" />, text: "Scalable learning solutions.", author: "James T.", role: "CTO", img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "color" },
    ];
    const reviewsRow2 = [
        { id: 5, company: "HubSpot", logo: <FaHubspot className="text-4xl text-orange-500" />, text: "Marketing strategies taught here.", author: "Pearl B. Hill", role: "Marketing", img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "white" },
        { id: 6, company: "Bing", logo: <span className="text-4xl font-bold text-white italic">Bing</span>, text: "Search no further.", author: "Martha S.", role: "Developer", img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "color" },
        { id: 7, company: "Google", logo: <FaGoogle className="text-4xl text-red-500" />, text: "Repeating success is a habit.", author: "Robert L.", role: "Analyst", img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "white" },
        { id: 8, company: "Yelp", logo: <FaYelp className="text-4xl text-white" />, text: "Five stars for the curriculum.", author: "Sarah K.", role: "Designer", img: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "color" },
    ];

    const homeData = {
        badge: "KNOW ABOUT US",
        title: <>Know About Histudy <br /> Learning Platform</>,
        desc: "Far far away...",
        features: [
            { id: 1, title: "Flexible Classes", desc: "Readable content.", icon: <CiHeart className="text-red-500 text-2xl" />, bg: "bg-red-100" },
            { id: 2, title: "Learn From Anywhere", desc: "Recusandae laborum.", icon: <FiBook className="text-blue-600 text-2xl" />, bg: "bg-blue-100" }
        ]
    };


     const courses = [
    {
      id: 1,
      bannerTitle: "Difficult Things About Education.",
      bannerAuthor: "Eliana Elena",
      classes: 20,
      videos: 40,
      students: 40,
      discount: "-50%",
      instructorImg: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600", // Replace with actual image
      
      reviews: 15,
      title: "React Front To Back",
      lessons: 20,
      desc: "React Js long fact that a reader will be distracted by the readable.",
      author: "Patrick",
      authorImg: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with actual image
      category: "Languages",
      price: 60,
      oldPrice: 120,
      actionType: "learn"
    },
    {
      id: 2,
      bannerTitle: "Ultimate Revelation Of Education.",
      bannerAuthor: "Willow Emilia",
      classes: 20,
      videos: 50,
      students: 30,
      discount: "-40%",
      instructorImg: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600", // Replace with actual image
      
      reviews: 15,
      title: "PHP Beginner + Advanced",
      lessons: 12,
      desc: "It is a long established fact that a reader will be distracted by the readable.",
      author: "Angela",
      authorImg: "https://randomuser.me/api/portraits/women/44.jpg", // Replace with actual image
      category: "Development",
      price: 60,
      oldPrice: 120,
      actionType: "cart"
    },
    {
      id: 3,
      bannerTitle: "Ten Clarifications On Education.",
      bannerAuthor: "Ariana Emery",
      classes: 30,
      videos: 40,
      students: 50,
      discount: "-40%",
      instructorImg: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600", // Replace with actual image
      
      reviews: 5,
      title: "Angular Zero to Mastery",
      lessons: 8,
      desc: "Angular Js long fact that a reader will be distracted by the readable.",
      author: "Slaughter",
      authorImg: "https://randomuser.me/api/portraits/men/85.jpg", // Replace with actual image
      category: "Languages",
      price: 80,
      oldPrice: 100,
      actionType: "learn"
    }
  ];

    return (
        <div className='bg-white min-h-screen'>


            {/* --- HERO SECTION --- */}
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4 overflow-hidden pt-20">
                <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">

                    {/* --- LEFT SIDE: Text Content (Span 4 cols) --- */}
                    <div className="lg:col-span-4 flex flex-col items-start z-10 space-y-6">
                        <div className="bg-white px-4 py-2 rounded shadow-sm flex items-center gap-2 text-sm font-bold text-gray-700 border border-gray-100">
                            <span className="text-yellow-500 text-lg">🏆</span>
                            The Leader in Online Learning
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-[#1a1a2e] leading-tight">
                            Build The Skills <br /> To Drive Your <br /> Career.
                        </h1>
                        <p className="text-gray-500 text-lg max-w-md">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                            <span className="font-bold text-gray-800"> Velit officia consequat.</span>
                        </p>
                        <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-8 py-4 rounded-lg font-bold shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-all transform hover:scale-105">
                            View Course <FaArrowRight />
                        </button>
                    </div>

                    {/* --- MIDDLE SIDE: Person Image & Blob (Span 4 cols) --- */}
                    <div className="lg:col-span-4 relative flex justify-center items-center h-[500px]">
                        {/* Blob Image (Background) */}
                        <img
                            src={Blob}
                            alt="Background Blob"
                            className="absolute w-[90%] h-[100%] object-contain opacity-80 z-0 scale-125 top-0"
                            style={{ filter: 'blur(0px)' }} // Optional: Add blur if needed
                        />

                        {/* Man Image (Foreground) */}
                        <img
                            src={Man}
                            alt="Student"
                            className="relative z-20 w-full h-full object-contain drop-shadow-2xl"
                            style={{ maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)' }}
                        />
                    </div>

                    {/* --- RIGHT SIDE: Card Slider (Span 4 cols) --- */}
                    <div className="lg:col-span-4 flex justify-center lg:justify-end relative z-15">
                        <CardSlider />
                    </div>

                </div>
            </div>

            {/* CSS FOR ANIMATIONS AND SLIDER */}
            <style>
                {`
                @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                @keyframes marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
                .animate-marquee-left { animation: marquee-left 40s linear infinite; }
                .animate-marquee-right { animation: marquee-right 40s linear infinite; }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                /* CARD SLIDER SPECIFIC CSS */
                .card { backface-visibility: hidden; transform-style: preserve-3d; }
                `}
            </style>


            {/* --- SECTION 1: CATEGORIES --- */}
            <div className="categories flex flex-col items-center justify-center mb-10">
                <div className='p-5 mt-20 py-1 bg-blue-200 text-blue-700 font-bold rounded-4xl'><p>CATEGORIES</p></div>
                <div className='text-4xl font-bold w-1/2 text-center mt-5'><p>Explore Top Course Categories That Change Yourself</p></div>
                <div className='grid grid-cols-4 w-[90%] gap-10 mt-10'>
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className='h-60 shadow-2xl w-57 flex flex-col items-center justify-center bg-gray-100 rounded-xl font-bold hover:-translate-y-2 transition-transform duration-300'>
                            <div className='h-25 w-25 mb-5 bg-amber-900 rounded-full'></div>
                            <h1 className='text-xl mb-3'>Web Developer</h1>
                            <p>25 Courses</p>
                        </div>
                    ))}
                </div>
            </div>



            <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-bold text-[#6D28D9] bg-purple-100 rounded-full uppercase tracking-wider">
            TOP POPULAR COURSE
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Histudy Course student <br /> can join with us.
          </h2>
        </div>

        {/* --- Course Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* --- Footer Button --- */}
        <div className="text-center mt-12">
          <button className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white font-bold py-4 px-8 rounded-lg shadow-md transition-colors inline-flex items-center gap-2">
            Load More Course (40) <FaArrowRight />
          </button>
        </div>

      </div>
    </section>
            <div className='bg-white min-h-screen'>

                <KnowAboutUs data={homeData} />

            </div>

            {/* --- SECTION 4: PROMO CARDS --- */}
            <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-20 ">
                <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 transition-transform hover:-translate-y-1 duration-300 border border-gray-100">
                    <div className="flex-1"><span className="px-4 py-2 rounded-full border border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">New Collection</span><h2 className="text-3xl font-bold mt-5 text-gray-900 leading-tight">Online Courses from Histudy</h2><p className="text-gray-500 mt-3">Top instructors from around the world</p></div>
                    <div className="relative w-full sm:w-48 h-32 shrink-0"><img src="https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Student" className="w-full h-full object-cover rounded-xl shadow-md" /><div className="absolute inset-0 flex items-center justify-center"><div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"><FaPlay className="text-blue-600 text-lg ml-1" /></div></div></div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-xl transition-transform hover:-translate-y-1 duration-300 border border-gray-100">
                    <span className="px-4 py-2 rounded-full border border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">Top Teacher</span><h2 className="text-3xl font-bold mt-5 text-gray-900 leading-tight">Free Online Courses from Histudy School</h2><p className="text-gray-500 mt-3 mb-8">Top instructors from around the world</p>
                    <button className="bg-[#8053FF] hover:bg-[#6f42ef] text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-purple-200 transition-colors flex items-center gap-2">Join Now <FaArrowRight /></button>
                </div>
            </div>

            {/* --- SECTION 5: TIMELINE --- */}
            <section className="py-20 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-5 text-center">
                    <span className="inline-block px-4 py-1 mb-5 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full uppercase tracking-wider">Why Choose Us</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-20">Creating A Community Of <br className="hidden md:block" /> Life Long Learners.</h2>
                    <div className="relative">
                        <div className="hidden md:block absolute top-0 left-0 w-full h-0.5 bg-blue-200"></div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => {
                                const isLower = index === 1 || index === 3;
                                return (
                                    <div key={index} className="relative">
                                        <div className="hidden md:flex flex-col items-center absolute top-0 left-1/2 -translate-x-1/2 w-full -z-0"><div className="w-5 h-5 bg-white border-4 border-blue-600 rounded-full -mt-2.5 z-10"></div><div className={`w-0.5 bg-blue-200 ${isLower ? 'h-24' : 'h-12'}`}></div></div>
                                        <div className={`bg-white overflow-hidden p-8 py-20 rounded-xl shadow-xl relative transition-transform duration-300 hover:-translate-y-2 group ${isLower ? 'mt-0 md:mt-24 ' : 'mt-0 md:mt-12'} `}>
                                            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 ring-8 ring-white">{stat.icon}</div>
                                            <h3 className="text-4xl font-bold text-gray-900"><CountUp end={stat.number} duration={2000} /></h3>
                                            <p className="text-gray-500 mt-2">{stat.label}</p>
                                            <div className="absolute bottom-0 left-0 w-full rounded-4xl h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-b-3xl"></div>
                                            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl pointer-events-none"><div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-100 rounded-full opacity-50 blur-2xl group-hover:bg-purple-200 transition-colors"></div></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 6: TESTIMONIALS (MARQUEE) --- */}
            <div className='bg-white min-h-screen'>
                {/* ... तुमचे Hero Section, About Us, Slider वगैरे इथे ठेवा ... */}



                {/* --- SECTION 6: TESTIMONIALS (NEW COMPONENT) --- */}
                {/* फक्त हा टॅग टाकल्याने तुमचे काम होईल */}
                <TestimonialSection
                    subTitle="EDUCATION FOR EVERYONE"
                    title={<>People like histudy education. <br /> No joking - here’s the proof!</>}
                    row1={reviewsRow1}
                    row2={reviewsRow2}
                />

                {/* ... तुमचे Events, Blog, Newsletter वगैरे इथे ठेवा ... */}

                {/* Animation CSS (हे index.css मध्ये टाकले तरी चालेल) */}
                <style>{`
                @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                @keyframes marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
                .animate-marquee-left { animation: marquee-left 50s linear infinite; }
                .animate-marquee-right { animation: marquee-right 50s linear infinite; }
            `}</style>
            </div>

            {/* --- SECTION 7: UPCOMING EVENTS (SLIDER) --- */}
            <section className="py-24 bg-gradient-to-r from-[#6A4DF4] to-[#A088F8]">
                <div className="max-w-7xl mx-auto relative">
                    <div className="text-center mb-16 px-5">
                        <span className="inline-block px-4 py-1 mb-5 text-sm font-bold text-white bg-white/20 rounded-full uppercase tracking-wider backdrop-blur-sm">SIMULATED TO TAKE PART IN?</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Upcoming Events</h2>
                    </div>
                    <EventsSlider />
                </div>
            </section>

            {/* --- SECTION 8: TEACHERS --- */}
            <TeachersSection />

            {/* --- SECTION 9: BLOG --- */}
            <BlogSection />

            {/* --- SECTION 10: NEWSLETTER --- */}
            <NewsletterSection />

        </div>
    );
}

export default Home;