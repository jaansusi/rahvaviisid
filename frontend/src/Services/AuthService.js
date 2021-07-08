import axios from "axios";
import config from "../config";
import jwt_decode from 'jwt-decode';

export const AuthService = {
    Login(email, password, setAuthentication) {
        return axios
            .post(config.apiUrl + "/users/login", {
                email,
                password
            })
            .then(
                (response) => {
                    if (response.data.token) {
                        // console.log(response.data);
                        setAuthentication(response.data);
                    }
                    return response.data;
                });
    },

    Logout(setAuthentication) {
        setAuthentication(null);
    },

    GetUserData() {
        let data = localStorage.getItem('user');
        return JSON.parse(data);
    },

    CanAccess(allowedRoles, authToken) {
        let userData = authToken !== undefined ? authToken : this.GetUserData();
        if (!userData)
            return false;
        let token = jwt_decode(userData.token);
        if (token === undefined || !token.roles)
            return false;
        return allowedRoles.some(role => token.roles.includes(role));
    },
}
