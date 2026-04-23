import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const registerUser = (data) =>
  axios.post(`${API}/api/register`, data);

export const loginUser = (data) =>
  axios.post(`${API}/api/login`, data);

export const getGrievances = (token) =>
  axios.get(`${API}/api/grievances`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createGrievance = (data, token) =>
  axios.post(`${API}/api/grievances`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });