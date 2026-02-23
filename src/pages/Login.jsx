import React, { useState, useEffect } from 'react';
import { 
    FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebookF, 
    FaEye, FaEyeSlash, FaArrowRight, FaPhone, FaGithub,
    FaTwitter, FaCheckCircle, FaSpinner, FaMoon, FaSun
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [formErrors, setFormErrors] = useState({});

    // State for user inputs
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const navigate = useNavigate();

    // Check for saved theme preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Password strength checker
    const checkPasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength += 25;
        if (pass.match(/[a-z]+/)) strength += 25;
        if (pass.match(/[A-Z]+/)) strength += 25;
        if (pass.match(/[0-9]+/)) strength += 25;
        if (pass.match(/[$@#&!]+/)) strength += 25;
        setPasswordStrength(Math.min(strength, 100));
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (!isLogin) {
            checkPasswordStrength(newPassword);
        }
    };

    // Validate form
    const validateForm = () => {
        const errors = {};

        if (!isLogin) {
            if (!name.trim()) errors.name = "Name is required";
            if (!mobile.trim()) errors.mobile = "Mobile number is required";
            else if (!/^\d{10}$/.test(mobile)) errors.mobile = "Invalid mobile number";
            
            if (password !== confirmPassword) errors.confirmPassword = "Passwords don't match";
            
            if (!agreeTerms) errors.terms = "You must agree to terms";
        }

        if (!email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email format";

        if (!password.trim()) errors.password = "Password is required";
        else if (!isLogin && password.length < 6) errors.password = "Password must be at least 6 characters";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);

        if (isLogin) {
            // Login logic
            const adminEmail = "admin@gmail.com";
            const adminPass = "12345";

            setTimeout(() => {
                if (email === adminEmail && password === adminPass) {
                    localStorage.setItem('isAdmin', 'true');
                    navigate('/admin');
                    window.location.reload();
                } else {
                    setFormErrors({ general: "Invalid Email or Password" });
                }
                setLoading(false);
            }, 1000);
        } else {
            // Registration API call
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
                    setIsLogin(true);
                    // Clear form
                    setName('');
                    setMobile('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                } else {
                    setFormErrors({ general: JSON.stringify(result) });
                }
            } catch (error) {
                console.error("Network Error:", error);
                setFormErrors({ general: "Network Error. Please try again." });
            } finally {
                setLoading(false);
            }
        }
    };

    // Get password strength color
    const getStrengthColor = () => {
        if (passwordStrength < 50) return 'bg-red-500';
        if (passwordStrength < 75) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-blue-50'} flex items-center justify-center p-3 sm:p-4 md:p-6`}>
            
            {/* Dark Mode Toggle */}
            <button
                onClick={toggleDarkMode}
                className={`fixed top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${
                    darkMode ? 'bg-yellow-400 hover:bg-yellow-300' : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
            >
                {darkMode ? <FaSun className="text-gray-900" /> : <FaMoon />}
            </button>

            <div className={`w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[500px] sm:min-h-[600px] transition-all duration-300 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
            }`}>

                {/* LEFT SIDE: IMAGE & WELCOME */}
                <div className={`hidden lg:flex lg:w-5/12 xl:w-5/12 p-6 sm:p-8 md:p-10 text-white flex-col justify-between relative overflow-hidden ${
                    darkMode ? 'bg-gradient-to-br from-indigo-600 to-purple-700' : 'bg-gradient-to-br from-[#6A4DF4] to-[#9E8DF8]'
                }`}>
                    {/* Animated background circles */}
                    <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-white/5 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-3 sm:mb-4">
                            {isLogin ? "Welcome Back!" : "Join Us Today!"}
                        </h2>
                        <p className="text-blue-100 text-xs sm:text-sm leading-relaxed opacity-90">
                            Build skills with 1000+ courses, professional certificates, and degrees online from world-class universities and companies.
                        </p>
                    </div>

                    <div className="relative z-10 text-center mt-4 sm:mt-0">
                        <img 
                            src="https://cdni.iconscout.com/illustration/premium/thumb/online-education-4315013-3592484.png" 
                            alt="Online Education" 
                            className="w-3/4 mx-auto opacity-90 drop-shadow-xl hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6 text-center">
                            <div className="bg-white/10 rounded-xl p-2 sm:p-3 backdrop-blur-sm">
                                <div className="text-lg sm:text-2xl font-bold">10K+</div>
                                <div className="text-[10px] sm:text-xs opacity-80">Students</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-2 sm:p-3 backdrop-blur-sm">
                                <div className="text-lg sm:text-2xl font-bold">100+</div>
                                <div className="text-[10px] sm:text-xs opacity-80">Courses</div>
                            </div>
                            <div className="bg-white/10 rounded-xl p-2 sm:p-3 backdrop-blur-sm">
                                <div className="text-lg sm:text-2xl font-bold">24/7</div>
                                <div className="text-[10px] sm:text-xs opacity-80">Support</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: FORM */}
                <div className={`w-full lg:w-7/12 xl:w-7/12 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center justify-center transition-colors duration-300 ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                }`}>

                    {/* Mobile Header (visible only on mobile) */}
                    <div className="lg:hidden text-center mb-6">
                        <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${
                            darkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                            {isLogin ? "Welcome Back!" : "Join Us Today!"}
                        </h2>
                        <p className={`text-xs sm:text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                            {isLogin ? "Sign in to continue learning" : "Create account to start learning"}
                        </p>
                    </div>

                    {/* TOGGLE BUTTONS */}
                    <div className={`p-1 rounded-full flex items-center mb-4 sm:mb-6 w-full max-w-xs mx-auto ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                                isLogin
                                    ? `${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-[#6A4DF4]'} shadow-md`
                                    : `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'} bg-transparent`
                            }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 px-3 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                                !isLogin
                                    ? `${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-[#6A4DF4]'} shadow-md`
                                    : `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'} bg-transparent`
                            }`}
                        >
                            Register
                        </button>
                    </div>

                    <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-1 text-center ${
                        darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                        {isLogin ? "Sign in to Histudy" : "Create Account"}
                    </h2>
                    <p className={`text-xs sm:text-sm mb-4 sm:mb-6 text-center ${
                        darkMode ? 'text-gray-400' : 'text-gray-400'
                    }`}>
                        {isLogin ? "Enter your credentials to access your account" : "Fill in your details to get started"}
                    </p>

                    {/* General Error Message */}
                    {formErrors.general && (
                        <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs sm:text-sm">
                            {formErrors.general}
                        </div>
                    )}

                    {/* FORM */}
                    <form className="w-full space-y-3 sm:space-y-4" onSubmit={handleSubmit}>

                        {/* NAME INPUT (Register only) */}
                        {!isLogin && (
                            <div className="relative group">
                                <FaUser className={`absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 text-sm sm:text-base ${
                                    darkMode ? 'text-gray-400' : 'text-gray-400'
                                } group-focus-within:text-[#6A4DF4] transition-colors`} />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className={`w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl outline-none transition-all text-xs sm:text-sm border ${
                                        darkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-purple-500/30' 
                                            : 'bg-gray-50 border-gray-100 focus:ring-2 focus:ring-[#6A4DF4]/20 focus:border-[#6A4DF4]'
                                    } ${formErrors.name ? 'border-red-500' : ''}`}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {formErrors.name && (
                                    <p className="text-red-500 text-[10px] sm:text-xs mt-1">{formErrors.name}</p>
                                )}
                            </div>
                        )}

                        {/* EMAIL INPUT */}
                        <div className="relative group">
                            <FaEnvelope className={`absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 text-sm sm:text-base ${
                                darkMode ? 'text-gray-400' : 'text-gray-400'
                            } group-focus-within:text-[#6A4DF4] transition-colors`} />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className={`w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl outline-none transition-all text-xs sm:text-sm border ${
                                    darkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-purple-500/30' 
                                        : 'bg-gray-50 border-gray-100 focus:ring-2 focus:ring-[#6A4DF4]/20 focus:border-[#6A4DF4]'
                                } ${formErrors.email ? 'border-red-500' : ''}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {formErrors.email && (
                                <p className="text-red-500 text-[10px] sm:text-xs mt-1">{formErrors.email}</p>
                            )}
                        </div>

                        {/* MOBILE INPUT (Register only) */}
                        {!isLogin && (
                            <div className="relative group">
                                <FaPhone className={`absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 text-sm sm:text-base ${
                                    darkMode ? 'text-gray-400' : 'text-gray-400'
                                } group-focus-within:text-[#6A4DF4] transition-colors`} />
                                <input
                                    type="tel"
                                    placeholder="Mobile Number"
                                    className={`w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl outline-none transition-all text-xs sm:text-sm border ${
                                        darkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-purple-500/30' 
                                            : 'bg-gray-50 border-gray-100 focus:ring-2 focus:ring-[#6A4DF4]/20 focus:border-[#6A4DF4]'
                                    } ${formErrors.mobile ? 'border-red-500' : ''}`}
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                                {formErrors.mobile && (
                                    <p className="text-red-500 text-[10px] sm:text-xs mt-1">{formErrors.mobile}</p>
                                )}
                            </div>
                        )}

                        {/* PASSWORD INPUT */}
                        <div className="relative group">
                            <FaLock className={`absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 text-sm sm:text-base ${
                                darkMode ? 'text-gray-400' : 'text-gray-400'
                            } group-focus-within:text-[#6A4DF4] transition-colors`} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className={`w-full pl-9 sm:pl-12 pr-9 sm:pr-12 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl outline-none transition-all text-xs sm:text-sm border ${
                                    darkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-purple-500/30' 
                                        : 'bg-gray-50 border-gray-100 focus:ring-2 focus:ring-[#6A4DF4]/20 focus:border-[#6A4DF4]'
                                } ${formErrors.password ? 'border-red-500' : ''}`}
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <div 
                                className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-4 text-gray-400 cursor-pointer hover:text-[#6A4DF4] transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash className="text-sm sm:text-base" /> : <FaEye className="text-sm sm:text-base" />}
                            </div>
                            {formErrors.password && (
                                <p className="text-red-500 text-[10px] sm:text-xs mt-1">{formErrors.password}</p>
                            )}
                        </div>

                        {/* PASSWORD STRENGTH INDICATOR (Register only) */}
                        {!isLogin && password && (
                            <div className="space-y-1">
                                <div className="flex gap-1 h-1">
                                    <div className={`flex-1 rounded-full transition-all duration-300 ${passwordStrength >= 25 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                                    <div className={`flex-1 rounded-full transition-all duration-300 ${passwordStrength >= 50 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                                    <div className={`flex-1 rounded-full transition-all duration-300 ${passwordStrength >= 75 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                                    <div className={`flex-1 rounded-full transition-all duration-300 ${passwordStrength >= 100 ? getStrengthColor() : 'bg-gray-200'}`}></div>
                                </div>
                                <p className={`text-[10px] sm:text-xs ${
                                    passwordStrength < 50 ? 'text-red-500' : passwordStrength < 75 ? 'text-yellow-500' : 'text-green-500'
                                }`}>
                                    Password Strength: {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Medium' : 'Strong'}
                                </p>
                            </div>
                        )}

                        {/* CONFIRM PASSWORD (Register only) */}
                        {!isLogin && (
                            <div className="relative group">
                                <FaLock className={`absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 text-sm sm:text-base ${
                                    darkMode ? 'text-gray-400' : 'text-gray-400'
                                } group-focus-within:text-[#6A4DF4] transition-colors`} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className={`w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl outline-none transition-all text-xs sm:text-sm border ${
                                        darkMode 
                                            ? 'bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-purple-500/30' 
                                            : 'bg-gray-50 border-gray-100 focus:ring-2 focus:ring-[#6A4DF4]/20 focus:border-[#6A4DF4]'
                                    } ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {formErrors.confirmPassword && (
                                    <p className="text-red-500 text-[10px] sm:text-xs mt-1">{formErrors.confirmPassword}</p>
                                )}
                            </div>
                        )}

                        {/* REMEMBER ME / FORGOT PASSWORD (Login only) */}
                        {isLogin && (
                            <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2 text-[10px] sm:text-xs font-medium px-1">
                                <label className={`flex items-center gap-1 sm:gap-2 cursor-pointer ${
                                    darkMode ? 'text-gray-300' : 'text-gray-500'
                                }`}>
                                    <input type="checkbox" className="accent-[#6A4DF4] w-3 h-3 sm:w-4 sm:h-4" /> 
                                    <span>Remember Me</span>
                                </label>
                                <a href="#" className={`${
                                    darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-[#6A4DF4] hover:underline'
                                }`}>
                                    Forgot Password?
                                </a>
                            </div>
                        )}

                        {/* TERMS & CONDITIONS (Register only) */}
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className={`flex items-start gap-2 cursor-pointer ${
                                    darkMode ? 'text-gray-300' : 'text-gray-600'
                                }`}>
                                    <input 
                                        type="checkbox" 
                                        className="accent-[#6A4DF4] w-3 h-3 sm:w-4 sm:h-4 mt-0.5"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                    />
                                    <span className="text-[10px] sm:text-xs">
                                        I agree to the <a href="#" className="text-[#6A4DF4] hover:underline">Terms of Service</a> and <a href="#" className="text-[#6A4DF4] hover:underline">Privacy Policy</a>
                                    </span>
                                </label>
                                {formErrors.terms && (
                                    <p className="text-red-500 text-[10px] sm:text-xs">{formErrors.terms}</p>
                                )}
                            </div>
                        )}

                        {/* SUBMIT BUTTON */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`w-full py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                                darkMode 
                                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white' 
                                    : 'bg-gradient-to-r from-[#6A4DF4] to-[#8A7DF8] hover:from-[#5b3ddb] hover:to-[#7A6DF8] text-white'
                            } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    {isLogin ? "Log In" : "Create Account"} 
                                    <FaArrowRight className="text-xs sm:text-sm" />
                                </>
                            )}
                        </button>

                    </form>

                    {/* SOCIAL LOGIN */}
                    <div className="mt-6 sm:mt-8 w-full">
                        <div className="relative flex py-2 items-center">
                            <div className={`flex-grow border-t ${
                                darkMode ? 'border-gray-700' : 'border-gray-200'
                            }`}></div>
                            <span className={`flex-shrink mx-2 sm:mx-4 text-[10px] sm:text-xs uppercase ${
                                darkMode ? 'text-gray-400' : 'text-gray-400'
                            }`}>
                                Or continue with
                            </span>
                            <div className={`flex-grow border-t ${
                                darkMode ? 'border-gray-700' : 'border-gray-200'
                            }`}></div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
                            <button className={`p-2 rounded-lg border transition-all hover:scale-105 ${
                                darkMode 
                                    ? 'border-gray-700 hover:bg-gray-700 text-gray-300' 
                                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                            }`}>
                                <FaGoogle className="mx-auto text-sm sm:text-base text-red-500" />
                            </button>
                            <button className={`p-2 rounded-lg border transition-all hover:scale-105 ${
                                darkMode 
                                    ? 'border-gray-700 hover:bg-gray-700 text-gray-300' 
                                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                            }`}>
                                <FaFacebookF className="mx-auto text-sm sm:text-base text-blue-600" />
                            </button>
                            <button className={`p-2 rounded-lg border transition-all hover:scale-105 ${
                                darkMode 
                                    ? 'border-gray-700 hover:bg-gray-700 text-gray-300' 
                                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                            }`}>
                                <FaTwitter className="mx-auto text-sm sm:text-base text-blue-400" />
                            </button>
                            <button className={`p-2 rounded-lg border transition-all hover:scale-105 ${
                                darkMode 
                                    ? 'border-gray-700 hover:bg-gray-700 text-gray-300' 
                                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                            }`}>
                                <FaGithub className="mx-auto text-sm sm:text-base" />
                            </button>
                        </div>
                    </div>

                    {/* Switch between login/register (mobile) */}
                    <div className="mt-4 sm:mt-6 text-center lg:hidden">
                        <p className={`text-xs sm:text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-[#6A4DF4] hover:underline font-semibold"
                            >
                                {isLogin ? "Register" : "Login"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;