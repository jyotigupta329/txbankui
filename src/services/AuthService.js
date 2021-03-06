'use strict'

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Loading } from 'quasar';
import {restService} from '@services/RestService';
import {storageService} from '@services/StorageService';

class AuthService {

  constructor () {
  }

  login(username, password, store, successCallback, errorCallback) {
    const data = {
      username: username,
      password: password
    };

    const config = {
      method: 'post',
      url: 'http://localhost:8888/login'
    };

    if (data) {
      config.data = data;
    }

    axios.request(config).then(function (response) {
      storageService.set('token', response.headers.authorization);
      let claimSet = jwtDecode(response.headers.authorization);
      let user = claimSet.sub;
      let role = claimSet.role;
      storageService.set('user', user);
      storageService.set('role', role);
      store.commit('setToken', response.headers.authorization);
      store.commit('setUser', user);
      store.commit('setRole', role);
      return successCallback();
    }).catch(function (error) {
      return errorCallback(error);
    });
  } // login

  register(registerForm, successCallback, errorCallback) {
    const data = {
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      username: registerForm.username,
      password: registerForm.password,
      dob: registerForm.dob,
      address1: registerForm.address1,
      address2: registerForm.address2,
      city: registerForm.city,
      state: registerForm.state,
      zip: registerForm.zip,
      country: registerForm.country,
      nationality: registerForm.nationality,
      gender: registerForm.gender,
      phone: registerForm.phone,
      email: registerForm.email,
      idtype1: registerForm.idtype1,
      idtype2: registerForm.idtype2,
      idno1: registerForm.idno1,
      idno2: registerForm.idno2,
    };

    const config = {
      method: 'post',
      url: 'http://localhost:8888/users/sign-up'
    };

    if (data) {
      config.data = data;
    }

    axios.request(config).then(function (response) {
      console.log(response);
      return successCallback();
    }).catch(function (error) {
      return errorCallback(error);
    });
  } // register

  logout(store, successCb) {
    storageService.clearAll();
    store.commit('setToken', null);
    store.commit('setUser', null);
    return successCb();
  } // logout

  isAuthenticated(store) {
    const ssToken = storageService.get('token');
    const ssUser = storageService.get('user');

    const sToken = store.state.token;
    const sUser = store.state.user;

    if (ssToken && !sToken) {
      store.commit('setToken', ssToken);
      store.commit('setUser', ssUser);
    }

    if (ssToken) {
      return true;
    } else {
      return false;
    }
  } // isAuthenticated
}

export let authService = new AuthService();
