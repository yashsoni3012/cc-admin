import React, { useState, useEffect } from 'react';
import {
    FaUser, FaEnvelope, FaPhone, FaTag, FaCommentAlt,
    FaSync, FaSearch, FaInbox, FaChevronDown, FaChevronUp, FaTimes
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

// --- MESSAGE MODAL ---
const MessageModal = ({ contact, onClose }) => {
    if (!contact) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden border border-slate-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${getColor(contact.id)} flex items-center justify-center text-white font-bold text-sm`}>
                            {getInitials(contact.full_name)}
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 text-sm">{contact.full_name}</p>
                            <p className="text-xs text-slate-400">{contact.subject}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors">
                        <FaTimes className="text-xs" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap break-words">{contact.message}</p>
                </div>
            </div>
        </div>
    );
};

// --- CONTACT CARD ---
const ContactCard = ({ contact, onClick }) => {
    const [expanded, setExpanded] = useState(false);
    const shortMsg = contact.message?.slice(0, 100);
    const isLong = contact.message?.length > 100;

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group">
            <div className="p-5">
                {/* Header */}
                <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${getColor(contact.id)} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md`}>
                        {getInitials(contact.full_name)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                            <h3 className="font-bold text-slate-800 text-sm truncate">{contact.full_name}</h3>
                            <span className="text-[10px] font-bold bg-violet-50 text-violet-500 px-2 py-0.5 rounded-full flex-shrink-0">#{contact.id}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                            <FaTag className="text-[9px] text-violet-400" />
                            <span className="text-xs text-violet-500 font-semibold truncate">{contact.subject}</span>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-violet-600 transition-colors group/link bg-slate-50 rounded-xl px-3 py-2 truncate">
                        <FaEnvelope className="text-violet-400 flex-shrink-0" />
                        <span className="truncate">{contact.email}</span>
                    </a>
                    <a href={`tel:${contact.mobile_no}`} className="flex items-center gap-2 text-xs text-slate-500 hover:text-violet-600 transition-colors bg-slate-50 rounded-xl px-3 py-2">
                        <FaPhone className="text-violet-400 flex-shrink-0" />
                        <span>{contact.mobile_no}</span>
                    </a>
                </div>

                {/* Message */}
                <div className="mt-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                        <FaCommentAlt className="text-[9px] text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Message</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                        <p className="text-xs text-slate-600 leading-relaxed break-words">
                            {expanded ? contact.message : shortMsg}
                            {isLong && !expanded && '...'}
                        </p>
                        {isLong && (
                            <button
                                onClick={() => onClick(contact)}
                                className="mt-2 text-[11px] font-bold text-violet-500 hover:text-violet-700 flex items-center gap-1 transition-colors"
                            >
                                Read full message <FaChevronDown className="text-[8px]" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SKELETON LOADER ---
const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse">
        <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-slate-200 flex-shrink-0" />
            <div className="flex-1">
                <div className="h-4 bg-slate-200 rounded-lg w-1/2 mb-2" />
                <div className="h-3 bg-slate-100 rounded-lg w-1/3" />
            </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="h-8 bg-slate-100 rounded-xl" />
            <div className="h-8 bg-slate-100 rounded-xl" />
        </div>
        <div className="mt-3 h-16 bg-slate-100 rounded-xl" />
    </div>
);

// --- MAIN COMPONENT ---
const ContactsManager = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);

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

    const filtered = contacts.filter(c =>
        c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase()) ||
        c.subject?.toLowerCase().includes(search.toLowerCase()) ||
        c.mobile_no?.includes(search)
    );

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Modal */}
            <MessageModal contact={selectedContact} onClose={() => setSelectedContact(null)} />

            {/* Header */}
            <div className="bg-white border-b border-slate-100 px-4 sm:px-6 py-5 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-800">Contact Messages</h1>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {loading ? 'Loading...' : `${filtered.length} of ${contacts.length} contacts`}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <FaSearch className="absolute top-1/2 -translate-y-1/2 left-3.5 text-slate-400 text-xs" />
                            <input
                                type="text"
                                placeholder="Search contacts..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9 pr-4 py-2.5 text-sm bg-slate-100 rounded-xl border-2 border-transparent focus:border-violet-400 focus:bg-white outline-none transition-all w-48 sm:w-64 font-medium text-slate-700 placeholder:text-slate-400"
                            />
                            {search && (
                                <button onClick={() => setSearch('')} className="absolute top-1/2 -translate-y-1/2 right-3 text-slate-400 hover:text-slate-600">
                                    <FaTimes className="text-xs" />
                                </button>
                            )}
                        </div>
                        {/* Refresh */}
                        <button
                            onClick={fetchContacts}
                            disabled={loading}
                            className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-violet-200 hover:shadow-lg transition-all disabled:opacity-60 active:scale-95"
                        >
                            <FaSync className={`text-sm ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 text-sm font-medium mb-6 flex items-center justify-between">
                        <span>{error}</span>
                        <button onClick={fetchContacts} className="text-xs font-bold underline hover:no-underline ml-4">Retry</button>
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
                        <h3 className="text-slate-700 font-bold text-lg mb-1">No contacts found</h3>
                        <p className="text-slate-400 text-sm">{search ? 'Try a different search term.' : 'No messages have been received yet.'}</p>
                    </div>
                )}

                {/* Grid */}
                {!loading && filtered.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filtered.map(contact => (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                onClick={setSelectedContact}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactsManager;