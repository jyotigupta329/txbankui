<template>
  <div>
    <div style="width: 500px; padding: 25px">
      <span>
        From
      </span>
    </div>
    <div style="width: 500px; padding: 25px">
      <q-select
        v-model="from"
        :options="selectOptions"
      />
    </div>
    <div></div>
    <div style="width: 500px; padding: 25px">
      <span>
        To
      </span>
    </div>
    <div style="width: 500px; padding: 25px">
      <q-select
        v-model="to"
        :options="selectOptions"
      />
    </div>
    <div style="width: 500px; padding: 25px">
      <span>
        Amount
      </span>
      <q-input v-model="amount"/>
    </div>
    <div class="row" style="margin: 0px 0px 0px 10px;">
      <div class="col-12 col-md-4"/>
      <div class="col-10 col-md-4">
        <q-btn rounded color="primary" @click="">
          Submit
        </q-btn>
      </div>
      <div class="col-12 col-md-4"/>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        from: null,
        to: null,
        amount: null,
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


