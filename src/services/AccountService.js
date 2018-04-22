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
  } // getAccountSummary

  transaction(form, successCallback, errorCallback) {
    form.createdBy = storageService.get('user');
    const config = {
      method: 'post',
      url: 'http://localhost:8888/transaction/',
      headers: {
        Authorization: storageService.get('token')
      }
    };

    config.data = form;

    axios.request(config).then(function (response) {
      return successCallback(response.data);
    }).catch(function (error) {
      return errorCallback(error);
    });
  } // transaction

  getTransactions(accountNo, successCallback, errorCallback) {
    const config = {
      method: 'get',
      url: 'http://localhost:8888/transaction/' + accountNo,
      headers: {
        Authorization: storageService.get('token')
      }
    };

    axios.request(config).then(function (response) {
      return successCallback(response.data);
    }).catch(function (error) {
      return errorCallback(error);
    });
  } // getTransactions

  getUserAccounts(successCallback, errorCallback) {
    const config = {
      method: 'get',
      url: 'http://localhost:8888/accounts/',
      headers: {
        Authorization: storageService.get('token')
      }
    };
    axios.request(config).then(function (response) {
      return successCallback(response.data);
    }).catch(function (error) {
      return errorCallback(error);
    });
  } // getUserAccounts

  getBeneficiaryAccounts(successCallback, errorCallback) {
    const config = {
      method: 'get',
      url: 'http://localhost:8888/accounts/beneficiary',
      headers: {
        Authorization: storageService.get('token')
      }
    };
    axios.request(config).then(function (response) {
      return successCallback(response.data);
    }).catch(function (error) {
      return errorCallback(error);
    });
  } // getBeneficiaryAccounts

  addBeneficiary(beneficiaryform, successCallback, errorCallback) {
    const config = {
      method: 'post',
      url: 'http://localhost:8888/accounts/beneficiary',
      headers: {
        Authorization: storageService.get('token')
      }
    };
    config.data = beneficiaryform;
    axios.request(config).then(function (response) {
      return successCallback(response.data);
    }).catch(function (error) {
      return errorCallback(error);
    });
  } // addBeneficiary

}

export let accountService = new AccountService();
