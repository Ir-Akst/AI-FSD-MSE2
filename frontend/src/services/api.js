import axios from "axios";

const API = "https://ai-fsd-mse2-backend.onrender.com"; // ✔ use your actual linkexport const registerUser = (data) =>
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
