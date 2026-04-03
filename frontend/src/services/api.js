import axios from 'axios';

const API_URL=import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api=axios.create({
    baseURL:API_URL,
});

api.interceptors.request.use(config=>{
    const token=localStorage.getItem('token');
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
   
    return Promise.reject({ message: 'Network error. Please check your connection.' });
  }
);

export default api;