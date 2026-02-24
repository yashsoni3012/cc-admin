import React, { useState, useEffect } from 'react';
import {
    FaUser, FaEnvelope, FaPhone, FaTag, FaCommentAlt,
    FaSync, FaSearch, FaInbox, FaChevronDown, FaChevronUp, FaTimes,
    FaEye, FaTrash, FaReply, FaCalendarAlt, FaClock
} from 'react-icons/fa';

// --- AVATAR COLORS ---
const avatarColors = [
    'from-violet-500 to-indigo-400',
    'from-rose-500 to-pink-400',
    'from-emerald-500 to-teal-400',
    'from-amber-500 to-orange-400',
    'from-blue-500 to-cyan-400',
    'from-fuchsia-500 to-purple-400',
];

const getColor = (id) => avatarColors[id % avatarColors.length];
const getInitials = (name) => name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '??';

// Format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// --- MESSAGE MODAL (Larger) ---
const MessageModal = ({ contact, onClose }) => {
    if (!contact) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-8 border-b border-slate-100">
                    <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getColor(contact.id)} flex items-center justify-center text-white font-bold text-xl`}>
                            {getInitials(contact.full_name)}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 text-xl">{contact.full_name}</p>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="text-sm bg-violet-50 text-violet-600 px-3 py-1.5 rounded-full font-medium">{contact.subject}</span>
                                <span className="text-sm text-slate-400 flex items-center gap-1.5">
                                    <FaCalendarAlt className="text-xs" />
                                    {formatDate(contact.created_at)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors">
                        <FaTimes className="text-sm" />
                    </button>
                </div>
                
                <div className="p-8 overflow-y-auto flex-1">
                    <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-100">
                        <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-base text-slate-600 hover:text-violet-600 transition-colors">
                            <FaEnvelope className="text-violet-400 text-lg" />
                            <span className="font-medium">{contact.email}</span>
                        </a>
                        <a href={`tel:${contact.mobile_no}`} className="flex items-center gap-3 text-base text-slate-600 hover:text-violet-600 transition-colors">
                            <FaPhone className="text-violet-400 text-lg" />
                            <span className="font-medium">{contact.mobile_no}</span>
                        </a>
                    </div>
                    
                    <div className="bg-slate-50 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <FaCommentAlt className="text-violet-400 text-base" />
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Message</span>
                        </div>
                        <p className="text-base text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                            {contact.message}
                        </p>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-6 py-3 text-base font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        Close
                    </button>
                    <button className="px-6 py-3 text-base font-medium bg-gradient-to-r from-violet-600 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2">
                        <FaReply className="text-sm" />
                        Reply
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- LIST VIEW ROW COMPONENT (Larger) ---
const ContactRow = ({ contact, onClick, onDelete }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white border border-slate-100 rounded-xl hover:shadow-lg hover:border-violet-200 transition-all duration-200 mb-3 overflow-hidden">
            {/* Mobile View (collapsed) - Larger */}
            <div className="block md:hidden">
                <div className="p-5">
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getColor(contact.id)} flex items-center justify-center text-white font-bold text-base flex-shrink-0`}>
                            {getInitials(contact.full_name)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-slate-800 text-base truncate">{contact.full_name}</h3>
                                <span className="text-xs font-bold bg-violet-50 text-violet-600 px-3 py-1 rounded-full">#{contact.id}</span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                                <FaTag className="text-[10px] text-violet-400" />
                                <span className="text-sm text-violet-500 font-medium truncate">{contact.subject}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 rounded-xl px-4 py-3 truncate">
                            <FaEnvelope className="text-violet-400 flex-shrink-0" />
                            <span className="truncate">{contact.email}</span>
                        </a>
                        <a href={`tel:${contact.mobile_no}`} className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 rounded-xl px-4 py-3">
                            <FaPhone className="text-violet-400 flex-shrink-0" />
                            <span className="truncate">{contact.mobile_no}</span>
                        </a>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 mb-4">
                        <p className="text-sm text-slate-600 line-clamp-2">
                            {contact.message}
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 flex items-center gap-1.5">
                            <FaCalendarAlt className="text-[10px]" />
                            {formatDate(contact.created_at)}
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onClick(contact)}
                                className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 hover:bg-violet-100 flex items-center justify-center transition-colors"
                            >
                                <FaEye className="text-sm" />
                            </button>
                            <button
                                onClick={() => onDelete?.(contact.id)}
                                className="w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"
                            >
                                <FaTrash className="text-sm" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop View (table-like) - Larger */}
            <div className="hidden md:block">
                <div className="flex items-center px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="w-16 flex-shrink-0">
                        <span className="text-sm font-mono text-slate-400 font-medium">#{contact.id}</span>
                    </div>
                    
                    <div className="w-56 flex-shrink-0 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getColor(contact.id)} flex items-center justify-center text-white font-bold text-sm`}>
                            {getInitials(contact.full_name)}
                        </div>
                        <span className="font-semibold text-base text-slate-700 truncate">{contact.full_name}</span>
                    </div>

                    <div className="w-44 flex-shrink-0">
                        <span className="text-sm bg-violet-50 text-violet-600 px-3 py-1.5 rounded-full font-medium inline-block">
                            {contact.subject}
                        </span>
                    </div>

                    <div className="flex-1 min-w-0 px-3">
                        <a href={`mailto:${contact.email}`} className="text-sm text-slate-500 hover:text-violet-600 truncate block font-medium">
                            {contact.email}
                        </a>
                    </div>

                    <div className="w-32 flex-shrink-0">
                        <a href={`tel:${contact.mobile_no}`} className="text-sm text-slate-500 hover:text-violet-600 font-medium">
                            {contact.mobile_no}
                        </a>
                    </div>

                    <div className="w-28 flex-shrink-0">
                        <span className="text-sm text-slate-400 flex items-center gap-1.5">
                            <FaCalendarAlt className="text-xs" />
                            {formatDate(contact.created_at)}
                        </span>
                    </div>

                    <div className="w-24 flex-shrink-0 flex justify-end gap-2">
                        <button
                            onClick={() => onClick(contact)}
                            className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 hover:bg-violet-100 flex items-center justify-center transition-colors"
                            title="View message"
                        >
                            <FaEye className="text-sm" />
                        </button>
                        <button
                            onClick={() => onDelete?.(contact.id)}
                            className="w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors"
                            title="Delete"
                        >
                            <FaTrash className="text-sm" />
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
                <div className="flex gap-2">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl" />
                    <div className="w-10 h-10 bg-slate-100 rounded-xl" />
                </div>
            </div>
        </div>
        
        {/* Desktop skeleton */}
        <div className="hidden md:flex items-center px-6 py-3">
            <div className="w-16 h-5 bg-slate-200 rounded" />
            <div className="w-56 flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-xl" />
                <div className="h-5 bg-slate-200 rounded flex-1" />
            </div>
            <div className="w-44 h-8 bg-slate-200 rounded-full" />
            <div className="flex-1 px-3">
                <div className="h-5 bg-slate-200 rounded" />
            </div>
            <div className="w-32 h-5 bg-slate-200 rounded" />
            <div className="w-28 h-5 bg-slate-200 rounded" />
            <div className="w-24 flex justify-end gap-2">
                <div className="w-9 h-9 bg-slate-200 rounded-xl" />
                <div className="w-9 h-9 bg-slate-200 rounded-xl" />
            </div>
        </div>
    </div>
);

// --- MAIN COMPONENT ---
const ContactsManager = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);
    const [sortField, setSortField] = useState('id');
    const [sortDirection, setSortDirection] = useState('desc');

    const fetchContacts = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('https://codingcloud.pythonanywhere.com/contacts/');
            const json = await res.json();
            if (json.status === 'success') {
                setContacts(json.data);
            } else {
                setError('Unexpected response from server.');
            }
        } catch (err) {
            setError('Failed to fetch contacts. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchContacts(); }, []);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredAndSorted = contacts
        .filter(c =>
            c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
            c.email?.toLowerCase().includes(search.toLowerCase()) ||
            c.subject?.toLowerCase().includes(search.toLowerCase()) ||
            c.mobile_no?.includes(search)
        )
        .sort((a, b) => {
            let aVal = a[sortField];
            let bVal = b[sortField];
            
            if (sortField === 'id' || sortField === 'created_at') {
                aVal = sortField === 'id' ? a.id : new Date(a.created_at);
                bVal = sortField === 'id' ? b.id : new Date(b.created_at);
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
            <MessageModal contact={selectedContact} onClose={() => setSelectedContact(null)} />

            {/* Header - Larger */}
            <div className="bg-white border-b border-slate-100 px-6 sm:px-8 py-6 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-extrabold text-slate-800">Contact Messages</h1>
                            <p className="text-sm text-slate-400 mt-1">
                                {loading ? 'Loading...' : `${filteredAndSorted.length} of ${contacts.length} contacts`}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Search - Larger */}
                            <div className="relative">
                                <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400 text-sm" />
                                <input
                                    type="text"
                                    placeholder="Search contacts..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-11 pr-10 py-3 text-base bg-slate-100 rounded-xl border-2 border-transparent focus:border-violet-400 focus:bg-white outline-none transition-all w-56 sm:w-72 font-medium text-slate-700 placeholder:text-slate-400"
                                />
                                {search && (
                                    <button 
                                        onClick={() => setSearch('')} 
                                        className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400 hover:text-slate-600"
                                    >
                                        <FaTimes className="text-sm" />
                                    </button>
                                )}
                            </div>
                            {/* Refresh - Larger */}
                            <button
                                onClick={fetchContacts}
                                disabled={loading}
                                className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-violet-200 hover:shadow-lg transition-all disabled:opacity-60 active:scale-95"
                            >
                                <FaSync className={`text-base ${loading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
                {/* Error - Larger */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-5 text-base font-medium mb-8 flex items-center justify-between">
                        <span>{error}</span>
                        <button onClick={fetchContacts} className="text-sm font-bold underline hover:no-underline ml-4">
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
                            className="w-56 flex-shrink-0 cursor-pointer hover:text-violet-600 flex items-center"
                            onClick={() => handleSort('full_name')}
                        >
                            Name <SortIcon field="full_name" />
                        </div>
                        <div 
                            className="w-44 flex-shrink-0 cursor-pointer hover:text-violet-600 flex items-center"
                            onClick={() => handleSort('subject')}
                        >
                            Subject <SortIcon field="subject" />
                        </div>
                        <div className="flex-1 min-w-0 px-3">Email</div>
                        <div className="w-32 flex-shrink-0">Phone</div>
                        <div 
                            className="w-28 flex-shrink-0 cursor-pointer hover:text-violet-600 flex items-center"
                            onClick={() => handleSort('created_at')}
                        >
                            Date <SortIcon field="created_at" />
                        </div>
                        <div className="w-24 flex-shrink-0 text-right">Actions</div>
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
                        <h3 className="text-slate-700 font-bold text-2xl mb-2">No contacts found</h3>
                        <p className="text-slate-400 text-base">
                            {search ? 'Try a different search term.' : 'No messages have been received yet.'}
                        </p>
                    </div>
                )}

                {/* List View */}
                {!loading && filteredAndSorted.length > 0 && (
                    <div>
                        {filteredAndSorted.map(contact => (
                            <ContactRow
                                key={contact.id}
                                contact={contact}
                                onClick={setSelectedContact}
                                onDelete={(id) => console.log('Delete', id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactsManager;