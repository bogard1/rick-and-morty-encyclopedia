// import config from 'config';
import { postRequest } from '../_helpers';

const login = (username, password) => {
  return postRequest('/users/login', { username, password })
    .then(user => {
      if (user && !user.error) {
        localStorage.setItem('isLogged', 'true');
      } else {
        return Promise.reject(user.error);
      }
  });
}

export const userService = {
  login,
};
