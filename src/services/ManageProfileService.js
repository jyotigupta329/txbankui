'use strict'

import axios from 'axios';
import {Loading} from 'quasar';
import {restService} from '@services/RestService';
import {storageService} from '@services/StorageService';

class ManageProfileService {

  constructor() {
  }

  getUserProfile(successCallback, errorCallback) {
    const config = {
      method: 'get',
      url: 'http://localhost:8888/users/profile/' + storageService.get('user'),
      headers: {
        Authorization: storageService.get('token')
      }
    };

    axios.request(config).then(function (response) {
      return successCallback(response.data);
    }).catch(function (error) {
      return errorCallback(error);
    });
  } // login

  update(profileForm, successCallback, errorCallback) {
    const config = {
      method: 'put',
      url: 'http://localhost:8888/users/profile/' + storageService.get('user'),
      headers: {
        Authorization: storageService.get('token')
      }
    };

    if (profileForm) {
      config.data = profileForm;
    }

    axios.request(config).then(function (response) {
      console.log(response);
      return successCallback();
    }).catch(function (error) {
      return errorCallback(error);
    });
  } // update

  updatePassword(profileForm, successCallback, errorCallback) {
    const config = {
      method: 'put',
      url: 'http://localhost:8888/users/changePassword/' + storageService.get('user'),
      headers: {
        Authorization: storageService.get('token')
      }
    };

    if (profileForm) {
      config.data = profileForm;
    }

    axios.request(config).then(function (response) {
      console.log(response);
      return successCallback();
    }).catch(function (error) {
      return errorCallback(error);
    });
  } // update password
}

export let manageProfileService = new ManageProfileService();
