import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
	baseURL: `http://localhost:3008/api/v1/`,
});

// Add an interceptor to include the token in the request headers
api.interceptors.request.use((config) => {
	const token = Cookies.get("jwt");
	if (token) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}
	return config;
});

export default api;
