import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/auth" });

// Signup API Call
export const signup = (userData) => API.post("/signup", userData);

// Login API Call
export const login = (userData) => API.post("/login", userData);
