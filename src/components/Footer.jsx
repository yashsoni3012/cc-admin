import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Ensure Link is imported

const Footer = () => {

  // Define links for "Our Company" to map specific paths
  const companyLinks = [
    { name: 'Contact Us', path: '/contact' },
    { name: 'About Us', path: '/about' },
    { name: 'Become Teacher', path: '#' }, // Add paths for these later
    { name: 'Blog', path: '#' },
    { name: 'Instructor', path: '#' },
    { name: 'Events', path: '#' },
  ];

  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-5">

        {/* --- TOP GRID SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mb-16">

          {/* Column 1: Brand & Contact Button */}
          <div className="flex flex-col items-start w-3/4">
            <div className="flex items-center gap-2 mb-6">
              {/* Logo Icon */}
              <div className="bg-[#2D62F0] text-white p-1.5 rounded-tr-xl rounded-bl-xl shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12L12 2L22 12L12 22L2 12Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-3xl font-extrabold text-[#2D62F0]">hi<span className="text-[#6A4DF4]">Study</span></span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-8 pr-4">
              We’re always in search for talented and motivated people. Don’t be shy introduce yourself!
            </p>
            
            {/* UPDATED: Wrapped button in Link to navigate to Contact page */}
            <Link to="/contact">
                <button className="flex items-center gap-2 px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-[#6A4DF4] hover:text-white hover:border-[#6A4DF4] transition-all duration-300 group shadow-sm hover:shadow-lg">
                Contact With Us <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </Link>
          </div>

          <div className='grid grid-cols-3 gap-4'>

            {/* Column 2: Useful Links */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-8">Useful Links</h3>
              <ul className="space-y-4 text-gray-500 font-medium">
                {['Marketplace', 'kindergarten', 'University', 'GYM Coaching', 'FAQ'].map((item) => (
                  <li key={item}>
                    <Link to="#" className="hover:text-[#6A4DF4] hover:pl-2 transition-all duration-300 block w-fit">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Company (UPDATED LOGIC) */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-8">Our Company</h3>
              <ul className="space-y-4 text-gray-500 font-medium">
                {companyLinks.map((item) => (
                  <li key={item.name}>
                    {/* UPDATED: Uses item.path to navigate to /about or /contact */}
                    <Link to={item.path} className="hover:text-[#6A4DF4] hover:pl-2 transition-all duration-300 block w-fit">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Get Contact */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-8">Get Contact</h3>
              <div className="space-y-4 text-gray-500 mb-8 font-medium">
                <p className="hover:text-[#6A4DF4] cursor-pointer">Phone: (406) 555-0120</p>
                <p className="hover:text-[#6A4DF4] cursor-pointer">E-mail: pix@example.com</p>
                <p>Location: North America, USA</p>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                  <a key={index} href="#" className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#6A4DF4] hover:text-white hover:-translate-y-1 transition-all duration-300">
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* --- BOTTOM BAR: COPYRIGHT & LINKS --- */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p className="text-center md:text-left">
            Copyright © 2025 <span className="font-bold text-gray-900">Pixcels Themes</span>. All Rights Reserved
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
            <Link to="#" className="hover:text-[#6A4DF4] transition-colors">Terms of service</Link>
            <span className="hidden md:inline text-gray-300">|</span>
            <Link to="#" className="hover:text-[#6A4DF4] transition-colors">Privacy policy</Link>
            <span className="hidden md:inline text-gray-300">|</span>
            <Link to="#" className="hover:text-[#6A4DF4] transition-colors">Subscription</Link>
            <span className="hidden md:inline text-gray-300">|</span>
            <Link to="/login" className="hover:text-[#6A4DF4] transition-colors">Login & Register</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;