import React, { useState, useRef } from 'react';

const CardSlider = () => {
    // कार्ड्सचा डेटा
    const [cards, setCards] = useState([
        {
            id: 1,
            title: "React JS",
            desc: "Learn React from basics to advanced concepts.",
            lessons: 12,
            students: 50,
            color: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)", // Purple
            price: 70,
            oldPrice: 120,
            rating: 15,
            tag: "-40% Off"
        },
        {
            id: 2,
            title: "JavaScript",
            desc: "Mastering the web language for interactive sites.",
            lessons: 18,
            students: 120,
            color: "linear-gradient(135deg, #34d399 0%, #10b981 100%)", // Green
            price: 60,
            oldPrice: 100,
            rating: 20,
            tag: "Popular"
        },
        {
            id: 3,
            title: "UI/UX Design",
            desc: "Designing for best user experience and interfaces.",
            lessons: 20,
            students: 80,
            color: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)", // Pink
            price: 50,
            oldPrice: 90,
            rating: 18,
            tag: "New"
        }
    ]);

    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);

    // --- MOUSE / TOUCH EVENTS ---
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
        const threshold = 100; // 100px ओढल्यावर कार्ड बदलेल
        if (dragX > threshold) moveCardToBack();
        else if (dragX < -threshold) moveCardToBack();
        else setDragX(0); // नाहीतर जागेवर येईल
    };

    const moveCardToBack = () => {
        setCards((prev) => {
            const newArr = [...prev];
            const topCard = newArr.shift(); // वरचे कार्ड काढले
            newArr.push(topCard); // खाली टाकले
            return newArr;
        });
        setDragX(0);
    };

    return (
        <div className="slider-container w-full h-[450px] flex items-center justify-center relative z-20">
            <div
                className="card-stack relative w-[280px] h-[380px] cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {cards.map((card, index) => {
                    let style = {};
                    
                    // --- STACK LOGIC ---
                    if (index === 0) {
                        // Top Card
                        style = {
                            zIndex: 3,
                            opacity: 1,
                            transform: isDragging ? `translateX(${dragX}px) rotate(${dragX * 0.05}deg)` : `translateX(0) rotate(0)`,
                            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                            display: 'block'
                        };
                    } else if (index === 1) {
                        // Second Card (Behind)
                        style = {
                            zIndex: 2,
                            opacity: 1, 
                            transform: 'translateX(15px) translateY(15px) scale(0.95)',
                            transition: 'all 0.3s ease',
                            display: 'block'
                        };
                    } else {
                        // Others Hidden
                        style = { display: 'none' };
                    }

                    return (
                        <div key={card.id} className="card absolute top-0 left-0 w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden" style={style}>
                            {/* Card Header (Color + Image) */}
                            <div className="h-[160px] p-5 relative" style={{ background: card.color }}>
                                <div className="text-white relative z-10">
                                    <h3 className="text-lg font-bold w-2/3 leading-snug">{card.title} Course</h3>
                                    <p className="text-xs mt-1 opacity-90">By Histudy</p>
                                </div>
                                <div className="absolute top-4 right-4 w-10 h-10 bg-[#5d3eff] rounded-full flex items-center justify-center text-[10px] text-white font-bold border-2 border-dashed border-white/50 z-20">
                                    {card.tag}
                                </div>
                                {/* Character Image inside card (Optional) */}
                                <div className="absolute bottom-0 right-0 h-[140px] w-[120px] bg-[url('https://i.pravatar.cc/300?img=5')] bg-no-repeat bg-contain bg-bottom opacity-80"></div>
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
            {/* Instruction Text */}
            <div className="absolute -bottom-10 text-gray-400 text-xs animate-pulse">
                &lt; Swipe to Change &gt;
            </div>
        </div>
    );
};

export default CardSlider;