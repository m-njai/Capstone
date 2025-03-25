import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Update when deployed

// Inventory APIs
export const getInventory = async () => axios.get(`${API_BASE_URL}/inventory`);
export const addInventory = async (item) => axios.post(`${API_BASE_URL}/inventory/add`, item);

// Suppliers APIs
export const getSuppliers = async () => axios.get(`${API_BASE_URL}/suppliers`);
export const addSupplier = async (supplier) => axios.post(`${API_BASE_URL}/suppliers/add`, supplier);

// Tasks APIs
export const getTasks = async () => axios.get(`${API_BASE_URL}/tasks`);
export const addTask = async (task) => axios.post(`${API_BASE_URL}/tasks/create`, task);
export const updateTaskStatus = async (taskId, newStatus) => 
    axios.post(`${API_BASE_URL}/tasks/update`, { id: taskId, new_status: newStatus });
