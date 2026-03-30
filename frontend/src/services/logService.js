import axios from "axios";

const API_URL = "http://localhost:8000/logs";

export const getLogs   = ()         => axios.get(API_URL);
export const getLog    = (id)       => axios.get(`${API_URL}/${id}`);
export const createLog = (data)     => axios.post(`${API_URL}/`, data);
export const updateLog = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteLog = (id)       => axios.delete(`${API_URL}/${id}`);