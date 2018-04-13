<template>
  <div>
    <q-card v-for="(account, index) in accounts" :key="account.accountNo">
      <q-card-title>
        {{accountName}}
        <div slot="right" class="row items-center">
          {{account.type}}
        </div>
      </q-card-title>
      <q-card-main>
        <p>Account Number {{account.accountNo}}</p>
        <p>Balance {{currency}}  {{account.balance}} </p>
      </q-card-main>
      <q-card-separator/>
    </q-card>
  </div>
</template>
<script>
  import {alertService} from '@services/AlertService';
  import {accountService} from '@services/AccountService';
  export default {
    data(){
      return {
        accountName: null,
        currency: '$',
        accounts: []
      }
    },

    mounted () {
      this.accountSummary();
    },

    methods: {
      accountSummary () {
        const that = this;
        accountService.getAccountSummary(function (data) {
          that.accountName = data.accountName;
          that.currency = data.currency;
          that.accounts = data.accounts;
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

