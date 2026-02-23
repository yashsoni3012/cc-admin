import React, { useState, useEffect } from 'react';
import {
    FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBook,
    FaSync, FaSearch, FaInbox, FaTimes, FaGraduationCap, FaHashtag
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

// --- SKELETON CARD ---
const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse">
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-200 flex-shrink-0" />
            <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded-lg w-1/2 mb-2" />
                <div className="h-3 bg-slate-100 rounded-lg w-1/3" />
            </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="h-8 bg-slate-100 rounded-xl" />
            <div className="h-8 bg-slate-100 rounded-xl" />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="h-8 bg-slate-100 rounded-xl" />
            <div className="h-8 bg-slate-100 rounded-xl" />
        </div>
        <div className="mt-3 h-10 bg-slate-100 rounded-xl" />
    </div>
);

// --- ENROLLMENT CARD ---
const EnrollmentCard = ({ enrollment }) => {
    const fullName = `${enrollment.first_name} ${enrollment.last_name}`;

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group">
            <div className="p-5">
                {/* Header */}
                <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getColor(enrollment.id)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200`}>
                        {getInitials(enrollment.first_name, enrollment.last_name)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="font-bold text-slate-800 text-sm truncate capitalize">{fullName}</h3>
                            <span className="text-[10px] font-bold bg-violet-50 text-violet-500 px-2 py-0.5 rounded-full flex-shrink-0 flex items-center gap-1">
                                <FaHashtag className="text-[8px]" />{enrollment.id}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                            <FaMapMarkerAlt className="text-[9px] text-rose-400" />
                            <span className="text-xs text-slate-400 font-medium capitalize">{enrollment.city}</span>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                        href={`mailto:${enrollment.email}`}
                        className="flex items-center gap-2 text-xs text-slate-500 hover:text-violet-600 transition-colors bg-slate-50 hover:bg-violet-50 rounded-xl px-3 py-2 truncate group/link"
                    >
                        <FaEnvelope className="text-violet-400 flex-shrink-0 group-hover/link:scale-110 transition-transform" />
                        <span className="truncate">{enrollment.email}</span>
                    </a>
                    <a
                        href={`tel:${enrollment.mobile}`}
                        className="flex items-center gap-2 text-xs text-slate-500 hover:text-violet-600 transition-colors bg-slate-50 hover:bg-violet-50 rounded-xl px-3 py-2 group/link"
                    >
                        <FaPhone className="text-violet-400 flex-shrink-0 group-hover/link:scale-110 transition-transform" />
                        <span>{enrollment.mobile}</span>
                    </a>
                </div>

                {/* Course Info */}
                <div className="mt-3 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl p-3 border border-violet-100/60 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-400 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <FaGraduationCap className="text-white text-xs" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">Enrolled Course</p>
                        <p className="text-sm font-bold text-slate-700 truncate">{enrollment.course_name}</p>
                    </div>
                    <span className="ml-auto text-[10px] font-bold bg-white text-indigo-500 px-2 py-1 rounded-lg border border-indigo-100 flex-shrink-0">
                        ID {enrollment.course_id}
                    </span>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
const EnrollmentManager = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filterCourse, setFilterCourse] = useState('');

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

    const filtered = enrollments.filter(e => {
        const fullName = `${e.first_name} ${e.last_name}`.toLowerCase();
        const matchSearch =
            fullName.includes(search.toLowerCase()) ||
            e.email?.toLowerCase().includes(search.toLowerCase()) ||
            e.mobile?.includes(search) ||
            e.city?.toLowerCase().includes(search.toLowerCase()) ||
            e.course_name?.toLowerCase().includes(search.toLowerCase());
        const matchCourse = filterCourse ? e.course_name === filterCourse : true;
        return matchSearch && matchCourse;
    });

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <div className="bg-white border-b border-slate-100 px-4 sm:px-6 py-5 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                                <span className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                                    <FaGraduationCap className="text-white text-xs" />
                                </span>
                                Enrollment Manager
                            </h1>
                            <p className="text-xs text-slate-400 mt-0.5 ml-10">
                                {loading ? 'Loading...' : `${filtered.length} of ${enrollments.length} enrollments`}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            {/* Course Filter */}
                            <select
                                value={filterCourse}
                                onChange={(e) => setFilterCourse(e.target.value)}
                                className="text-sm bg-slate-100 border-2 border-transparent focus:border-violet-400 focus:bg-white outline-none rounded-xl px-3 py-2.5 text-slate-600 font-medium transition-all cursor-pointer"
                            >
                                <option value="">All Courses</option>
                                {courseOptions.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>

                            {/* Search */}
                            <div className="relative">
                                <FaSearch className="absolute top-1/2 -translate-y-1/2 left-3.5 text-slate-400 text-xs" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9 pr-8 py-2.5 text-sm bg-slate-100 rounded-xl border-2 border-transparent focus:border-violet-400 focus:bg-white outline-none transition-all w-40 sm:w-56 font-medium text-slate-700 placeholder:text-slate-400"
                                />
                                {search && (
                                    <button onClick={() => setSearch('')} className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-400 hover:text-slate-600">
                                        <FaTimes className="text-xs" />
                                    </button>
                                )}
                            </div>

                            {/* Refresh */}
                            <button
                                onClick={fetchEnrollments}
                                disabled={loading}
                                className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-violet-200 hover:shadow-lg transition-all disabled:opacity-60 active:scale-95 flex-shrink-0"
                            >
                                <FaSync className={`text-sm ${loading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {/* Active filters */}
                    {(search || filterCourse) && (
                        <div className="flex items-center gap-2 mt-3 flex-wrap ml-0">
                            {filterCourse && (
                                <span className="flex items-center gap-1.5 text-xs font-semibold bg-violet-100 text-violet-600 px-3 py-1 rounded-full">
                                    <FaBook className="text-[9px]" /> {filterCourse}
                                    <button onClick={() => setFilterCourse('')} className="ml-1 hover:text-violet-800"><FaTimes className="text-[9px]" /></button>
                                </span>
                            )}
                            {search && (
                                <span className="flex items-center gap-1.5 text-xs font-semibold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                                    <FaSearch className="text-[9px]" /> "{search}"
                                    <button onClick={() => setSearch('')} className="ml-1 hover:text-slate-700"><FaTimes className="text-[9px]" /></button>
                                </span>
                            )}
                            <button
                                onClick={() => { setSearch(''); setFilterCourse(''); }}
                                className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

                {/* Stats bar */}
                {!loading && enrollments.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                        {[
                            { label: 'Total Enrollments', value: enrollments.length, color: 'text-violet-600', bg: 'bg-violet-50', icon: <FaUser /> },
                            { label: 'Courses', value: courseOptions.length, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: <FaBook /> },
                            { label: 'Cities', value: [...new Set(enrollments.map(e => e.city))].length, color: 'text-rose-500', bg: 'bg-rose-50', icon: <FaMapMarkerAlt /> },
                            { label: 'Showing', value: filtered.length, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <FaGraduationCap /> },
                        ].map(s => (
                            <div key={s.label} className={`${s.bg} rounded-2xl px-4 py-3 flex items-center gap-3 border border-white shadow-sm`}>
                                <span className={`${s.color} text-sm`}>{s.icon}</span>
                                <div>
                                    <p className={`text-lg font-extrabold ${s.color} leading-none`}>{s.value}</p>
                                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 text-sm font-medium mb-6 flex items-center justify-between">
                        <span>{error}</span>
                        <button onClick={fetchEnrollments} className="text-xs font-bold underline hover:no-underline ml-4">Retry</button>
                    </div>
                )}

                {/* Skeleton */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-violet-50 rounded-3xl flex items-center justify-center mb-4">
                            <FaInbox className="text-3xl text-violet-300" />
                        </div>
                        <h3 className="text-slate-700 font-bold text-lg mb-1">No enrollments found</h3>
                        <p className="text-slate-400 text-sm">
                            {search || filterCourse ? 'Try adjusting your filters.' : 'No enrollments have been made yet.'}
                        </p>
                    </div>
                )}

                {/* Grid */}
                {!loading && filtered.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filtered.map(enrollment => (
                            <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnrollmentManager;