<template>
  <div>
    <q-card>
      <div class="row" style="margin: 10px">
        <div class="col-12 col-md-5">
          <q-field icon="account_balance" helper="From">
            <q-select v-model="form.fromAccount" :options="fromSelect">
            </q-select>
          </q-field>
        </div>

        <div class="col-12 col-md-2">
        </div>

        <div class="col-12 col-md-5">
          <q-field icon="account_balance" helper="To">
            <q-select v-model="form.toAccount" :options="toSelect">
            </q-select>
          </q-field>
        </div>
      </div>
      <div class="row" style="margin: 10px">
        <div class="col-12 col-md-5">
          <q-field icon="attach money" helper="Amount">
            <q-input v-model="form.amount"></q-input>
          </q-field>
        </div>
        <div class="col-12 col-md-2">
        </div>
        <div class="col-12 col-md-5">
          <q-field icon="message" helper="Message">
            <q-input v-model="form.message"></q-input>
          </q-field>
        </div>
      </div>
      <q-card-separator/>
      <q-card-actions>
        <q-btn class="on-right" rounded color="primary" @click="transferMoney">
          Submit
        </q-btn>
      </q-card-actions>
    </q-card>
    <q-tabs inverted v-model="selectedTab">

      <q-tab slot="title" name="CHECKING" label="CHECKING" icon="login" @click="tabSelected('CHECKING')"></q-tab>
      <q-tab slot="title" name="SAVINGS" label="SAVINGS" icon="signup" @click="tabSelected('SAVINGS')"></q-tab>
      <q-tab-pane name="CHECKING">
        <q-data-table :data="transactions" :config="config" :columns="columns">
        </q-data-table>
      </q-tab-pane>
      <q-tab-pane name="SAVINGS">
        <q-data-table :data="transactions" :config="config" :columns="columns">
        </q-data-table>
      </q-tab-pane>
    </q-tabs>
  </div>

</template>

<script>
  import {alertService} from '@services/AlertService';
  import {accountService} from '@services/AccountService'

  export default {
    data() {
      return {
        selectedTab: null,
        transactions: [],
        checckingAccountNo: null,
        savingAccountNo: null,
        form: {
          fromAccount: null,
          toAccount: null,
          amount: null,
          message: null
        },
        fromSelect: [],
        toSelect: [],
        config: {
          rowHeight: '50px',
          selection: 'single',
          pagination: {
            rowsPerPage: 10,
            options: [5, 10, 15, 30, 50, 500]
          }
        },
        columns: [
          {
            label: 'Transaction Id',
            field: 'transactionId',
            filter: true,
            sort: true,
            type: 'long'
          },
          {
            label: 'Account',
            field: 'fromAccount',
            filter: true,
            sort: true,
            type: 'long'
          },
          {
            label: 'Type',
            field: 'transactionType',
            filter: true,
            sort: true,
            type: 'string'
          },
          {
            label: 'Amount',
            field: 'amount',
            filter: true,
            sort: true,
            type: 'double'
          },
          {
            label: 'Message',
            field: 'message',
            filter: true,
            sort: true,
            type: 'string'
          },
          {
            label: 'Date',
            field: 'createdDate',
            filter: true,
            sort: true,
            type: 'Date'
          }
        ]
      }
    },
    mounted() {
      const that = this;
      that.getAccounts();
      that.getBeneficiaryAccounts();
    },

    methods: {
      tabSelected(tabName) {
        alertService.clear();
        this.selectedTab = tabName;
        this.getTransactions();
      }, // tabSelected
      transferMoney() {
        const that = this;
        accountService.transaction(that.form, function (data) {
          alertService.info('Transaction successful');
          that.getAccounts();
          that.getBeneficiaryAccounts();
          that.getTransactions();
        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
          } else {
            alertService.error(error);
          }
        });
      },
      getTransactions() {
        const that = this;
        let accountNo = null;
        if (that.selectedTab === 'CHECKING') {
          accountNo = that.checckingAccountNo;
        } else {
          accountNo = that.savingAccountNo;
        }
        accountService.getTransactions(accountNo, function (data) {
          that.transactions = data;
        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
          } else {
            alertService.error(error);
          }
        });
      },
      getAccounts() {
        const that = this;
        accountService.getUserAccounts(function (data) {
          data.forEach(function (account) {
            if (account.type === 'CHECKING') {
              that.checckingAccountNo = account.accountNo;
            } else {
              that.savingAccountNo = account.accountNo;
            }
            that.fromSelect.push(
              {
                label: account.type + ' ' + account.balance,
                value: account.accountNo,
              });
          });
        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
          } else {
            alertService.error(error);
          }
        });
      },
      getBeneficiaryAccounts() {
        const that = this;
        accountService.getBeneficiaryAccounts(function (data) {
          data.forEach(function (account) {
            that.toSelect.push(
              {
                label: account.nickName,
                value: account.beneficiaryAccountNo,
              });
          });
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

<style>

</style>


