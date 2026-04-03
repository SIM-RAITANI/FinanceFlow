import React from 'react';
import { Link } from 'react-router-dom';
import { FileSearch, ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        
        {/* Visual Element */}
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full scale-150"></div>
          <div className="relative bg-white w-24 h-24 mx-auto rounded-[2rem] shadow-xl shadow-indigo-100 flex items-center justify-center text-indigo-600 mb-8 border border-slate-50">
            <FileSearch size={48} strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter">404</h1>
          <h2 className="text-2xl font-bold text-slate-800">Lost in the numbers?</h2>
          <p className="text-slate-500 leading-relaxed px-4">
            The page you are looking for doesn't exist or has been moved to a different financial ledger.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-4">
          <Link 
            to="/dashboard" 
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 active:scale-[0.98]"
          >
            <Home size={18} /> Back to Dashboard
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 text-slate-500 font-bold py-3 hover:text-slate-800 transition text-sm"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>

        {/* Branding Footer */}
        <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.2em] pt-12">
          FinanceFlow Audit System
        </p>
      </div>
    </div>
  );
};

export default NotFound;