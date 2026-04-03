import React, { useState } from "react";
import {
  X,
  Save,
  DollarSign,
  IndianRupee,
  Tag,
  Calendar,
  AlignLeft,
  Mail,
} from "lucide-react";
import api from "../services/api";
import useAuthStore from "../store/useAuthStore";
import useTransactionStore from "../store/useTransactionStore";
import useAdminStore from "../store/useAdminStore";
import toast from "react-hot-toast";

const AddTransactionModal = ({ isOpen, onClose, onRefresh }) => {
  const { user: currentUser } = useAuthStore();
  const { addTransactionLocal: addAdminLocal } = useAdminStore();
  const { addTransactionLocal: addPersonalLocal } = useTransactionStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "",
    description: "",
    targetUserEmail: "",
    date: new Date().toISOString().split("T")[0],
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.amount <= 0) return toast.error("Amount must be greater than 0");
    
    setLoading(true);
    try {
      
      const { data } = await api.post('/finance', formData);
      
   
      if (currentUser?.role === 'admin' || currentUser?.role === 'analyst') {
        addAdminLocal(data.data);
      } else {
    
        addPersonalLocal(data.data);
      }
      
      toast.success('Transaction Recorded Successfully!');
      
      
      setFormData({
        amount: '',
        type: 'expense',
        category: '',
        description: '',
        targetUserEmail: '',
        date: new Date().toISOString().split('T')[0]
      });
      
      
      if (onRefresh) onRefresh(); 
      onClose();

    } catch (err) {
      
      const errorMsg = err.response?.data?.message || "Failed to add entry";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl p-8 relative animate-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          New Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ROLE-BASED: Target User Email */}
          {(currentUser?.role === "admin" ||
            currentUser?.role === "analyst") && (
            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100 flex gap-3">
              <Mail className="text-indigo-500 mt-1" size={18} />
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">
                  Target User Email
                </label>
                <input
                  type="email"
                  placeholder="Enter user email..."
                  className="w-full bg-transparent border-b border-indigo-200 outline-none text-slate-900 placeholder:text-indigo-300 py-1 text-sm"
                  value={formData.targetUserEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      targetUserEmail: e.target.value,
                    })
                  }
                />
                <p className="text-[10px] text-indigo-400 mt-1 italic">
                  Leave blank to add to your own account.
                </p>
              </div>
            </div>
          )}

          {/* Type Toggle */}
          <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-2xl">
            {["income", "expense"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFormData({ ...formData, type: t })}
                className={`cursor-pointer py-2.5 rounded-xl font-bold capitalize transition-all ${
                  formData.type === t
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Amount and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                Amount (₹)
              </label>
              <div className="relative">
                <IndianRupee
                  className="absolute left-3 top-3.5 text-slate-400"
                  size={16}
                />
                <input
                  type="number"
                  required
                  placeholder="0.00"
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-500 focus:bg-white transition outline-none text-sm"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                Category
              </label>
              <div className="relative">
                <Tag
                  className="absolute left-3 top-3.5 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  required
                  placeholder="Food, Salary..."
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-500 focus:bg-white transition outline-none text-sm"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
              Date
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-3.5 text-slate-400"
                size={16}
              />
              <input
                type="date"
                required
                className="w-full pl-9 pr-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-500 focus:bg-white transition outline-none text-sm"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
              Description
            </label>
            <div className="relative">
              <AlignLeft
                className="absolute left-3 top-3.5 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Optional details..."
                className="w-full pl-9 pr-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:border-indigo-500 focus:bg-white transition outline-none text-sm"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 mt-4 shadow-lg active:scale-[0.98]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Save size={18} /> Save Transaction
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
