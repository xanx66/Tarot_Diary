import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests if the user is logged in
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const performReading = async (readingParams) => {
  try {
    const response = await api.post("/tarot/readings", readingParams);
    return response.data;
  } catch (error) {
    console.error("API error performing reading:", error);
    throw error;
  }
};

export const getUserReadings = async () => {
  try {
    const response = await api.get("/tarot/readings/user");
    return response.data;
  } catch (error) {
    console.error("API error fetching user readings:", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("API error registering user:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    // Store token in localStorage
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("API error logging in:", error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export default api;
