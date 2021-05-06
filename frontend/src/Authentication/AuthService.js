import axios from "axios";
import config from "../config";
import jwt_decode from 'jwt-decode';

class AuthService {
    login(email, password, setAuthentication) {
        return axios
            .post(config.apiUrl + "/users/login", {
                email,
                password
            })
            .then(
                (response) => {
                    if (response.data.token) {
                        console.log(response.data);
                        setAuthentication(response.data);
                    }
                    return response.data;
                })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    logout(setAuthentication) {
        setAuthentication(null);
    }

    getUserData() {
        let data = localStorage.getItem('user');
        return JSON.parse(data);
    }

    canAccess(allowedRoles) {
        console.log(allowedRoles);
        let userData = this.getUserData();
        if (!userData)
            return false;
        console.log(jwt_decode(userData.token));
        let token = jwt_decode(userData.token);
        if (token === undefined || !token.roles)
            return false;
        return allowedRoles.some(role => token.roles.includes(role));
    }
}

export default new AuthService();