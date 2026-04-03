// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Wallet, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
//       {/* Navigation */}
//       <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
//         <div className="flex items-center gap-2">
//           <div className="bg-indigo-600 p-2 rounded-lg">
//             <Wallet className="text-white w-6 h-6" />
//           </div>
//           <span className="text-xl font-bold tracking-tight">FinanceFlow</span>
//         </div>
//         <div className="flex gap-6 items-center">
//           <Link to="/login" className="font-medium hover:text-indigo-600 transition">Login</Link>
//           <Link to="/register" className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
//             Get Started
//           </Link>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <main className="max-w-7xl mx-auto px-8 py-20 flex flex-col items-center text-center">
//         <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900">
//           Manage your wealth with <br />
//           <span className="text-indigo-600">absolute clarity.</span>
//         </h1>
//         <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
//           The all-in-one backend-driven finance dashboard for tracking transactions, 
//           managing roles, and generating real-time analytics.
//         </p>
        
//         <div className="flex gap-4 mb-20">
//           <Link to="/register" className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition">
//             Start Your Dashboard <ArrowRight size={20} />
//           </Link>
//         </div>

//         {/* Feature Grid */}
//         <div className="grid md:grid-cols-3 gap-8 w-full">
//           <FeatureCard 
//             icon={<ShieldCheck className="text-indigo-600" />} 
//             title="Role-Based Access" 
//             desc="Viewer, Analyst, and Admin levels for secure data management." 
//           />
//           <FeatureCard 
//             icon={<BarChart3 className="text-indigo-600" />} 
//             title="Real-time Analytics" 
//             desc="Automated income and expense summaries at your fingertips." 
//           />
//           <FeatureCard 
//             icon={<Wallet className="text-indigo-600" />} 
//             title="Transaction Tracking" 
//             desc="Easily categorize and filter your financial history." 
//           />
//         </div>
//       </main>
//     </div>
//   );
// };

// const FeatureCard = ({ icon, title, desc }) => (
//   <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-left hover:shadow-md transition">
//     <div className="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
//       {icon}
//     </div>
//     <h3 className="text-xl font-bold mb-3">{title}</h3>
//     <p className="text-slate-500 leading-relaxed">{desc}</p>
//   </div>
// );

// export default LandingPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center">
      {/* Navigation - Full Width */}
      <nav className="w-full bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-sm">
              <Wallet className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">FinanceFlow</span>
          </div>
          <div className="flex gap-8 items-center">
            <Link to="/login" className="font-semibold text-slate-600 hover:text-indigo-600 transition">Login</Link>
            <Link to="/register" className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="w-full max-w-7xl px-6 py-24 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-bounce">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          New: AI Financial Summaries
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-slate-900 leading-[1.1]">
          Manage your wealth with <br />
          <span className="text-indigo-600">absolute clarity.</span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-3xl mb-12 leading-relaxed">
          The all-in-one backend-driven finance dashboard for tracking transactions, 
          managing roles, and generating real-time analytics.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-24">
          <Link to="/register" className="flex items-center justify-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition shadow-2xl shadow-slate-200">
            Start Your Dashboard <ArrowRight size={22} />
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-10 w-full">
          <FeatureCard 
            icon={<ShieldCheck size={28} className="text-indigo-600" />} 
            title="Role-Based Access" 
            desc="Granular permissions for Viewers, Analysts, and Admins to ensure data integrity." 
          />
          <FeatureCard 
            icon={<BarChart3 size={28} className="text-indigo-600" />} 
            title="Real-time Analytics" 
            desc="Beautifully aggregated summaries that turn raw data into actionable insights." 
          />
          <FeatureCard 
            icon={<Wallet size={28} className="text-indigo-600" />} 
            title="Transaction Tracking" 
            desc="Production-level CRUD operations with robust search and filtering capabilities." 
          />
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100 text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-lg">{desc}</p>
  </div>
);

export default LandingPage;