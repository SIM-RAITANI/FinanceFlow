// import React, { useState } from 'react';
// import { useNavigate, Link, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Receipt, 
//   Users, 
//   LogOut, 
//   Menu, 
//   X, 
//   Wallet 
// } from 'lucide-react';
// import useAuthStore from '../store/useAuthStore';
// import toast from 'react-hot-toast';

// const MainLayout = ({ children }) => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const { user, logout } = useAuthStore();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     logout();
//     toast.success('Logged out successfully');
//     navigate('/login');
//   };

//   const navItems = [
//     { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} />, roles: ['viewer', 'analyst', 'admin'] },
//     { name: 'Transactions', path: '/transactions', icon: <Receipt size={20} />, roles: ['viewer', 'analyst', 'admin'] },
//     { name: 'User Management', path: '/users', icon: <Users size={20} />, roles: ['admin'] },
//   ];

//   const activeClass = "bg-indigo-600 text-white shadow-md shadow-indigo-200";
//   const inactiveClass = "text-slate-600 hover:bg-slate-100";

//   return (
//     <div className="min-h-screen bg-slate-50 flex">
//       {/* Sidebar for Desktop */}
//       <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//         <div className="p-6 flex flex-col h-full">
//           {/* Logo */}
//           <div className="flex items-center gap-3 mb-10 px-2">
//             <div className="bg-indigo-600 p-2 rounded-lg text-white">
//               <Wallet size={24} />
//             </div>
//             <span className="text-xl font-bold text-slate-800">FinanceFlow</span>
//           </div>

//           {/* Nav Links */}
//           <nav className="flex-1 space-y-2">
//             {navItems.map((item) => (
//               item.roles.includes(user?.role) && (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${location.pathname === item.path ? activeClass : inactiveClass}`}
//                 >
//                   {item.icon}
//                   {item.name}
//                 </Link>
//               )
//             ))}
//           </nav>

//           {/* User Info & Logout */}
//           <div className="mt-auto border-t border-slate-100 pt-6">
//             <div className="px-4 mb-4">
//               <p className="text-sm font-semibold text-slate-900">{user?.username}</p>
//               <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
//             </div>
//             <button 
//               onClick={handleLogout}
//               className="flex items-center gap-3 w-full px-4 py-3 text-red-500 font-medium hover:bg-red-50 rounded-xl transition"
//             >
//               <LogOut size={20} />
//               Logout
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <div className="flex-1 md:ml-64 flex flex-col">
//         {/* Mobile Header */}
//         <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
//           <span className="font-bold">FinanceFlow</span>
//           <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
//             {isSidebarOpen ? <X /> : <Menu />}
//           </button>
//         </header>

//         {/* Page Content */}
//         <main className="p-6 md:p-10 max-w-7xl mx-auto w-full">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;

import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  Users, 
  LogOut, 
  Menu, 
  X, 
  Wallet,
  AlertCircle,
  Logs
} from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import toast from 'react-hot-toast';

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // State for confirmation
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} />, roles: ['viewer', 'analyst', 'admin'] },
    { name: 'Transactions', path: '/transactions', icon: <Receipt size={20} />, roles: ['viewer', 'analyst', 'admin'] },
    { name: 'User Management', path: '/users', icon: <Users size={20} />, roles: ['admin'] },
    { name: 'Audit Logs', path: '/logs', icon: <Logs size={20} />, roles: ['admin'] },
  ];

  const activeClass = "bg-indigo-600 text-white shadow-lg shadow-indigo-200";
  const inactiveClass = "text-slate-600 hover:bg-slate-50 hover:text-indigo-600";

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-all duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-xl shadow-indigo-100">
              <Wallet size={24} />
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tight">FinanceFlow</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              item.roles.includes(user?.role) && (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all duration-200 ${location.pathname === item.path ? activeClass : inactiveClass}`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* User Profile & Logout Section */}
          <div className="mt-auto pt-6 border-t border-slate-100">
            <div className="bg-slate-50 p-4 rounded-2xl mb-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                {user?.username?.substring(0, 2).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">{user?.username}</p>
                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{user?.role}</p>
              </div>
            </div>

            {/* THE LOGOUT BUTTON */}
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="cursor-pointer group flex items-center gap-3 w-full px-5 py-4 text-slate-400 font-bold hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all duration-200"
            >
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-72 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Wallet size={20} className="text-indigo-600" />
            <span className="font-black text-slate-800 tracking-tight">FinanceFlow</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 cursor-pointer bg-slate-100 rounded-xl text-slate-600"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-12 w-full">
          {children}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-8 animate-in zoom-in duration-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle size={32} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Sign Out?</h2>
              <p className="text-slate-500 text-sm">Are you sure you want to end your session?</p>
              <div className="flex flex-col gap-3 pt-4">
                <button 
                  onClick={handleLogout}
                  className="cursor-pointer w-full bg-rose-600 text-white py-4 rounded-2xl font-bold hover:bg-rose-700 transition shadow-lg shadow-rose-100"
                >
                  Yes, Sign Out
                </button>
                <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="cursor-pointer w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition"
                >
                  Stay Logged In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;