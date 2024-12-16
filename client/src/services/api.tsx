import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Replace with your backend URL

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/data`);
    return response.data;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
};

export const fetchRealTimeData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/realtime-data`);
    return await response.data;
  } catch (error) {
    console.error("Error fetching real-time data:", error);
    return [];
  }
};
