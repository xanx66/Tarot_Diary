import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || ""; // Blank for proxy in dev

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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

// Tarot endpoints
export const performReading = async (readingParams) => {
  try {
    const response = await api.post("/api/tarot/readings", readingParams);
    return response.data;
  } catch (error) {
    console.error("API error performing reading:", error);
    throw error;
  }
};

export const getUserReadings = async () => {
  try {
    const response = await api.get("/api/tarot/readings/user");
    return response.data;
  } catch (error) {
    console.error("API error fetching user readings:", error);
    throw error;
  }
};

// User endpoints
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/api/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("API error registering user:", error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/api/users/login", credentials);
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

// AI endpoints
export const getInitialReading = async (params) => {
  // params: { question, cards, personality, gender }
  try {
    const response = await api.post("/api/ai/initial-reading", params);
    return response.data;
  } catch (error) {
    console.error("API error getting initial AI reading:", error);
    throw error;
  }
};

export const chatWithAI = async (params) => {
  // params: { chatHistory, userMessage, personality, gender }
  try {
    const response = await api.post("/api/ai/chat", params);
    return response.data;
  } catch (error) {
    console.error("API error chatting with AI:", error);
    throw error;
  }
};

export default api;
