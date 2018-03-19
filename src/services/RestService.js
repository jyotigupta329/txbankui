import axios from 'axios';
import { Loading } from 'quasar';

import { alertService } from '@services/AlertService';
import { storageService } from '@services/StorageService';

class RestService {
  constructor() {
    this.serverApiUrl = '/api';
    //console.log('Server API path ' + this.serverApiUrl);
  }

  _resource(method, url, data, successCallback, errorCallback, showProgressBar) {
    if (showProgressBar) {
      Loading.show({
        message: 'Loading, please wait ...'
      });
    }

    const config = {
      method: method,
      url: url
    };

    if (data) {
      config.data = data;
    }

    const token = storageService.get('token');
    if (token) {
      config.headers = {
        'x-access-token': token
      }
    }

    //console.log('Config: ' + JSON.stringify(config));

    axios.request(config).then(function (response) {
      if (showProgressBar) {
        Loading.hide();
      }

      return successCallback(response.data);
    }).catch(function (error) {
      if (showProgressBar) {
        Loading.hide();
      }

      return errorCallback(error);
    });
  } // _resource

  get(path, successCallback, errorCallback) {
    return this._resource(
      'get',
      this.serverApiUrl + path,
      null,
      successCallback,
      errorCallback,
      true);
  } // get

  getWithoutProgressBar(path, successCallback, errorCallback) {
    return this._resource(
      'get',
      this.serverApiUrl + path,
      null,
      successCallback,
      errorCallback,
      false);
  } // getWithoutProgressBar

  post(path, data, successCallback, errorCallback) {
    alertService.clear();

    return this._resource(
      'post',
      this.serverApiUrl + path,
      data,
      successCallback,
      errorCallback,
      true);
  } // post

  put(path, data, successCallback, errorCallback) {
    alertService.clear();

    return this._resource(
      'put',
      this.serverApiUrl + path,
      data,
      successCallback,
      errorCallback,
      true);
  } // put

  delete(path, successCallback, errorCallback) {
    alertService.clear();

    return this._resource(
      'delete',
      this.serverApiUrl + path,
      null,
      successCallback,
      errorCallback,
      true);
  } // delete

  deleteWithData(path, data, successCallback, errorCallback) {
    alertService.clear();

    return this._resource(
      'delete',
      this.serverApiUrl + path,
      data,
      successCallback,
      errorCallback,
      true);
  } // deleteWithData
}

export let restService = new RestService();
