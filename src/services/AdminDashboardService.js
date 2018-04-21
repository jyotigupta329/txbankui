'use strict'

import axios from 'axios';
import {Loading} from 'quasar';
import {restService} from '@services/RestService';
import {storageService} from '@services/StorageService';

class AdminDashboardService {

  constructor() {
  }

  getUsersProfile(successCallback, errorCallback) {
    const config = {
      method: 'get',
      url: 'http://localhost:8888/users/',
      headers: {
        Authorization: storageService.get('token')
      }
    };

    axios.request(config).then(function (response) {
      return successCallback(response.data);
    }).catch(function (error) {
      return errorCallback(error);
    });
  } // adminDashboard

}

export let adminDashboardService = new AdminDashboardService();
