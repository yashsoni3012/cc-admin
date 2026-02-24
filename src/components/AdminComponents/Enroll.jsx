import React, { useState, useEffect } from 'react';
import {
    FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBook,
    FaSync, FaSearch, FaInbox, FaTimes, FaGraduationCap, FaHashtag,
    FaEye, FaChevronUp, FaChevronDown, FaCalendarAlt, FaFilter
} from 'react-icons/fa';

// --- AVATAR COLORS ---
const avatarColors = [
    'from-violet-500 to-indigo-400',
    'from-rose-500 to-pink-400',
    'from-emerald-500 to-teal-400',
    'from-amber-500 to-orange-400',
    'from-blue-500 to-cyan-400',
    'from-fuchsia-500 to-purple-400',
    'from-lime-500 to-green-400',
    'from-red-500 to-orange-400',
];

const getColor = (id) => avatarColors[id % avatarColors.length];
const getInitials = (first, last) =>
    `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase() || '??';

// Format date if available
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// --- DETAIL MODAL ---
const EnrollmentModal = ({ enrollment, onClose }) => {
    if (!enrollment) return null;
    const fullName = `${enrollment.first_name} ${enrollment.last_name}`;
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-8 border-b border-slate-100">
                    <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getColor(enrollment.id)} flex items-center justify-center text-white font-bold text-xl`}>
                            {getInitials(enrollment.first_name, enrollment.last_name)}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 text-xl capitalize">{fullName}</p>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="text-sm bg-violet-50 text-violet-600 px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
                                    <FaHashtag className="text-xs" /> {enrollment.id}
                                </span>
                                <span className="text-sm text-slate-400 flex items-center gap-1.5">
                                    <FaMapMarkerAlt className="text-xs text-rose-400" />
                                    <span className="capitalize">{enrollment.city}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors">
                        <FaTimes className="text-sm" />
                    </button>
                </div>
                
                <div className="p-8 overflow-y-auto flex-1">
                    {/* Contact Info */}
                    <div className="mb-6 pb-6 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Contact Information</p>
                        <div className="grid grid-cols-2 gap-4">
                            <a href={`mailto:${enrollment.email}`} className="flex items-center gap-3 text-base text-slate-600 hover:text-violet-600 transition-colors">
                                <FaEnvelope className="text-violet-400 text-lg" />
                                <span className="font-medium">{enrollment.email}</span>
                            </a>
                            <a href={`tel:${enrollment.mobile}`} className="flex items-center gap-3 text-base text-slate-600 hover:text-violet-600 transition-colors">
                                <FaPhone className="text-violet-400 text-lg" />
                                <span className="font-medium">{enrollment.mobile}</span>
                            </a>
                        </div>
                    </div>
                    
                    {/* Course Info */}
                    <div className="mb-6 pb-6 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Enrollment Details</p>
                        <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-2xl p-5 border border-violet-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-400 flex items-center justify-center flex-shrink-0 shadow-md">
                                    <FaGraduationCap className="text-white text-lg" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">Course</p>
                                    <p className="text-lg font-bold text-slate-700">{enrollment.course_name}</p>
                                    <p className="text-sm text-slate-500 mt-1">Course ID: {enrollment.course_id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Additional Info if available */}
                    <div>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Additional Information</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 rounded-xl p-4">
                                <p className="text-xs text-slate-400 mb-1">Enrollment Date</p>
                                <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <FaCalendarAlt className="text-violet-400" />
                                    {formatDate(enrollment.created_at)}
                                </p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4">
                                <p className="text-xs text-slate-400 mb-1">Location</p>
                                <p className="text-sm font-semibold text-slate-700 flex items-center gap-2 capitalize">
                                    <FaMapMarkerAlt className="text-rose-400" />
                                    {enrollment.city}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-6 py-3 text-base font-medium bg-gradient-to-r from-violet-600 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- LIST VIEW ROW COMPONENT (Larger) ---
const EnrollmentRow = ({ enrollment, onClick }) => {
    const fullName = `${enrollment.first_name} ${enrollment.last_name}`;

    return (
        <div className="bg-white border border-slate-100 rounded-xl hover:shadow-lg hover:border-violet-200 transition-all duration-200 mb-3 overflow-hidden">
            {/* Mobile View */}
            <div className="block md:hidden">
                <div className="p-5">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getColor(enrollment.id)} flex items-center justify-center text-white font-bold text-base flex-shrink-0`}>
                            {getInitials(enrollment.first_name, enrollment.last_name)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-slate-800 text-base truncate capitalize">{fullName}</h3>
                                <span className="text-xs font-bold bg-violet-50 text-violet-600 px-3 py-1 rounded-full flex items-center gap-1">
                                    <FaHashtag className="text-[10px]" />{enrollment.id}
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                                <FaMapMarkerAlt className="text-xs text-rose-400" />
                                <span className="text-sm text-slate-500 font-medium capitalize">{enrollment.city}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <a href={`mailto:${enrollment.email}`} className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 rounded-xl px-4 py-3 truncate">
                            <FaEnvelope className="text-violet-400 flex-shrink-0" />
                            <span className="truncate">{enrollment.email}</span>
                        </a>
                        <a href={`tel:${enrollment.mobile}`} className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 rounded-xl px-4 py-3">
                            <FaPhone className="text-violet-400 flex-shrink-0" />
                            <span className="truncate">{enrollment.mobile}</span>
                        </a>
                    </div>

                    <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl p-4 border border-violet-100/60 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                                <FaGraduationCap className="text-white text-sm" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-0.5">Course</p>
                                <p className="text-base font-bold text-slate-700 truncate">{enrollment.course_name}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 flex items-center gap-1.5">
                            <FaCalendarAlt className="text-[10px]" />
                            {formatDate(enrollment.created_at)}
                        </span>
                        <button
                            onClick={() => onClick(enrollment)}
                            className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 hover:bg-violet-100 flex items-center justify-center transition-colors"
                        >
                            <FaEye className="text-sm" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">
                <div className="flex items-center px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="w-16 flex-shrink-0">
                        <span className="text-sm font-mono text-slate-400 font-medium">#{enrollment.id}</span>
                    </div>
                    
                    <div className="w-64 flex-shrink-0 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getColor(enrollment.id)} flex items-center justify-center text-white font-bold text-sm`}>
                            {getInitials(enrollment.first_name, enrollment.last_name)}
                        </div>
                        <span className="font-semibold text-base text-slate-700 truncate capitalize">{fullName}</span>
                    </div>

                    <div className="w-40 flex-shrink-0">
                        <span className="text-sm text-slate-500 flex items-center gap-1.5">
                            <FaMapMarkerAlt className="text-rose-400 text-xs" />
                            <span className="capitalize">{enrollment.city}</span>
                        </span>
                    </div>

                    <div className="flex-1 min-w-0 px-3">
                        <a href={`mailto:${enrollment.email}`} className="text-sm text-slate-500 hover:text-violet-600 truncate block font-medium">
                            {enrollment.email}
                        </a>
                    </div>

                    <div className="w-32 flex-shrink-0">
                        <a href={`tel:${enrollment.mobile}`} className="text-sm text-slate-500 hover:text-violet-600 font-medium">
                            {enrollment.mobile}
                        </a>
                    </div>

                    <div className="w-48 flex-shrink-0">
                        <span className="text-sm font-medium text-slate-700 truncate block">
                            {enrollment.course_name}
                        </span>
                    </div>

                    <div className="w-24 flex-shrink-0">
                        <span className="text-sm text-slate-400 flex items-center gap-1.5">
                            <FaCalendarAlt className="text-xs" />
                            {formatDate(enrollment.created_at)}
                        </span>
                    </div>

                    <div className="w-16 flex-shrink-0 flex justify-end">
                        <button
                            onClick={() => onClick(enrollment)}
                            className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 hover:bg-violet-100 flex items-center justify-center transition-colors"
                            title="View details"
                        >
                            <FaEye className="text-sm" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SKELETON LOADER (Larger) ---
const SkeletonRow = () => (
    <div className="bg-white border border-slate-100 rounded-xl p-5 mb-3 animate-pulse">
        {/* Mobile skeleton */}
        <div className="block md:hidden">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-slate-200" />
                <div className="flex-1">
                    <div className="h-5 bg-slate-200 rounded-lg w-1/2 mb-2" />
                    <div className="h-4 bg-slate-100 rounded-lg w-1/3" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="h-12 bg-slate-100 rounded-xl" />
                <div className="h-12 bg-slate-100 rounded-xl" />
            </div>
            <div className="h-20 bg-slate-100 rounded-xl mb-4" />
            <div className="flex justify-between">
                <div className="h-5 bg-slate-100 rounded-lg w-24" />
                <div className="w-10 h-10 bg-slate-100 rounded-xl" />
            </div>
        </div>
        
        {/* Desktop skeleton */}
        <div className="hidden md:flex items-center px-6 py-3">
            <div className="w-16 h-5 bg-slate-200 rounded" />
            <div className="w-64 flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-xl" />
                <div className="h-5 bg-slate-200 rounded flex-1" />
            </div>
            <div className="w-40 h-5 bg-slate-200 rounded" />
            <div className="flex-1 px-3">
                <div className="h-5 bg-slate-200 rounded" />
            </div>
            <div className="w-32 h-5 bg-slate-200 rounded" />
            <div className="w-48 h-5 bg-slate-200 rounded" />
            <div className="w-24 h-5 bg-slate-200 rounded" />
            <div className="w-16 h-9 bg-slate-200 rounded-xl" />
        </div>
    </div>
);

// --- MAIN COMPONENT ---
const EnrollmentManager = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filterCourse, setFilterCourse] = useState('');
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);
    const [sortField, setSortField] = useState('id');
    const [sortDirection, setSortDirection] = useState('desc');
    const [showFilters, setShowFilters] = useState(false);

    const fetchEnrollments = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('https://codingcloud.pythonanywhere.com/enroll/');
            const json = await res.json();
            if (Array.isArray(json)) {
                setEnrollments(json);
            } else {
                setError('Unexpected response from server.');
            }
        } catch (err) {
            setError('Failed to fetch enrollments. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchEnrollments(); }, []);

    // Unique course names for filter
    const courseOptions = [...new Set(enrollments.map(e => e.course_name))].sort();

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredAndSorted = enrollments
        .filter(e => {
            const fullName = `${e.first_name} ${e.last_name}`.toLowerCase();
            const matchSearch =
                fullName.includes(search.toLowerCase()) ||
                e.email?.toLowerCase().includes(search.toLowerCase()) ||
                e.mobile?.includes(search) ||
                e.city?.toLowerCase().includes(search.toLowerCase()) ||
                e.course_name?.toLowerCase().includes(search.toLowerCase());
            const matchCourse = filterCourse ? e.course_name === filterCourse : true;
            return matchSearch && matchCourse;
        })
        .sort((a, b) => {
            let aVal = a[sortField];
            let bVal = b[sortField];
            
            if (sortField === 'id' || sortField === 'created_at') {
                aVal = sortField === 'id' ? a.id : new Date(a.created_at || 0);
                bVal = sortField === 'id' ? b.id : new Date(b.created_at || 0);
            }
            
            if (sortField === 'full_name') {
                aVal = `${a.first_name} ${a.last_name}`;
                bVal = `${b.first_name} ${b.last_name}`;
            }
            
            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

    const SortIcon = ({ field }) => {
        if (sortField !== field) return <span className="text-slate-300 ml-1 text-xs">↕️</span>;
        return sortDirection === 'asc' ? 
            <FaChevronUp className="text-violet-500 text-xs ml-1" /> : 
            <FaChevronDown className="text-violet-500 text-xs ml-1" />;
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Modal */}
            <EnrollmentModal 
                enrollment={selectedEnrollment} 
                onClose={() => setSelectedEnrollment(null)} 
            />

            {/* Header - Larger */}
            <div className="bg-white border-b border-slate-100 px-6 sm:px-8 py-6 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
                                <span className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                                    <FaGraduationCap className="text-white text-base" />
                                </span>
                                Enrollment Manager
                            </h1>
                            <p className="text-sm text-slate-400 mt-1 ml-12">
                                {loading ? 'Loading...' : `${filteredAndSorted.length} of ${enrollments.length} enrollments`}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            {/* Filter Toggle for Mobile */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="lg:hidden w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center"
                            >
                                <FaFilter className="text-base" />
                            </button>

                            {/* Filters - Desktop */}
                            <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full lg:w-auto`}>
                                {/* Course Filter */}
                                <select
                                    value={filterCourse}
                                    onChange={(e) => setFilterCourse(e.target.value)}
                                    className="text-base bg-slate-100 border-2 border-transparent focus:border-violet-400 focus:bg-white outline-none rounded-xl px-4 py-3 text-slate-600 font-medium transition-all cursor-pointer min-w-[200px]"
                                >
                                    <option value="">All Courses</option>
                                    {courseOptions.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>

                                {/* Search */}
                                <div className="relative flex-1 min-w-[250px]">
                                    <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400 text-sm" />
                                    <input
                                        type="text"
                                        placeholder="Search enrollments..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-11 pr-10 py-3 text-base bg-slate-100 rounded-xl border-2 border-transparent focus:border-violet-400 focus:bg-white outline-none transition-all w-full font-medium text-slate-700 placeholder:text-slate-400"
                                    />
                                    {search && (
                                        <button onClick={() => setSearch('')} className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400 hover:text-slate-600">
                                            <FaTimes className="text-sm" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Refresh */}
                            <button
                                onClick={fetchEnrollments}
                                disabled={loading}
                                className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-violet-200 hover:shadow-lg transition-all disabled:opacity-60 active:scale-95 flex-shrink-0"
                            >
                                <FaSync className={`text-base ${loading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {/* Active filters */}
                    {(search || filterCourse) && (
                        <div className="flex items-center gap-2 mt-4 flex-wrap ml-0">
                            {filterCourse && (
                                <span className="flex items-center gap-1.5 text-sm font-semibold bg-violet-100 text-violet-600 px-4 py-2 rounded-full">
                                    <FaBook className="text-xs" /> {filterCourse}
                                    <button onClick={() => setFilterCourse('')} className="ml-1 hover:text-violet-800">
                                        <FaTimes className="text-xs" />
                                    </button>
                                </span>
                            )}
                            {search && (
                                <span className="flex items-center gap-1.5 text-sm font-semibold bg-slate-100 text-slate-500 px-4 py-2 rounded-full">
                                    <FaSearch className="text-xs" /> "{search}"
                                    <button onClick={() => setSearch('')} className="ml-1 hover:text-slate-700">
                                        <FaTimes className="text-xs" />
                                    </button>
                                </span>
                            )}
                            <button
                                onClick={() => { setSearch(''); setFilterCourse(''); }}
                                className="text-sm text-red-400 hover:text-red-600 font-semibold transition-colors ml-2"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
                {/* Stats bar - Larger */}
                {!loading && enrollments.length > 0 && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: 'Total Enrollments', value: enrollments.length, color: 'text-violet-600', bg: 'bg-violet-50', icon: <FaUser /> },
                            { label: 'Courses', value: courseOptions.length, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: <FaBook /> },
                            { label: 'Cities', value: [...new Set(enrollments.map(e => e.city))].length, color: 'text-rose-500', bg: 'bg-rose-50', icon: <FaMapMarkerAlt /> },
                            { label: 'Showing', value: filteredAndSorted.length, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <FaGraduationCap /> },
                        ].map(s => (
                            <div key={s.label} className={`${s.bg} rounded-2xl px-5 py-4 flex items-center gap-4 border border-white shadow-sm`}>
                                <span className={`${s.color} text-xl`}>{s.icon}</span>
                                <div>
                                    <p className={`text-2xl font-extrabold ${s.color} leading-none`}>{s.value}</p>
                                    <p className="text-xs text-slate-500 font-medium mt-1">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error - Larger */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-5 text-base font-medium mb-8 flex items-center justify-between">
                        <span>{error}</span>
                        <button onClick={fetchEnrollments} className="text-sm font-bold underline hover:no-underline ml-4">
                            Retry
                        </button>
                    </div>
                )}

                {/* Desktop Table Header - Larger */}
                {!loading && !error && filteredAndSorted.length > 0 && (
                    <div className="hidden md:flex items-center px-6 py-3 mb-3 text-sm font-bold text-slate-400 uppercase tracking-wider bg-slate-50 rounded-xl">
                        <div 
                            className="w-16 flex-shrink-0 cursor-pointer hover:text-violet-600 flex items-center"
                            onClick={() => handleSort('id')}
                        >
                            ID <SortIcon field="id" />
                        </div>
                        <div 
                            className="w-64 flex-shrink-0 cursor-pointer hover:text-violet-600 flex items-center"
                            onClick={() => handleSort('full_name')}
                        >
                            Name <SortIcon field="full_name" />
                        </div>
                        <div 
                            className="w-40 flex-shrink-0 cursor-pointer hover:text-violet-600 flex items-center"
                            onClick={() => handleSort('city')}
                        >
                            City <SortIcon field="city" />
                        </div>
                        <div className="flex-1 min-w-0 px-3">Email</div>
                        <div className="w-32 flex-shrink-0">Phone</div>
                        <div 
                            className="w-48 flex-shrink-0 cursor-pointer hover:text-violet-600 flex items-center"
                            onClick={() => handleSort('course_name')}
                        >
                            Course <SortIcon field="course_name" />
                        </div>
                        <div 
                            className="w-24 flex-shrink-0 cursor-pointer hover:text-violet-600 flex items-center"
                            onClick={() => handleSort('created_at')}
                        >
                            Date <SortIcon field="created_at" />
                        </div>
                        <div className="w-16 flex-shrink-0 text-right">View</div>
                    </div>
                )}

                {/* Skeleton */}
                {loading && (
                    <div>
                        {[...Array(8)].map((_, i) => <SkeletonRow key={i} />)}
                    </div>
                )}

                {/* Empty - Larger */}
                {!loading && !error && filteredAndSorted.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-28 h-28 bg-violet-50 rounded-3xl flex items-center justify-center mb-6">
                            <FaInbox className="text-4xl text-violet-300" />
                        </div>
                        <h3 className="text-slate-700 font-bold text-2xl mb-2">No enrollments found</h3>
                        <p className="text-slate-400 text-base">
                            {search || filterCourse ? 'Try adjusting your filters.' : 'No enrollments have been made yet.'}
                        </p>
                    </div>
                )}

                {/* List View */}
                {!loading && filteredAndSorted.length > 0 && (
                    <div>
                        {filteredAndSorted.map(enrollment => (
                            <EnrollmentRow
                                key={enrollment.id}
                                enrollment={enrollment}
                                onClick={setSelectedEnrollment}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnrollmentManager;