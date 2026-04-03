import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Trash2, Shield, AlertTriangle, X, Power, UserCheck, UserMinus } from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';

const Users = () => {
  const { user: currentUser } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for Custom Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Access Denied: Admin only area");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchUsers(); 
  }, []);

  const handleRoleChange = async (userId, newRole,userRole) => {
    try {
      if (userRole === "admin" && newRole !== "admin") {
        toast.error("Admin users cannot have their role changed");
        return;
      }
      await api.patch(`/users/${userId}/role`, { role: newRole });
      toast.success(`Role updated to ${newRole}`);
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleStatusToggle = async (userId,userRole) => {
    try {
      if (userRole === "admin") {
        toast.error("Admin users cannot be disabled");
        return;
      }
      const { data } = await api.patch(`/users/${userId}/status`);
      toast.success(data.message);
      // Update local state instead of full re-fetch for better performance
      setUsers(users.map(u => u._id === userId ? { ...u, status: data.data.status } : u));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const confirmDelete = (user,userRole) => {
    if (userRole === "admin") {
      toast.error("Admin users cannot be deleted");
      return;
    }
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    setIsDeleting(true);
    try {
      await api.delete(`/users/${userToDelete._id}`);
      toast.success(`${userToDelete.username} removed successfully`);
      setUsers(users.filter(u => u._id !== userToDelete._id));
      setShowDeleteModal(false);
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setIsDeleting(false);
      setUserToDelete(null);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
      <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-slate-400 font-medium animate-pulse">Syncing user directory...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500">Manage employee access, roles, and account status.</p>
        </div>
        <div className="bg-indigo-50 text-indigo-700 px-5 py-2.5 rounded-2xl text-sm font-bold border border-indigo-100 shadow-sm flex items-center gap-2">
          <Shield size={18} /> Admin Control
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="px-8 py-6">User Details</th>
              <th className="px-6 py-6">Account Status</th>
              <th className="px-6 py-6">Assign Role</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-slate-50/30 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-bold shadow-sm shadow-indigo-50">
                      {u.username.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{u.username}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <button
                    onClick={() => handleStatusToggle(u._id,u.role)}
                    className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
                      u.status === 'active' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
                      : 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`}></div>
                    {u.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                  </button>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <select 
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value,u.role)}
                      className="text-xs font-bold bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none min-w-[120px]"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="analyst">Analyst</option>
                      <option value="admin">Admin</option>
                    </select>
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${
                      u.role === 'admin' ? 'text-purple-600' : 
                      u.role === 'analyst' ? 'text-blue-600' : 'text-slate-400'
                    }`}>
                      {u.role}
                    </span>
                  </div>
                </td>

                <td className="px-8 py-5 text-right">
                  <button 
                    onClick={() => confirmDelete(u,u.role)}
                    className="cursor-pointer p-2.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all active:scale-95"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {users.length === 0 && (
          <div className="py-20 text-center">
            <UserMinus size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-medium">No other users found in the system.</p>
          </div>
        )}
      </div>

      {/* --- CUSTOM DELETE CONFIRMATION MODAL --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl p-10 animate-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shadow-inner">
                <AlertTriangle size={40} />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Are you absolutely sure?</h2>
                <p className="text-slate-500 text-sm leading-relaxed px-4">
                  Deleting <span className="font-bold text-slate-800">{userToDelete?.username}</span> is permanent. 
                  All their session tokens will be invalidated immediately.
                </p>
              </div>

              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={handleDeleteUser}
                  disabled={isDeleting}
                  className="cursor-pointer w-full bg-rose-600 text-white py-4 rounded-2xl font-bold hover:bg-rose-700 transition shadow-lg shadow-rose-100 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Confirm Deletion"
                  )}
                </button>
                <button 
                  onClick={() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                  }}
                  className="cursor-pointer w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition"
                >
                  Keep User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;