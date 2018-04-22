<template>
  <div>
    <q-card>
      <q-card-title>
        Transfer Money
      </q-card-title>
      <div class="row" style="margin: 25px">
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
      <div class="row" style="margin: 25px">
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
    <q-data-table :data="transactions" :config="config" :columns="columns">
    </q-data-table>


  </div>

</template>

<script>
  import {alertService} from '@services/AlertService';
  import {accountService} from '@services/AccountService'
  export default {
    data() {
      return {
        transactions: [],
        form: {
          fromAccount: null,
          toAccount: null,
          amount: null,
          message: null
        },
        fromSelect: [
          {
            label: 'Anshu Checking',
            value: 1
          },
          {
            label: 'Anshu Saving',
            value: 2
          }
        ],
        toSelect: [
          {
            label: 'Jyoti Checking',
            value: 3
          },
          {
            label: 'Jyoti Saving',
            value: 4
          }
        ],
        config: {
          rowHeight: '50px',
          selection: 'multiple',
          pagination: {
            rowsPerPage: 10,
            options: [5, 10, 15, 30, 50, 500]
          }
        },
        columns: [
          {
            label: 'Transaction Id',
            field: 'transactionId',
            width: '50px',
            filter: true,
            sort: true,
            type: 'long'
          },
          {
            label: 'From Account',
            field: 'fromAccount',
            width: '50px',
            filter: true,
            sort: true,
            type: 'long'
          },
          {
            label: 'To Account',
            field: 'toAccount',
            width: '50px',
            filter: true,
            sort: true,
            type: 'long'
          },
          {
            label: 'Amount',
            field: 'amount',
            width: '50px',
            filter: true,
            sort: true,
            type: 'double'
          },
          {
            label: 'Message',
            field: 'message',
            width: '50px',
            filter: true,
            sort: true,
            type: 'string'
          },
          {
            label: 'Date',
            field: 'createdDate',
            width: '100px',
            filter: true,
            sort: true,
            type: 'Date'
          }
        ]
      }
    },
    mounted(){
      const that = this;
      that.getTransactions();
    },

    methods: {
      transferMoney() {
        const that = this;
        accountService.transaction(that.form, function (data) {
          alertService.info('Transaction successful');
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
        accountService.getTransactions(function (data) {
          that.transactions = data;
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


