// components/TestimonialSection.jsx
import React from 'react';
import { FaQuoteRight } from 'react-icons/fa';

// 1. कार्ड डिझाईन (Internal Component)
const TestimonialCard = ({ item }) => {
    const isColor = item.variant === 'color'; // रंगीत कार्ड की पांढरे कार्ड हे ठरवण्यासाठी
    
    return (
        
        <div className={`shrink-0 w-[350px] md:w-[400px] p-8 rounded-2xl mx-4 relative flex flex-col justify-between transition-transform hover:scale-105 duration-300 
            ${isColor ? 'bg-gradient-to-r from-[#4F5DE4] to-[#8053FF] text-white shadow-xl' : 'bg-white text-gray-600 shadow-lg border border-gray-100'}`}>
            
            <div className="flex justify-between items-start mb-6">
                <div className="scale-90 origin-top-left">{item.logo}</div>
                <FaQuoteRight className={`text-4xl opacity-30 ${isColor ? 'text-white' : 'text-gray-300'}`} />
            </div>
            
            <p className={`text-lg leading-relaxed mb-8 font-medium ${isColor ? 'text-blue-50' : 'text-gray-500'}`}>
                "{item.text}"
            </p>
            
            <div className="flex items-center gap-4">
                <img src={item.img} alt={item.author} className="w-12 h-12 rounded-full object-cover border-2 border-white/20" />
                <div>
                    <h4 className={`font-bold text-lg ${isColor ? 'text-white' : 'text-gray-900'}`}>{item.author}</h4>
                    <p className={`text-sm ${isColor ? 'text-blue-200' : 'text-gray-400'}`}>{item.role}</p>
                </div>
            </div>
        </div>
    );
};

// 2. मुख्य सेक्शन (Main Component)
const TestimonialSection = ({ subTitle, title, row1, row2 }) => {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            {subTitle?.length > 0 && (
                <div className="max-w-7xl mx-auto px-5 text-center mb-16">
                <span className="inline-block px-4 py-1 mb-5 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full uppercase tracking-wider">
                    {subTitle}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                    {title}
                </h2>
            </div>
            )}
            

            {/* Row 1: Left Scroll */}
            <div className="marquee-container w-full mb-8">
                <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused]">
                    {[...row1, ...row1, ...row1].map((item, index) => (
                        <TestimonialCard key={`row1-${index}`} item={item} />
                    ))}
                </div>
            </div>

            {/* Row 2: Right Scroll */}
            <div className="marquee-container w-full">
                <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
                    {[...row2, ...row2, ...row2].map((item, index) => (
                        <TestimonialCard key={`row2-${index}`} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;