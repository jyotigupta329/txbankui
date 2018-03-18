'use strict'

import axios from 'axios'
import {Loading} from 'quasar'

class AuthService {

  constructor() {

  }

  isAuthenticated(store) {
    console.log(store.state);
    let loginValue = store.state;
    if (loginValue === true) {
      return true;
    } else {
      return false;
    }
  }

  login(username, password, store) {
    const that = this;
    axios.post('http://localhost:8888/authenticate', {
      username: username,
      password: password
    })
      .then(function (response) {
        console.log(response);
        console.log(that.$router);
        let isAuthenticated = response.data;
        // store.commit('isAuthenticated', isAuthenticated);
        if (isAuthenticated) {
          that.$router.push({name: 'register'})
        }

      })
      .catch(function (error) {
        console.log(error);
      })
  }
}

export let authService = new AuthService();
