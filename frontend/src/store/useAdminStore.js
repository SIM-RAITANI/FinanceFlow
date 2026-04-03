import { create } from 'zustand';
import api from '../services/api';

const useAdminStore = create((set, get) => ({
  allTransactions: [],
  loading: false,

  fetchAllTransactions: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/admin/transactions');
      set({ allTransactions: data.data, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  addTransactionLocal: (newRecord) => {
    set((state) => ({
      allTransactions: [newRecord, ...state.allTransactions]
    }));
  },

  removeTransactionLocal: (id) => {
    set((state) => ({
      allTransactions: state.allTransactions.filter((t) => t._id !== id)
    }));
  },


  getGlobalFilteredData: (filters) => {
    const { allTransactions } = get();
    return allTransactions.filter((t) => {
      const matchType = filters.type === 'all' || t.type === filters.type;
      const matchCategory = !filters.category || 
        t.category.toLowerCase().includes(filters.category.toLowerCase());
      
      
      const searchTerm = filters.userSearch.toLowerCase();
      const matchUser = !filters.userSearch || 
        t.user?.username?.toLowerCase().includes(searchTerm) ||
        t.user?.email?.toLowerCase().includes(searchTerm);
      
      return matchType && matchCategory && matchUser;
    });
  }
}));

export default useAdminStore;