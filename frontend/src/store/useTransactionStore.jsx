import { create } from 'zustand';
import api from '../services/api';

const useTransactionStore = create((set, get) => ({
  transactions: [],
  loading: false,

  fetchTransactions: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/finance');
      console.log("Fetched transaction data...",data);
      set({ transactions: data.data, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  addTransactionLocal: (newRecord) => {
    set((state) => ({
      transactions: [newRecord, ...state.transactions]
    }));
  },

  
  deleteTransactionLocal: (id) => {
    set((state) => ({
      transactions: state.transactions.filter((t) => t._id !== id)
    }));
  },

  
  getFilteredTransactions: (filters) => {
    const { transactions } = get();
    return transactions.filter((t) => {
      const matchType = filters.type === 'all' || t.type === filters.type;
      const matchCategory = !filters.category || 
        t.category.toLowerCase().includes(filters.category.toLowerCase());
      const matchUser = !filters.userSearch || 
        (t.user?.username?.toLowerCase().includes(filters.userSearch.toLowerCase()));
      
      return matchType && matchCategory && matchUser;
    });
  }
}));

export default useTransactionStore;