import { Alert } from 'quasar';

class AlertService {
  constructor() {
    this.infoAlert = null;
    this.errorAlert = null;
  }

  error(error) {
    this.clear();

    let message = 'Unknown error';

    if (error && typeof error === 'string') {
      message = error;
    } else if (error && error.response && error.response.data && error.response.data.error_message) {
      message = error.response.data.error_message;
    } else if (error && error.response && error.response.data && typeof error.response.data === 'string') {
      message = error.response.data;
    } else if (error && error.message) {
      message = error.message;
    }

    if(message === 'Forbidden') {
      message = 'You need to login to access the requested screen.';
    }

    this.errorAlert = Alert.create({
      html: message,
      position: 'top-center',
      icon: 'error',
      color: 'negative'
    });
  } // error

  info(message) {
    this.clear();

    this.infoAlert = Alert.create({
      html: message,
      position: 'top-center',
      icon: 'info',
      color: 'positive'
    });
  } // info

  clear() {
    if (this.errorAlert) {
      this.errorAlert.dismiss();
    }

    if (this.infoAlert) {
      this.infoAlert.dismiss();
    }
  } // clear
}

export let alertService = new AlertService();
