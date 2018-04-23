'use strict'

import axios from 'axios';
import {Loading} from 'quasar';
import {restService} from '@services/RestService';
import {storageService} from '@services/StorageService';

class ManageAlertsService {

  constructor() {
  }

  getNotificationPolicy(successCallback, errorCallback) {
    const config = {
      method: 'get',
      url: 'http://localhost:8888/notification',
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

  updateNotificationPolicy(notificationForm, successCallback, errorCallback) {
    notificationForm.username = storageService.get('user');
    const config = {
      method: 'put',
      url: 'http://localhost:8888/notification' ,
      headers: {
        Authorization: storageService.get('token')
      }
    };

    if (notificationForm) {
      config.data = notificationForm;
    }

    axios.request(config).then(function (response) {
      return successCallback();
    }).catch(function (error) {
      return errorCallback(error);
    });
  } // update

}

export let manageAlertsService = new ManageAlertsService();
