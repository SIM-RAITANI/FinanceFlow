import api from './api';

export const getSummary = async () => {
  try {
    const response = await api.get('/finance/summary');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch summary';
  }
};

export const getTransactions = async () => {
  try {
    const response = await api.get('/finance');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch transactions';
  }
};