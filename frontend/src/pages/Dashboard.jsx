// import React, { useEffect, useState } from 'react';
// import { getSummary } from '../services/financeService';
// import { 
//   TrendingUp, 
//   TrendingDown, 
//   Wallet, 
//   PieChart as PieChartIcon, 
//   Plus,
//   ArrowRight
// } from 'lucide-react';
// import { 
//   PieChart, 
//   Pie, 
//   ResponsiveContainer, 
//   Tooltip, 
//   Legend 
// } from 'recharts';
// import toast from 'react-hot-toast';

// const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

// const Dashboard = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const result = await getSummary();
        
       
//         const coloredCategoryStats = result.categoryStats.map((item, index) => ({
//           ...item,
//           fill: COLORS[index % COLORS.length]
//         }));

//         setData({ ...result, categoryStats: coloredCategoryStats });
//       } catch (err) {
//         toast.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
//         <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
//         <p className="text-slate-500 font-medium">Analyzing your finances...</p>
//       </div>
//     );
//   }

//   const { summary, categoryStats } = data;

//   return (
//     <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
//       {/* Top Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
//           <p className="text-slate-500">Real-time financial health and role-based insights.</p>
//         </div>
//         <button className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
//           <Plus size={20} /> Add Entry
//         </button>
//       </div>

//       {/* Primary Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard 
//           title="Total Income" 
//           amount={summary.income} 
//           icon={<TrendingUp size={24} className="text-emerald-600" />} 
//           bgColor="bg-emerald-50" 
//         />
//         <StatCard 
//           title="Total Expenses" 
//           amount={summary.expenses} 
//           icon={<TrendingDown size={24} className="text-rose-600" />} 
//           bgColor="bg-rose-50" 
//         />
//         <StatCard 
//           title="Net Balance" 
//           amount={summary.balance} 
//           icon={<Wallet size={24} className="text-indigo-600" />} 
//           bgColor="bg-indigo-50" 
//         />
//       </div>

//       {/* Charts and Insights Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
//         {/* Category Breakdown (Pie Chart) */}
//         <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-slate-50 rounded-lg">
//                 <PieChartIcon className="text-slate-600" size={20} />
//               </div>
//               <h3 className="font-bold text-slate-800 text-lg">Spending by Category</h3>
//             </div>
//           </div>
          
//           <div className="h-[300px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={categoryStats}
//                   dataKey="total"
//                   nameKey="_id"
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={70}
//                   outerRadius={100}
//                   paddingAngle={8}
//                   stroke="none"
//                 />
//                 <Tooltip 
//                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
//                 />
//                 <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Insight Card */}
//         <div className="lg:col-span-5 flex flex-col gap-6">
//           <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden flex-1">
//             <div className="relative z-10">
//               <h3 className="text-xl font-bold mb-4">Quick Analysis</h3>
//               <p className="text-slate-400 mb-6 leading-relaxed text-sm">
//                 You've recorded <span className="text-white font-semibold">{summary.transactionCount} transactions</span> this period. 
//                 Your savings rate is currently <span className="text-indigo-400 font-bold">{summary.income > 0 ? Math.round((summary.balance / summary.income) * 100) : 0}%</span>.
//               </p>
              
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center text-sm">
//                   <span className="text-slate-400">Budget Consumed</span>
//                   <span className="font-mono">68%</span>
//                 </div>
//                 <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
//                   <div className="bg-indigo-500 h-full w-[68%] transition-all duration-1000"></div>
//                 </div>
//               </div>
//             </div>
//             {/* Subtle background decoration */}
//             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl"></div>
//           </div>

//           <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
//             <div className="flex items-center justify-between mb-4">
//               <h4 className="font-bold text-slate-800">Action Required</h4>
//               <span className="bg-rose-100 text-rose-600 text-[10px] uppercase font-bold px-2 py-1 rounded-md">High Priority</span>
//             </div>
//             <p className="text-sm text-slate-500 mb-4 italic">"Verify the 'Miscellaneous' expenses for audit compliance."</p>
//             <button className="w-full flex items-center justify-center gap-2 text-indigo-600 font-semibold text-sm hover:gap-3 transition-all">
//               Go to Transactions <ArrowRight size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable Stat Card Component
// const StatCard = ({ title, amount, icon, bgColor }) => (
//   <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
//     <div className="flex items-center gap-4">
//       <div className={`${bgColor} p-4 rounded-2xl`}>
//         {icon}
//       </div>
//       <div>
//         <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
//         <p className="text-2xl font-bold text-slate-900">₹{amount.toLocaleString('en-IN')}</p>
//       </div>
//     </div>
//   </div>
// );

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import { getSummary } from '../services/financeService';
import useAuthStore from '../store/useAuthStore'; // Import your store
import AddTransactionModal from '../components/AddTransactionModal'; // Import the Modal
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  PieChart as PieChartIcon, 
  Plus,
  ArrowRight
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import toast from 'react-hot-toast';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthStore(); // Get user role from store

  const fetchDashboardData = async () => {
    try {
      const result = await getSummary();
      console.log("Dashboard data fetched:", result);
      const coloredCategoryStats = result.categoryStats.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length]
      }));
      setData({ ...result, categoryStats: coloredCategoryStats });
    } catch (err) {
      toast.error(err?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Analyzing your finances...</p>
      </div>
    );
  }

  const { summary, categoryStats } = data;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 text-sm">Welcome back, <span className="font-bold text-indigo-600">{user?.username}</span> ({user?.role})</p>
        </div>

        {/* ROLE-BASED ACCESS: Hide button for viewers */}
        {user?.role !== 'viewer' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
          >
            <Plus size={20} /> Add Entry
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Income" amount={summary.income} icon={<TrendingUp size={24} className="text-emerald-600" />} bgColor="bg-emerald-50" />
        <StatCard title="Total Expenses" amount={summary.expenses} icon={<TrendingDown size={24} className="text-rose-600" />} bgColor="bg-rose-50" />
        <StatCard title="Net Balance" amount={summary.balance} icon={<Wallet size={24} className="text-indigo-600" />} bgColor="bg-indigo-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <PieChartIcon className="text-slate-600" size={20} />
            <h3 className="font-bold text-slate-800 text-lg">Spending by Category</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryStats} dataKey="total" nameKey="_id" cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={8} stroke="none" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Analysis Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden flex-1">
            <h3 className="text-xl font-bold mb-4">Quick Analysis</h3>
            <p className="text-slate-400 mb-6 text-sm">
              Your savings rate is <span className="text-indigo-400 font-bold">{summary.income > 0 ? Math.round((summary.balance / summary.income) * 100) : 0}%</span> based on latest records.
            </p>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-2">
              <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${summary.income > 0 ? (summary.balance / summary.income) * 100 : 0}%` }}></div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchDashboardData} 
      />
    </div>
  );
};

const StatCard = ({ title, amount, icon, bgColor }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className={`${bgColor} p-4 rounded-2xl`}>{icon}</div>
      <div>
        <p className="text-sm font-semibold text-slate-500 uppercase">{title}</p>
        <p className="text-2xl font-bold text-slate-900">₹{amount?.toLocaleString('en-IN')}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;