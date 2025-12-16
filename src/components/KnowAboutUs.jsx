import React, { useEffect, useState } from 'react';
import { FaArrowRight } from "react-icons/fa";

const KnowAboutUs = ({ data }) => {

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="py-40  overflow-hidden">
            <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* --- LEFT SIDE: IMAGE COLLAGE --- */}
                <div className="relative h-[550px] w-full hidden md:block">

                    {/* Image 1 (Static - स्थिर) */}
                    <img
                        src="https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="img1"
                        className="absolute top-20 left-0 w-[55%] h-[75%] object-cover rounded-xl z-0"
                        style={{
                            transform: `translateY(${offset * -0.03}px)`,
                            transition: "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" // Super Soft Transition
                        }}
                    />

                    {/* Image 2 (Top Right - Moves DOWN Softly) */}
                    <img
                        src="https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="img2"
                        className="absolute -top-30 right-0 w-[50%] h-[45%] object-cover rounded-xl z-10 "
                        style={{
                            transform: `translateY(${offset * 0.03}px)`,
                            transition: "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)" // Super Soft Transition
                        }}
                    />

                    {/* Image 3 (Bottom Right - Moves DOWN Softly but Faster) */}
                    <img
                        src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="img3"
                        className="absolute bottom-15 right-[9%] w-[50%] h-[65%] object-cover rounded-xl z-20"
                        style={{
                            transform: `translateY(${offset * 0.05}px)`,
                            transition: "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                        }}
                    />

                    <div className="absolute top-[40%] right-[30%] w-24 h-24 bg-yellow-400 rounded-full blur-3xl opacity-40 -z-10"></div>
                </div>

                {/* --- RIGHT SIDE: CONTENT --- */}
                <div>
                    <span className="inline-block px-4 py-1 mb-4 text-sm font-bold text-orange-500 bg-orange-50 rounded-full uppercase tracking-wider">
                        {data.badge}
                    </span>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] mb-6 leading-tight">
                        {data.title}
                    </h2>

                    <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                        {data.desc}
                    </p>

                    <div className="space-y-6 mb-10">
                        {data.features.map((item) => (
                            <div key={item.id} className="flex items-start gap-4">
                                <div className={`flex items-center justify-center shrink-0 w-16 h-16 rounded-full ${item.bg}`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                                    <p className="text-gray-500 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="custom-btn">
                        More About Us <FaArrowRight />
                    </button>
                </div>

            </div>
        </section>
    );
};

export default KnowAboutUs;