import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";


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


const NewsletterSection = () => {
    return (
        <section className="py-24 bg-[#1F55F1] relative overflow-hidden text-white">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="max-w-4xl mx-auto px-5 relative z-10 text-center">
                <span className="inline-block px-6 py-2 mb-6 text-xs font-bold text-white bg-white/10 rounded-full uppercase tracking-wider backdrop-blur-md">GET LATEST HISTUDY UPDATE</span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Subscribe Our Newsletter</h2>
                <p className="text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                <div className="bg-white p-2 rounded-lg shadow-2xl max-w-lg mx-auto flex flex-col sm:flex-row gap-2 mb-4">
                    <input type="email" placeholder="Enter Your E-Mail" className="flex-1 px-4 py-3 text-gray-700 outline-none rounded-md placeholder-gray-400" />
                    <button className="bg-[#8053FF] hover:bg-[#6f42ef] text-white px-8 py-3 rounded-md font-bold transition-colors flex items-center justify-center gap-2">Subscribe <FaArrowRight /></button>
                </div>
                <p className="text-sm text-blue-200 mb-16">No ads, No trails, No commitments</p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 pt-10 border-t border-white/20">
                    <div className="text-center sm:text-right sm:pr-8 sm:border-r border-white/20 w-full sm:w-auto"><h3 className="text-4xl md:text-5xl font-extrabold mb-2"><CountUp end="500+" duration={2000} /></h3><p className="font-bold text-lg">Successfully Trained</p><p className="text-blue-200 text-sm">Learners & counting</p></div>
                    <div className="text-center sm:text-left w-full sm:w-auto"><h3 className="text-4xl md:text-5xl font-extrabold mb-2"><CountUp end="100+" duration={2000} /></h3><p className="font-bold text-lg">Certification Students</p><p className="text-blue-200 text-sm">Online Course</p></div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;