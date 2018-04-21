<template>
  <div>
    <q-card>
      <q-card-title>
        Transfer Money
      </q-card-title>
      <div class="row" style="margin: 25px">
        <div class="col-12 col-md-3">
          <q-field icon="account_balance" helper="From">
            <q-select v-model="from" :options="fromSelect">
            </q-select>
          </q-field>
        </div>

        <div class="col-12 col-md">
        </div>

        <div class="col-12 col-md-3">
          <q-field icon="account_balance" helper="To">
            <q-select v-model="to" :options="selectOptions">
            </q-select>
          </q-field>
        </div>

        <div class="col-12 col-md">
        </div>
        <div class="col-12 col-md-3">
          <q-field icon="attach money" helper="Amount">
            <q-input v-model="amount"></q-input>
          </q-field>
        </div>
      </div>
      <q-card-separator/>
      <q-card-actions>
        <q-btn class="on-right" rounded color="primary" @click="">
          Submit
        </q-btn>
      </q-card-actions>
    </q-card>

  </div>

</template>

<script>
  export default {
    data() {
      return {
        from: null,
        to: null,
        amount: null,
        fromSelect: [],
        toSelect: [],
        selectOptions: [
          {
            label: 'Saving',
            value: 'goog'
          },
          {
            label: 'Checking',
            value: 'fb'
          },
          {
            label: 'Add a beneficiary',
            value: 'fb'
          }
        ]
      }
    }
  }
</script>

<style>

</style>


