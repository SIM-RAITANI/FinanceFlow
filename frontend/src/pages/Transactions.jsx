import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import useTransactionStore from '../store/useTransactionStore';
import useAdminStore from '../store/useAdminStore';
import AddTransactionModal from '../components/AddTransactionModal';
import { Search, Filter, Trash2, Calendar, Tag, AlertTriangle, Plus, Loader2 } from 'lucide-react';
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

  // Determine global loading state and display data
  const isLoading = isAdminOrAnalyst ? adminStore.loading : personalStore.loading;
  const displayData = isAdminOrAnalyst 
    ? adminStore.getGlobalFilteredData(filters) 
    : personalStore.getFilteredTransactions(filters);

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

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden relative min-h-[400px]">
        {isLoading ? (
          /* Loading State */
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-[1px] z-10">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-2" />
            <p className="text-slate-500 font-medium">Fetching transactions...</p>
          </div>
        ) : displayData.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-slate-50 p-6 rounded-full mb-4">
              <Search size={40} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No transactions found</h3>
            <p className="text-slate-500 max-w-xs mx-auto">
              We couldn't find any records matching your current filters.
            </p>
          </div>
        ) : (
          /* Data Table */
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
        )}
      </div>

      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchData} 
      />

      {showDeleteModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 text-center space-y-6">
            <AlertTriangle size={32} className="mx-auto text-rose-500" />
            <h2 className="text-2xl font-bold">Delete Record?</h2>
            <div className="flex flex-col gap-3">
              <button onClick={handleDelete} className="w-full cursor-pointer bg-rose-600 text-white py-4 rounded-2xl font-bold">Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="w-full cursor-pointer bg-slate-100 py-4 rounded-2xl">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;