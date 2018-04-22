<template>
  <div>
    <q-card>
      <div class="row" style="margin: 10px">
        <div class="col-12 col-md-3">
          <q-field icon="credit card" helper="Account No">
            <q-input v-model="form.beneficiaryAccountNo"></q-input>
          </q-field>
        </div>
        <div class="col-12 col-md-1">
        </div>
        <div class="col-12 col-md-3">
          <q-field icon="credit card" helper="Confirm Account No">
            <q-input v-model="form.confirmBeneficiaryAccountNo"></q-input>
          </q-field>
        </div>
        <div class="col-12 col-md-1">
        </div>
        <div class="col-12 col-md-3">
          <q-field icon="account_circle" helper="Nick Name">
            <q-input v-model="form.nickName"></q-input>
          </q-field>
        </div>
        <div class="col-12 col-md-1">
        </div>
      </div>
      <q-card-separator/>
      <q-card-actions>
        <q-btn class="on-right" rounded color="primary" @click="addBeneficiaryAccounts">
          Add Beneficiary
        </q-btn>
      </q-card-actions>
    </q-card>

    <q-data-table :data="beneficiaries" :config="config" :columns="columns">
    </q-data-table>
  </div>
</template>

<script>
  import {alertService} from '@services/AlertService';
  import {accountService} from '@services/AccountService'

  export default {
    data() {
      return {
        form: {
          beneficiaryAccountNo: null,
          confirmBeneficiaryAccountNo: null,
          nickName: null,
        },
        beneficiaries: [],
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
            label: 'Account No',
            field: 'beneficiaryAccountNo',
            filter: true,
            sort: true,
            type: 'long'
          },
          {
            label: 'Nick Name',
            field: 'nickName',
            filter: true,
            sort: true,
            type: 'string'
          }
        ]
      }
    },
    mounted() {
      const that = this;
      that.getBeneficiaryAccounts();
    },

    methods: {
      addBeneficiaryAccounts() {
        const that = this;
        accountService.addBeneficiary(that.form, function (data) {
          alertService.info('Beneficiary account added successfully');
          that.getBeneficiaryAccounts();
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
          that.beneficiaries = data;
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


