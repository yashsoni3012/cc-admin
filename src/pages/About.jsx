import React from 'react';
// 1. Missing Icons इथे ऍड केले आहेत
import {
  FaArrowRight, FaHeart, FaBookOpen, FaLaptopCode, FaPlay,
  FaGoogle, FaYelp, FaFacebookF, FaMicrosoft, FaHubspot
} from "react-icons/fa";

import KnowAboutUs from '../components/KnowAboutUs';
import TestimonialSection from '../components/TestimonialSection';
import NewsletterSection from '../components/NewsletterSection';

const AboutHeroImage = "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

// 1. Data Structure matching the image
const teamMembers = [
  {
    id: 1,
    name: "Alejandro",
    role: "Math Teacher",
    location: "CO Miego, AD, USA",
    // Placeholder image resembling the first person
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "John Due",
    role: "Department Head",
    location: "CO Miego, AD, USA",
    // Placeholder image resembling the second person
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Joo Bieden",
    role: "Math Teacher",
    location: "CO Miego, AD, USA",
    // Placeholder image resembling the third person
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  }, {
    id: 4,
    name: "Alejandro",
    role: "Math Teacher",
    location: "CO Miego, AD, USA",
    // Placeholder image resembling the first person
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "John Due",
    role: "Department Head",
    location: "CO Miego, AD, USA",
    // Placeholder image resembling the second person
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Joo Bieden",
    role: "Math Teacher",
    location: "CO Miego, AD, USA",
    // Placeholder image resembling the third person
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];
const About = () => {

  const aboutData = {
    badge: "KNOW ABOUT US",
    title: <>Know About Histudy <br /> Learning Platform</>,
    desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
    features: [
      { id: 1, title: "Flexible Classes", desc: "Readable content.", icon: <FaHeart className="text-red-500 text-2xl" />, bg: "bg-red-100" },
      { id: 2, title: "Learn From Anywhere", desc: "Recusandae laborum.", icon: <FaBookOpen className="text-blue-600 text-2xl" />, bg: "bg-blue-100" },
      { id: 3, title: "Experienced Teachers", desc: "Aliquid mollitia.", icon: <FaLaptopCode className="text-orange-600 text-2xl" />, bg: "bg-orange-100" }
    ]
  };

  // --- DATA FOR SCROLLING SECTION ---
  const AboutsRow1 = [
    { id: 1, company: "Google", logo: <FaGoogle className="text-4xl text-red-500" />, text: "The platform is intuitive.", author: "Michael D.", role: "CEO", img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "white" },
    { id: 2, company: "Yelp", logo: <FaYelp className="text-4xl text-white" />, text: "Strong foundation.", author: "Valerie J.", role: "Manager", img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "color" },
    { id: 3, company: "Facebook", logo: <FaFacebookF className="text-4xl text-blue-600" />, text: "Global learners.", author: "Hannah R.", role: "Director", img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "white" },
    { id: 4, company: "Microsoft", logo: <FaMicrosoft className="text-4xl text-white" />, text: "Scalable solutions.", author: "James T.", role: "CTO", img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "color" },
  ];

  const AboutsRow2 = [
    { id: 5, company: "HubSpot", logo: <FaHubspot className="text-4xl text-orange-500" />, text: "Marketing strategies.", author: "Pearl B. Hill", role: "Marketing", img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "white" },
    { id: 6, company: "Bing", logo: <span className="text-4xl font-bold text-white italic">Bing</span>, text: "Search no further.", author: "Martha S.", role: "Developer", img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "color" },
    { id: 7, company: "Google", logo: <FaGoogle className="text-4xl text-red-500" />, text: "Repeating success.", author: "Robert L.", role: "Analyst", img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "white" },
    { id: 8, company: "Yelp", logo: <FaYelp className="text-4xl text-white" />, text: "Five stars.", author: "Sarah K.", role: "Designer", img: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=100", variant: "color" },
  ];

  return (
    <div className="about-page ">
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${AboutHeroImage})` }}></div>
        <div className="absolute inset-0 bg-[#0e1133]/70"></div>
        <div className="relative z-10 text-center px-2 max-w-7xl mx-auto text-white flex flex-col items-center">
          <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-widest uppercase bg-white/10 rounded px-3 py-1 text-orange-500 backdrop-blur-sm">HOW WE WORK</span>
          <h1 className="text-xl md:text-5xl lg:text-5xl font-extrabold leading-tight mb-8 drop-shadow-lg">
            Take Challenge for Build Your Life.<br className="hidden md:block" />
            The World Most Lessons for Back to Your Life.
          </h1>
          <button className="custom-btn">More About Us <span>→</span></button>
        </div>
      </div>

      <div>
        <KnowAboutUs data={aboutData} />
      </div>

      {/* --- VIDEO / INFO SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1 mb-4 text-xs font-bold text-blue-600 bg-blue-100 rounded-full uppercase tracking-wider">HOW WE WORK</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] mb-6 leading-tight">Build your Career And <br /> Upgrade Your Life</h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">Far far away, behind the word mountains...</p>
            <div className="relative inline-flex items-center gap-3 cursor-pointer group overflow-hidden rounded-full py-3 pr-6 pl-2 transition-all">
              <span className="absolute top-0 left-0 h-full w-0 rounded-4xl bg-blue-300 group-hover:bg-blue-600 group-hover:w-full w-1/5 transition-all duration-500 ease-out z-0"></span>
              <div className="absolute left-0 w-12 h-12 bg-blue-200/50 rounded-full -z-10 group-hover:scale-110 transition-transform duration-300"></div>
              <span className="relative z-10 font-bold text-gray-800 ml-4 group-hover:text-white transition-colors duration-300">Learn More About Us</span>
              <FaArrowRight className="relative z-10 text-gray-800 text-sm group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
          <div className="relative rounded overflow-hidden shadow-2xl group cursor-pointer h-[400px] w-full">
            <img src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Student Learning" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <FaPlay className="text-white text-xl ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL SCROLL SECTION --- */}
      <div className='relative'>
        <div className='flex px-10 bg-white  z-10 absolute bottom-0 h-full gap-5 flex-col w-1/4 justify-center items-center'>

          <div className="  flex px-10  bg-gradient-to-r from-white to-transparent z-10 absolute  h-full gap-5 ml-[150%] w-1/2 justify-center items-center "> </div>

          <div className="text-center py-2 px-7 font-bold bg-fuchsia-200 text-fuchsia-500 rounded-4xl ">
            <h1 >LEARNERS FEEDBACK</h1>
          </div>

          <div className='text-4xl font-extrabold'>
            <h1>What Our Learners Say</h1>
          </div>

          <div className='text-gray-500'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae consectetur adipisicing elit. Repudiandae </p>
          </div>

          <button className='custom-btn'>Contact Us</button>

        </div>
        <TestimonialSection
          // subTitle="OUR REPUTATION"
          // title="What our partners say about us"
          row1={AboutsRow1}
          row2={AboutsRow2}
        />
      </div>


      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">

          {/* Header Section */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 mb-4 text-xs font-bold tracking-wider text-red-400 uppercase bg-red-200 rounded-full">
              Skill Teacher
            </span>
            <h2 className="mb-4 text-4xl font-extrabold text-slate-900">
              Whose Inspirations You Love
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Far far away, behind the word mountains, far from the countries Vokalia and
              Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at
              the coast of the Semantics, a large language ocean.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group bg-white rounded-lg p-4 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="aspect-[4/5] overflow-hidden rounded-lg mb-6 bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Text Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-gray-400 text-sm font-medium">
                    {/* SVG Icon Replacement for MapPin */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{member.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section>
        <NewsletterSection/>
      </section>

    </div>
  );
};

export default About;