<template>
  <div>
    <div class="row" style="margin: 25px;">
      <q-toggle v-model="form.enable" label="Enable"/>
    </div>
    <div class="row" style="margin: 25px;">
      <q-field helper="Notify if amount is credited more than " icon="phone">
        <q-input v-model="form.creditAmount">
        </q-input>
      </q-field>
    </div>
    <div class="row" style="margin: 25px;">
      <q-field helper="Notify if amount is debited more than " icon="phone">
        <q-input v-model="form.debitAmount">
        </q-input>
      </q-field>
    </div>
    <div class="row" style="margin: 25px;">
      <q-toggle v-model="form.profileUpdate" label="Profile Update"/>
    </div>
    <div class="row" style="margin: 25px;">
      <q-toggle v-model="form.passwordUpdate" label="Password Update"/>
    </div>
    <div class="row" style="margin: 0px 0px 0px 10px;">
      <div class="col-12 col-md-4"/>
      <div class="col-10 col-md-4">
        <q-btn rounded color="primary" @click="updateNotification">
          Update Alerts
        </q-btn>
      </div>
      <div class="col-12 col-md-4"/>
    </div>
  </div>
</template>
<script>
  import {alertService} from '@services/AlertService';
  import {manageAlertsService} from '@services/ManageAlertsService';
  export default {
    data(){
      return {
        form: {
          enable: null,
          creditAmount: null,
          debitAmount: null,
          profileUpdate: null,
          passwordUpdate: null,
          username: null
        }
      }
    },

    mounted () {
      this.notificationPolicy();
    },

    methods: {
      notificationPolicy () {
        const that = this;
        manageAlertsService.getNotificationPolicy(function (data) {
          that.form = data;
        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
          } else {
            alertService.error(error);
          }
        });
      },
      updateNotification() {
        const that = this;
        alertService.clear();
        manageAlertsService.updateNotificationPolicy(that.form, function () {
          alertService.info('Your Notification Policy has been successfully updated');
          that.notificationPolicy();
        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
          } else {
            alertService.error(error);
          }
        });
      }
    } // methods
  }
</script>

