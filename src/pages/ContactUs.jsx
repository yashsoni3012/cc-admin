import React from 'react';
import { FiHeadphones, FiMail, FiMapPin } from 'react-icons/fi'; // Outline Icons
import { FaArrowRight } from 'react-icons/fa'; // Outline Icons
const ContactInfoSection = () => {
    const contactData = [
        {
            id: 1,
            icon: <FiHeadphones className="text-4xl text-blue-600" />,
            title: "Contact Phone Number",
            lines: ["+444 555 666 777", "+222 222 222 333"],
        },
        {
            id: 2,
            icon: <FiMail className="text-4xl text-blue-600" />,
            title: "Our Email Address",
            lines: ["admin@gmail.com", "example@gmail.com"],
        },
        {
            id: 3,
            icon: <FiMapPin className="text-4xl text-blue-600" />,
            title: "Our Location",
            lines: ["5678 Bangla Main Road, cities 580", "GBnagla, example 54786"],
        },
    ];

    return (
        <div >
            <section className="relative py-24 bg-gray-50 overflow-hidden">

                {/* Top Background Gradient (Purple Glow) */}
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#F2F0FE] to-transparent -z-0"></div>

                <div className="max-w-7xl mx-auto px-5 relative z-10">

                    {/* --- Header --- */}
                    <div className="text-center mb-16">
                        <span className="inline-block px-5 py-1.5 mb-5 text-xs font-bold text-[#6A4DF4] bg-[#E8E4FD] rounded-full uppercase tracking-wider">
                            CONTACT US
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a1a2e] leading-tight">
                            Histudy Course Contact <br /> can join with us.
                        </h2>
                    </div>

                    {/* --- Cards Grid --- */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {contactData.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl p-10 shadow-[0_5px_30px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-transform duration-300 border border-gray-100"
                            >
                                {/* Icon */}
                                <div className="mb-6">
                                    {item.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-[#1a1a2e] mb-4">
                                    {item.title}
                                </h3>

                                {/* Content Lines */}
                                <div className="text-gray-500 text-sm leading-7 font-medium">
                                    {item.lines.map((line, index) => (
                                        <p key={index}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <section className="py-24 bg-gray-200 overflow-hidden">
                <div className="max-w-7xl mx-auto px-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        <div className="relative   lg:justify-start">
                            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-[#E2D9FF] to-[#F2F0FE] rounded-full -z-10 blur-3xl opacity-70"></div> */}

                            <div className="relative z-10 rounded overflow-hidden w-4/5 h-150">
                                <img
                                    src="https://images.pexels.com/photos/842567/pexels-photo-842567.jpeg?auto=compress&cs=tinysrgb&w=800"
                                    alt="Student Contact"
                                    className="w-full max-w-full object-cover rounded shadow-2xl h-full"
                                />

                                <div className="absolute inset-0 bg-[#6A4DF4] mix-blend-overlay opacity-10 rounded-2xl"></div>
                            </div>
                        </div>

                        {/* --- RIGHT SIDE: FORM --- */}
                        <div className="bg-gray-50 p-8 md:p-12 rounded shadow border border-gray-50">

                            <span className="inline-block px-4 py-1 mb-5 text-xs font-bold text-[#6A4DF4] bg-[#F2F0FE] rounded-full uppercase tracking-wider">
                                EDUCATION FOR EVERYONE
                            </span>

                            <h2 className="text-3xl md:text-3xl font-extrabold text-[#1a1a2e] mb-8 leading-tight">
                                Get a Free Course You Can <br /> Contact With Me
                            </h2>

                            <form className="space-y-5">
                                {/* Name Input */}
                                <div>
                                    <label className="sr-only">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="w-full shadow bg-[#F9F9F9] px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-[#6A4DF4]/20 transition-all border border-transparent focus:border-[#6A4DF4] text-gray-700 placeholder-gray-400 font-medium"
                                    />
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label className="sr-only">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full shadow bg-[#F9F9F9] px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-[#6A4DF4]/20 transition-all border border-transparent focus:border-[#6A4DF4] text-gray-700 placeholder-gray-400 font-medium"
                                    />
                                </div>

                                {/* Subject Input */}
                                <div>
                                    <label className="sr-only">Your Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Your Subject"
                                        className="w-full shadow bg-[#F9F9F9] px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-[#6A4DF4]/20 transition-all border border-transparent focus:border-[#6A4DF4] text-gray-700 placeholder-gray-400 font-medium"
                                    />
                                </div>

                                {/* Message Textarea */}
                                <div>
                                    <label className="sr-only">Message</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Message"
                                        className="w-full shadow bg-[#F9F9F9] px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-[#6A4DF4]/20 transition-all border border-transparent focus:border-[#6A4DF4] text-gray-700 placeholder-gray-400 font-medium resize-none"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="button"
                                    className="custom-btn w-full text-center flex items-center justify-center gap-2"
                                >
                                    Get It Now <FaArrowRight />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            <section className="w-full h-[500px] bg-gray-100 relative">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15075.166349385616!2d73.75763167720689!3d18.371378818590852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc293e429bc4aa1%3A0xdbee591ff3cd7c25!2sHotel%20malhar%2C%20near%20Tilak%20Banglow%2C%20Pune%2C%20Thoptewadi%2C%20Maharashtra%20412205!5e1!3m2!1sen!2sin!4v1765432506883!5m2!1sen!2sin" width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    className="filter grayscale-[0.2] contrast-[1.1]"
                ></iframe>



            </section>
        </div>

    );
};

export default ContactInfoSection;