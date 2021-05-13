import axios from 'axios';
import { AuthService } from '../Services';

axios.interceptors.response.use((response) => {
    let replaceNulls = ((tempObj) => {
        for (let field in tempObj) {
            let value = tempObj[field];
            if (value === null) {
                tempObj[field] = '';
                continue;
            }
            if (typeof value === 'object' && value !== null) {
                tempObj[field] = replaceNulls(tempObj[field]);
                continue;
            }
        }
        return tempObj;
    });
    response.data = replaceNulls(response.data); 
    return response;
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