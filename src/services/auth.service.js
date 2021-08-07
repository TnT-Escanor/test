import axios from "axios";

const API_URL = "https://enigmatic-everglades-66523.herokuapp.com/api/auth/";


class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  isAdmin() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.roles.name === "admin") {
      return true;
    }
    else return false;
  }

}

export default new AuthService();