import React from 'react';
import { FaStar, FaRegBookmark, FaBookOpen, FaUser, FaArrowRight, FaShoppingCart } from 'react-icons/fa';

const PopularCourses = () => {
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
            rating: 5,
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
            rating: 5,
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

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-5">
                {/* Heading */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 mb-4 text-xs font-bold text-blue-600 bg-blue-50 rounded-full uppercase tracking-wider">
                        TOP POPULAR COURSE
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a1a2e] leading-tight">
                        Histudy Course student <br /> can join with us.
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:-translate-y-2 transition-transform duration-300 group">
                            
                            {/* Image Section */}
                            <div className="relative h-64 overflow-hidden">
                                <img src={course.img} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                {/* Blue/Purple Overlay Effect */}
                                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/0 transition-colors"></div>
                                {/* Discount Badge */}
                                <div className="absolute bottom-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                                    {course.discount} Off
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-7">
                                {/* Rating & Bookmark */}
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-1 text-orange-400 text-sm">
                                        {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                        <span className="text-gray-400 ml-2">({course.reviews} Reviews)</span>
                                    </div>
                                    <FaRegBookmark className="text-gray-400 hover:text-blue-600 cursor-pointer" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors">
                                    {course.title}
                                </h3>

                                {/* Meta: Lessons & Students */}
                                <div className="flex items-center gap-6 text-gray-500 text-sm mb-4">
                                    <div className="flex items-center gap-2">
                                        <FaBookOpen className="text-gray-400" /> {course.lessons} Lessons
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaUser className="text-gray-400" /> {course.students} Students
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                                    {course.desc}
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                         <img src={`https://ui-avatars.com/api/?name=${course.author}&background=random`} alt="Author" />
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        By <span className="font-bold text-gray-900">{course.author}</span> In <span className="font-bold text-gray-900">{course.category}</span>
                                    </p>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-100 mb-5"></div>

                                {/* Price & Button */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-extrabold text-[#1a1a2e]">${course.price}</span>
                                        <span className="text-sm text-gray-400 line-through">${course.oldPrice}</span>
                                    </div>
                                    <button className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-blue-600 transition-colors group/btn">
                                        {course.action === "Add To Cart" ? (
                                           <><FaShoppingCart /> Add To Cart</>
                                        ) : (
                                           <>Learn More <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" /></>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCourses;