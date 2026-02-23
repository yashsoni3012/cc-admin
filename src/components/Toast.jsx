import React, { useState, useEffect } from 'react';

// --- THE HOOK (Logic) ---
export const useToast = () => {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const closeToast = () => setToast((prev) => ({ ...prev, show: false }));

  return { toast, showToast, closeToast };
};

// --- THE UI (Design) ---
export const Toast = ({ toast, onClose }) => {
  // Logic Change: We do NOT return null here. 
  // We allow the component to render so the CSS 'translate' can animate the exit.
  
  const isSuccess = toast.type === 'success';

  return (
    <div 
      className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border-l-4 
      transition-all duration-500 ease-in-out transform
      ${toast.show ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'} 
      ${isSuccess ? 'bg-green-600 border-green-300' : 'bg-red-600 border-red-300'} text-white min-w-[300px]`}
    >
      {/* ICON */}
      <div className={`p-2 rounded-full ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}>
        {isSuccess ? (
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        ) : (
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        )}
      </div>

      {/* TEXT */}
      <div className="flex-1">
        <h4 className="font-bold text-lg">{isSuccess ? 'Success' : 'Error'}</h4>
        <p className="text-sm opacity-90">{toast.message}</p>
      </div>

      {/* CLOSE BUTTON */}
      <button onClick={onClose} className="opacity-70 hover:opacity-100 transition">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
};