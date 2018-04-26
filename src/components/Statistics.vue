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
        <doughnut-chart :chart-data="chartData" :options="chartOptions" v-if="notEmpty"></doughnut-chart>
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
        <doughnut-chart :chart-data="chartData" :options="chartOptions" v-if="notEmpty"></doughnut-chart>
      </q-card-main>
    </q-card>

  </div>
</template>

<script>
  import {alertService} from '@services/AlertService';
  import {restService} from '@services/RestService';

  export default {
    data() {
      return {
        criticalCount: 0,
        majorCount: 0,
        minorCount: 0,
        clearCount: 0,
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
      chartData() {
        return {
          labels: ['CRITICAL', 'MAJOR', 'MINOR', 'CLEAR'],
          datasets: [{
            data: [this.criticalCount, this.majorCount, this.minorCount, this.clearCount],
            backgroundColor: ['red', 'orange', 'yellow', 'lightgreen']
          }]
        };
      },

      notEmpty() {
        if (this.criticalCount > 0 || this.majorCount > 0 || this.minorCount > 0) {
          return true;
        }

        return false;
      }
    }, // computed

    watch: {
      refreshComponent() {
        this.refresh();
      }
    }, // watch

    mounted() {
      this.refresh();
    }, // mounted

    methods: {
      refresh() {
        const that = this;

        that.criticalCount = 0;
        that.majorCount = 4;
        that.minorCount = 3;
        that.clearCount = 1;

      }
    }
  }
</script>

<style>

</style>
