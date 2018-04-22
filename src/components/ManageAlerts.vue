<!--<template>-->
  <!--<p class="caption">As Option Group in a Field</p>-->
  <!--<q-field-->
    <!--icon="vibration"-->
    <!--helper="Select which notifications you want to receive"-->
    <!--label="Notifications"-->
  <!--&gt;-->
    <!--<q-option-group-->
      <!--&gt;-->
    <!--<p> label: 'Email', value: form.email}/p>-->
    <!--<p> label: 'Phone', value: {form.phone }</p>-->
    <!---->
  <!--</q-field>-->
<!--</template>-->
<!--<script>-->
  <!--import {alertService} from '@services/AlertService';-->
  <!--import {manageAlertsService} from '@services/ManageAlertsService';-->
  <!--export default {-->
    <!--data(){-->
      <!--return {-->
        <!--form: {-->
          <!--email: null,-->
          <!--phone: null-->
        <!--}-->
      <!--}-->
    <!--},-->

    <!--mounted () {-->
      <!--this.manageAlert();-->
    <!--},-->

    <!--methods: {-->
      <!--manageAlert () {-->
        <!--const that = this;-->
        <!--manageAlertsService.getUserAlertDetails(function (data) {-->
          <!--that.form.email = data.email;-->
          <!--that.form.phone = data.phone;-->
        <!--}, function (error) {-->
          <!--if (error.response && error.response.data && error.response.data.message) {-->
            <!--const errorMsg = error.response.data.message;-->
            <!--alertService.error(errorMsg);-->
          <!--} else {-->
            <!--alertService.error(error);-->
          <!--}-->
        <!--});-->
      <!--}-->
    <!--} // methods-->
  <!--}-->
<!--</script>-->

