import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebookF, FaEye, FaEyeSlash, FaArrowRight, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // --- STATE FOR USER INPUTS ---
    const [name, setName] = useState('');      // Added for API
    const [mobile, setMobile] = useState('');  // Added for API
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // --- SUBMIT HANDLER ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        // === LOGIC FOR LOGIN ===
        if (isLogin) {
            const adminEmail = "admin@gmail.com";
            const adminPass = "12345";

            if (email === adminEmail && password === adminPass) {
                localStorage.setItem('isAdmin', 'true');
                alert("Login Successful!");
                navigate('/admin');
                window.location.reload();
            } else {
                alert("Invalid Email or Password");
            }
        }
        // === LOGIC FOR REGISTRATION (API CALL) ===
        else {
            const url = "https://codingcloud.pythonanywhere.com/api/admin/register/";

            const userData = {
                name: name,
                email: email,
                mobile: mobile,
                is_staff: true,
                created_at: new Date().toISOString()
            };

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert("Registration Successful! Please Login.");
                    console.log(result);
                    setIsLogin(true); // Switch back to login view
                } else {
                    alert("Registration Failed: " + JSON.stringify(result));
                }
            } catch (error) {
                console.error("Network Error:", error);
                alert("Network Error. Check console.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">

                {/* --- LEFT SIDE: IMAGE --- */}
                <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#6A4DF4] to-[#9E8DF8] p-10 text-white flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl font-extrabold leading-tight mb-4">
                            {isLogin ? "Welcome Back!" : "Join Us Today!"}
                        </h2>
                        <p className="text-blue-100 text-sm leading-relaxed">
                            Build skills with courses, certificates, and degrees online from world-class universities and companies.
                        </p>
                    </div>
                    <div className="relative z-10 text-center">
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/online-education-4315013-3592484.png" alt="Illustration" className="w-3/4 mx-auto opacity-90 drop-shadow-xl" />
                    </div>
                </div>

                {/* --- RIGHT SIDE: FORM --- */}
                <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col items-center justify-center">

                    {/* TOGGLE BUTTONS */}
                    <div className="bg-gray-100 p-1 rounded-full flex items-center mb-8 shadow-inner">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${isLogin
                                    ? 'bg-white text-[#6A4DF4] shadow-[0_2px_10px_rgba(0,0,0,0.1)]'
                                    : 'text-gray-500 hover:text-gray-700 bg-transparent cursor-pointer'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${!isLogin
                                    ? 'bg-white text-[#6A4DF4] shadow-[0_2px_10px_rgba(0,0,0,0.1)]'
                                    : 'text-gray-500 hover:text-gray-700 bg-transparent cursor-pointer'
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {isLogin ? "Sign in to Histudy" : "Create Account"}
                    </h2>
                    <p className="text-gray-400 text-sm mb-8 text-center">
                        {isLogin ? "Enter your details to proceed further" : "Register now to start learning"}
                    </p>

                    {/* --- FORM START --- */}
                    <form className="w-full space-y-5" onSubmit={handleSubmit}>

                        {/* NAME INPUT (Only for Register) */}
                        {!isLogin && (
                            <div className="relative">
                                <FaUser className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full bg-gray-50 pl-12 pr-4 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#6A4DF4]/20 border border-gray-100 focus:border-[#6A4DF4] transition-all text-sm font-medium"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        {/* EMAIL INPUT */}
                        <div className="relative">
                            <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-gray-50 pl-12 pr-4 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#6A4DF4]/20 border border-gray-100 focus:border-[#6A4DF4] transition-all text-sm font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* MOBILE INPUT (Only for Register - Required by API) */}
                        {!isLogin && (
                            <div className="relative">
                                <FaPhone className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
                                <input
                                    type="tel"
                                    placeholder="Mobile Number"
                                    className="w-full bg-gray-50 pl-12 pr-4 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#6A4DF4]/20 border border-gray-100 focus:border-[#6A4DF4] transition-all text-sm font-medium"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>
                        )}

                        {/* PASSWORD INPUT */}
                        <div className="relative">
                            <FaLock className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full bg-gray-50 pl-12 pr-12 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-[#6A4DF4]/20 border border-gray-100 focus:border-[#6A4DF4] transition-all text-sm font-medium"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 cursor-pointer hover:text-[#6A4DF4]" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>

                        {/* REMEMBER ME (Only for Login) */}
                        {isLogin && (
                            <div className="flex justify-between items-center text-xs font-medium text-gray-500 px-1">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="accent-[#6A4DF4] w-3 h-3" /> Remember Me
                                </label>
                                <a href="#" className="text-[#6A4DF4] hover:underline">Forgot Password?</a>
                            </div>
                        )}

                        {/* SUBMIT BUTTON */}
                        <button type="submit" className="w-full bg-[#6A4DF4] hover:bg-[#5b3ddb] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-200 transition-all flex items-center justify-center gap-2 mt-4">
                            {isLogin ? "Log In" : "Register"} <FaArrowRight className="text-sm" />
                        </button>

                    </form>

                    {/* SOCIAL LOGIN */}
                    <div className="mt-8 w-full">
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase">Or continue with</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <div className="flex gap-4 justify-center mt-4">
                            <button className="w-full border border-gray-200 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-sm font-bold text-gray-600">
                                <FaGoogle className="text-red-500" /> Google
                            </button>
                            <button className="w-full border border-gray-200 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all text-sm font-bold text-gray-600">
                                <FaFacebookF className="text-blue-600" /> Facebook
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginRegister;