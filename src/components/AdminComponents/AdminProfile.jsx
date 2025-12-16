import React from 'react'
import Man from '../../assets/Home.png'
import { FaStar, FaArrowRight } from 'react-icons/fa';


function AdminProfile() {
    return (
        <div>
            <div className='w-full h-full relative'>

                <div className='bg-gradient-to-t from-[#241355] via-[#4F36B6] to-[#8C72F2] absolute w-full  h-60 z-0  '>
                    <h2 className="text-3xl font-bold text-white mb-8 m-5">My Profile</h2>

                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 0 C 20 50 40 10 60 40 S 90 90 100 100" stroke="white" strokeWidth="0.5" fill="none" />
                            <circle cx="10" cy="20" r="2" fill="white" />
                            <circle cx="90" cy="80" r="1" fill="white" />
                            <path d="M10 10 Q 50 50 10 90" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" fill="none" />
                            <path d="M90 10 Q 50 50 90 90" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" fill="none" />
                        </svg>

                    </div>
                </div>

                <div className="w-full max-w-6xl mx-auto p-4 pt-20  ">

                    {/* --- Main Banner Container --- */}
                    <div className="relative w-full rounded-[2rem] overflow-hidden bg-gradient-to-r from-[#241355] via-[#4F36B6] to-[#8C72F2] min-h-[350px] flex items-center shadow-2xl">

                        {/* Background Decorative Patterns */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M0 0 C 20 50 40 10 60 40 S 90 90 100 100" stroke="white" strokeWidth="0.5" fill="none" />
                                <circle cx="10" cy="20" r="2" fill="white" />
                                <circle cx="90" cy="80" r="1" fill="white" />
                                <path d="M10 10 Q 50 50 10 90" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" fill="none" />
                                <path d="M90 10 Q 50 50 90 90" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" fill="none" />
                            </svg>
                        </div>

                        {/* --- Content Wrapper --- */}
                        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-16 pt-8 md:pt-0">

                            {/* LEFT SIDE: Text Info */}
                            <div className="text-white flex-1 space-y-6 z-20">

                                {/* Tag */}
                                <div className="inline-block">
                                    <span className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-white/10">
                                        Work - Travel - Lifestyle
                                    </span>
                                </div>

                                {/* Heading */}
                                <div>
                                    <p className="text-purple-200 text-sm font-bold tracking-widest uppercase mb-1">
                                        Bootcamp Instructor
                                    </p>
                                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                                        LEARN WITH NEHA
                                    </h2>
                                </div>

                                {/* Profile Row */}
                                <div className="flex items-center gap-4 pt-2">
                                    <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden">
                                        <img
                                            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                                            alt="John Due"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">John Due</h4>
                                        <div className="flex items-center text-[#FF9F43] text-sm">
                                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                            <span className="text-white/80 ml-2 text-xs font-medium">(15 Reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SIDE: Instructor Image & Button */}
                            <div className="relative flex-1 flex flex-col items-center md:items-end mt-8 md:mt-0">
                                <img
                                    src={Man}
                                    alt="Instructor John"
                                    className="h-[300px] md:h-[380px] object-cover md:-mb-10 drop-shadow-2xl z-10 mask-image-gradient"
                                    style={{ maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)' }}
                                />

                                <button className="absolute bottom-8 right-0 md:right-[-20px] custom-btn font-bold py-4 px-8 rounded-xl shadow-[0_10px_30px_rgba(61,90,254,0.4)] flex items-center gap-2 transition-transform transform hover:-translate-y-1 z-30">
                                    Create a New Course <FaArrowRight />
                                </button>

                                <div className="absolute top-10 right-0 opacity-40 mix-blend-overlay w-32 h-32 bg-contain bg-no-repeat pointer-events-none"
                                    style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/6552/6552436.png')" }}>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminProfile