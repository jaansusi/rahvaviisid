import axios from "axios";
import config from "../config";

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
}

export default new AuthService();