<template>
  <div>
    <q-card inline style="width: 400px">
      <q-card-title>
        <q-icon name="business" color="primary" size="24px"/>
        <span style="margin: 0px 0px 0px 10px;">Checking spent analyser</span>
        <q-tooltip>
          Show the checking account spent analysis for past 10 transactions
        </q-tooltip>
      </q-card-title>
      <q-card-separator/>
      <q-card-main>
        <doughnut-chart :chart-data="checkingChartData" :options="chartOptions" v-if="notEmptyCA"></doughnut-chart>
      </q-card-main>
    </q-card>

    <q-card inline style="width: 400px">
      <q-card-title>
        <q-icon name="business" color="primary" size="24px"/>
        <span style="margin: 0px 0px 0px 10px;">Savings spent analyser</span>
        <q-tooltip>
          Show the savings account spent analysis for past 10 transactions
        </q-tooltip>
      </q-card-title>
      <q-card-separator/>
      <q-card-main>
        <doughnut-chart :chart-data="savingsChartData" :options="chartOptions" v-if="notEmptySA"></doughnut-chart>
      </q-card-main>
    </q-card>

  </div>
</template>

<script>
  import {alertService} from '@services/AlertService';
  import {accountService} from '@services/AccountService'

  export default {
    data() {
      return {
        checkingAccountNo: null,
        savingAccountNo: null,
        checkingAccountChart: {
          totalCredit: 0,
          totalDebit: 0
        },
        savingsAccountChart: {
          totalCredit: 0,
          totalDebit: 0
        },
        chartOptions: {
          legend: false,
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: false
          }
        }
      }
    }, // data

    computed: {
      checkingChartData() {
        return {
          labels: ['CREDIT', 'DEBIT'],
          datasets: [{
            data: [this.checkingAccountChart.totalCredit, this.checkingAccountChart.totalDebit],
            backgroundColor: ['green', 'orange']
          }]
        };
      },
      savingsChartData() {
        return {
          labels: ['CREDIT', 'DEBIT'],
          datasets: [{
            data: [this.savingsAccountChart.totalCredit, this.savingsAccountChart.totalDebit],
            backgroundColor: ['green', 'orange']
          }]
        };
      },
      notEmptyCA() {
        if (this.checkingAccountChart.totalCredit > 0 || this.checkingAccountChart.totalDebit > 0) {
          return true;
        }

        return false;
      },
      notEmptySA() {
        if (this.savingsAccountChart.totalCredit > 0 || this.savingsAccountChart.totalDebit > 0) {
          return true;
        }

        return false;
      }
    }, // computed

    mounted() {
      this.getAccounts();
    }, // mounted

    methods: {
      getCheckingTransactions() {
        const that = this;
        accountService.getTransactions(that.checkingAccountNo, function (data) {
          data.forEach(function (account) {
            if (account.transactionType === 'CREDIT') {
              that.checkingAccountChart.totalCredit += account.amount;
            } else {
              that.checkingAccountChart.totalDebit += account.amount;
            }
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
      getSavingsTransactions() {
        const that = this;
        that.savingsAccountChart.totalCredit = 0;
        accountService.getTransactions(that.savingAccountNo, function (data) {
          data.forEach(function (account) {
            if (account.transactionType === 'CREDIT') {
              that.savingsAccountChart.totalCredit += account.amount;
            } else {
              that.savingsAccountChart.totalDebit += account.amount;
            }
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
      getAccounts() {
        const that = this;
        accountService.getUserAccounts(function (data) {
          data.forEach(function (account) {
            if (account.type === 'CHECKING') {
              that.checkingAccountNo = account.accountNo;
            } else {
              that.savingAccountNo = account.accountNo;
            }
          });
          that.getCheckingTransactions();
          that.getSavingsTransactions();
        }, function (error) {
          if (error.response && error.response.data && error.response.data.message) {
            const errorMsg = error.response.data.message;
            alertService.error(errorMsg);
          } else {
            alertService.error(error);
          }
        });
      },
    }
  }
</script>

<style>

</style>
