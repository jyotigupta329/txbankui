'use strict';

import { SessionStorage } from 'quasar';

class StorageService {
  constructor() {

  }

  set(key, value) {
    SessionStorage.set(key, value);
  }

  get(key) {
    return SessionStorage.get.item(key);
  }

  has(key) {
    return SessionStorage.has(key);
  }

  remove(key) {
    SessionStorage.remove(key);
  }

  clearAll() {
    SessionStorage.clear();
  }
}

export let storageService = new StorageService();
