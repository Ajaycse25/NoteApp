import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials (cookies) in requests
});

export const signUp = async (formData) => {
  try {
    const response = await api.post("/auth/signup", { formData });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const requestOTP = async (email) => {
  try {
    const response = await api.post("/auth/request-otp", { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const login = async (formData) => {
  try {
    const response = await api.post("/auth/login", { formData });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await api.post("/notes", noteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const getNotes = async () => {
  try {
    const response = await api.get("/notes");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export const deleteNote = async (id) => {
  try {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}

export const userProfile = async () => {
  try {
    const response = await api.get("/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}