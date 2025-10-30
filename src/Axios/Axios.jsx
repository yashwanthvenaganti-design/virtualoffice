import axios from "axios";

const API_BASE_URL = "https://virtualoffice-java-backend.dev.adhkistaging.com/vo";

// 🔹 Helper: Automatically get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 🔹 GET request
export const getData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("GET error:", error);
    throw error;
  }
};

// 🔹 POST request
export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("POST error:", error);
    throw error;
  }
};

// 🔹 PUT request
export const putData = async (endpoint, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("PUT error:", error);
    throw error;
  }
};

// 🔹 DELETE request
export const deleteData = async (endpoint) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${endpoint}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("DELETE error:", error);
    throw error;
  }
};
