import axios from 'axios';
import { AuthService } from '../Services';

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('user');
            if (window.location.pathname !== "/login") {
                window.location.replace("/login");
            }
        }
        throw error;
    });

axios.interceptors.request.use((config) => {
    let userData = AuthService.GetUserData();
    if (userData !== null) {
        config.headers.Authorization = "Bearer " + userData.token;
    }
    for (let field in config.data) {
        if (Array.isArray(config.data[field])) {
            if (config.data[field].length === 0)
                delete config.data[field];
            continue;
        }
    }
    return config;
})