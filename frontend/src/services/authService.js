import api from './api';

export const registerUser=async(userData) =>{
    try {
        console.log("Registering user with data:", userData);
        const response=await api.post('/auth/register', userData);
        console.log("Registration response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        // throw error.response?.data?.message || "Registration failed";
        const errorData = error.response?.data || error;
        console.error("Service caught error:", errorData);
        throw errorData;
    }
};

export const loginUser=async(credentials) =>{
    try {
        console.log("Logging in with credentials:", credentials);
        const response=await api.post('/auth/login', credentials);
        console.log("Login response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error.response?.data || error  || "Login failed";
    }
};

export const logoutUser=async() =>{
    try {
        console.log("Logging out user");
        const response=await api.post('/auth/logout');
        console.log("Logout response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error.response?.data || "Logout failed";
    }
};
