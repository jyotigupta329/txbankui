'use strict'

import axios from 'axios';
import {Loading} from 'quasar';
import {restService} from '@services/RestService';
import {storageService} from '@services/StorageService';

class AccountService {

  constructor() {
  }

  getAccountSummary(successCallback, errorCallback) {
    const config = {
      method: 'get',
      url: 'http://localhost:8888/accountSummary/' + storageService.get('user'),
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

}

export let accountService = new AccountService();
