// import React, { useEffect, useState } from 'react';
// import useTransactionStore from '../store/useTransactionStore';
// import useAuthStore from '../store/useAuthStore';
// import { Search, Filter, Trash2, Calendar, User as UserIcon, Tag } from 'lucide-react';
// import toast from 'react-hot-toast';
// import api from '../services/api';

// const Transactions = () => {
//   const { user } = useAuthStore();
//   const { fetchTransactions, deleteTransactionLocal, getFilteredTransactions, loading } = useTransactionStore();
  
//   const [filters, setFilters] = useState({
//     type: 'all',
//     category: '',
//     userSearch: ''
//   });

//   useEffect(() => {
//     fetchTransactions().catch(err => toast.error("Failed to load history"));
//   }, [fetchTransactions]);

//   const filteredData = getFilteredTransactions(filters);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return;
//     try {
//       await api.delete(`/finance/${id}`);
//       deleteTransactionLocal(id);
//       toast.success("Record deleted");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Delete failed");
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
//       <div className="flex justify-between items-end">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">Transaction History</h1>
//           <p className="text-slate-500">
//             {user?.role === 'admin' ? "Viewing all user records" : "Your personal financial history"}
//           </p>
//         </div>
//         <div className="text-right text-sm font-medium text-slate-400">
//           Showing {filteredData.length} records
//         </div>
//       </div>

//       {/* Filter Bar */}
//       <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         <div className="relative">
//           <Filter className="absolute left-3 top-3 text-slate-400" size={18} />
//           <select 
//             className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
//             onChange={(e) => setFilters({...filters, type: e.target.value})}
//           >
//             <option value="all">All Types</option>
//             <option value="income">Income</option>
//             <option value="expense">Expense</option>
//           </select>
//         </div>

//         <div className="relative">
//           <Tag className="absolute left-3 top-3 text-slate-400" size={18} />
//           <input 
//             type="text"
//             placeholder="Filter by Category..."
//             className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none"
//             onChange={(e) => setFilters({...filters, category: e.target.value})}
//           />
//         </div>

//         {user?.role === 'admin' && (
//           <div className="relative">
//             <Search className="absolute left-3 top-3 text-slate-400" size={18} />
//             <input 
//               type="text"
//               placeholder="Search Username..."
//               className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none"
//               onChange={(e) => setFilters({...filters, userSearch: e.target.value})}
//             />
//           </div>
//         )}
//       </div>

//       {/* Table Section */}
//       <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-slate-50/50 text-slate-500 uppercase text-[11px] font-bold tracking-widest">
//                 <th className="px-8 py-5">Date & Description</th>
//                 {user?.role === 'admin' && <th className="px-6 py-5 text-center">User</th>}
//                 <th className="px-6 py-5">Category</th>
//                 <th className="px-6 py-5 text-right">Amount</th>
//                 {user?.role !== 'viewer' && <th className="px-8 py-5 text-right">Actions</th>}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {filteredData.map((record) => (
//                 <tr key={record._id} className="hover:bg-slate-50/50 transition-colors group">
//                   <td className="px-8 py-5">
//                     <div className="flex items-center gap-4">
//                       <div className={`p-2 rounded-lg ${record.type === 'income' ? 'bg-emerald-50' : 'bg-rose-50'}`}>
//                         <Calendar size={18} className={record.type === 'income' ? 'text-emerald-600' : 'text-rose-600'} />
//                       </div>
//                       <div>
//                         <p className="font-bold text-slate-800">{record.description || 'No description'}</p>
//                         <p className="text-xs text-slate-400">{new Date(record.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
//                       </div>
//                     </div>
//                   </td>
                  
//                   {user?.role === 'admin' && (
//                     <td className="px-6 py-5">
//                       <div className="flex items-center justify-center gap-2">
//                         <div className="w-7 h-7 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-[10px] font-bold uppercase">
//                           {record.user?.username?.substring(0, 2)}
//                         </div>
//                         <span className="text-sm font-medium text-slate-600">{record.user?.username}</span>
//                       </div>
//                     </td>
//                   )}

//                   <td className="px-6 py-5">
//                     <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
//                       {record.category}
//                     </span>
//                   </td>

//                   <td className={`px-6 py-5 text-right font-bold ${record.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
//                     {record.type === 'income' ? '+' : '-'} ₹{record.amount.toLocaleString('en-IN')}
//                   </td>

//                   {user?.role !== 'viewer' && (
//                     <td className="px-8 py-5 text-right">
//                       <button 
//                         onClick={() => handleDelete(record._id)}
//                         className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
        
//         {filteredData.length === 0 && !loading && (
//           <div className="p-20 text-center text-slate-400">
//             <p className="text-lg font-medium">No transactions found</p>
//             <p className="text-sm">Try adjusting your filters or adding a new entry.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Transactions;

import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import useTransactionStore from '../store/useTransactionStore';
import useAdminStore from '../store/useAdminStore';
import AddTransactionModal from '../components/AddTransactionModal'; // Import the Modal
import { Search, Filter, Trash2, Calendar, Tag, AlertTriangle, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const Transactions = () => {
  const { user: currentUser } = useAuthStore();
  const isAdminOrAnalyst = currentUser?.role === 'admin' || currentUser?.role === 'analyst';

  const personalStore = useTransactionStore();
  const adminStore = useAdminStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [filters, setFilters] = useState({ type: 'all', category: '', userSearch: '' });

  const fetchData = () => {
    if (isAdminOrAnalyst) {
      adminStore.fetchAllTransactions().catch(() => toast.error("Failed to load global history"));
    } else {
      personalStore.fetchTransactions().catch(() => toast.error("Failed to load your history"));
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAdminOrAnalyst]);

  const displayData = isAdminOrAnalyst 
    ? adminStore.getGlobalFilteredData(filters) 
    : personalStore.getFilteredTransactions(filters);

  const handleDelete = async () => {
    if (!selectedId) return;
    setIsDeleting(true);
    try {
      await api.delete(`/finance/${selectedId}`);
      if (isAdminOrAnalyst) adminStore.removeTransactionLocal(selectedId);
      else personalStore.deleteTransactionLocal(selectedId);
      toast.success("Transaction deleted");
      setShowDeleteModal(false);
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setIsDeleting(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {isAdminOrAnalyst ? "Organizational Audit Log" : "Transaction History"}
          </h1>
          <p className="text-slate-500 text-sm">
            {isAdminOrAnalyst ? "Managing all company-wide financial records." : "Viewing your recorded activities."}
          </p>
        </div>

        {/* NEW: Add Transaction Button (Hidden for Viewers) */}
        {currentUser?.role !== 'viewer' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
          >
            <Plus size={20} /> Create Entry
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Filter className="absolute left-3 top-3.5 text-slate-400" size={18} />
          <select 
            className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium appearance-none cursor-pointer"
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="relative">
          <Tag className="absolute left-3 top-3.5 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Category..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          />
        </div>

        {isAdminOrAnalyst && (
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by username or email..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
              onChange={(e) => setFilters({...filters, userSearch: e.target.value})}
            />
          </div>
        )}
      </div>

      {/* Table & Modals */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-black tracking-widest">
                <th className="px-8 py-6">Date & Details</th>
                {isAdminOrAnalyst && <th className="px-6 py-6 text-center">User</th>}
                <th className="px-6 py-6 text-right">Amount</th>
                {currentUser?.role === 'admin' && <th className="px-8 py-6 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {displayData.map((record) => (
                <tr key={record._id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-5 flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${record.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{record.description || 'Transaction'}</p>
                      <p className="text-[10px] text-slate-400">{new Date(record.date).toLocaleDateString('en-IN')}</p>
                    </div>
                  </td>
                  
                  {isAdminOrAnalyst && (
                    <td className="px-6 py-5 text-center">
                      <p className="text-xs font-bold text-slate-700">{record.user?.username || 'N/A'}</p>
                      <p className="text-[10px] text-slate-400">{record.user?.email}</p>
                    </td>
                  )}

                  <td className={`px-6 py-5 text-right font-black text-sm ${record.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    ₹{record.amount.toLocaleString('en-IN')}
                  </td>

                  {currentUser?.role === 'admin' && (
                    <td className="px-8 py-5 text-right">
                      <button onClick={() => { setSelectedId(record._id); setShowDeleteModal(true); }} className="cursor-pointer p-2 text-slate-300 hover:text-rose-600 transition-all">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal Integration */}
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchData} 
      />

      {/* Delete Confirmation Modal (Same as before) */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 text-center space-y-6">
            <AlertTriangle size={32} className="mx-auto text-rose-500" />
            <h2 className="text-2xl font-bold">Delete Record?</h2>
            <div className="flex flex-col gap-3">
              <button onClick={handleDelete} className="w-full cursor-pointer  bg-rose-600 text-white py-4 rounded-2xl font-bold">Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="w-full cursor-pointer bg-slate-100 py-4 rounded-2xl">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;