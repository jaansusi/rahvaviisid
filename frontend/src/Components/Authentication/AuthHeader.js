export default function authHeader() {
    let user;
    try {
      user = JSON.parse(localStorage.getItem('user'));
    } catch {
      return {};
    }

    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }
  