<template lang="pug">
  v-layout(
    column
    justify-center
    align-center
  )
    v-flex(xs12)
      //-firebase-connect
      line-chart(:data="lineChartData" :options="options" style="position: relative;")
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import FirebaseConnect from '~/components/FirebaseConnect.vue'
import LineChart from '~/components/LineChart'
import moment from 'moment'

function newDate(days) {
	return moment().add(days, 'd').toDate();
}

function newDateString(days) {
  return moment().add(days, 'd').format();
}

function randomScalingFactor() {
  return Math.random() * 10;
}

export default {
  components: {
    FirebaseConnect,
    LineChart
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        /*
        layout: {
          padding: {
            left: 50,
            right: 0,
            top: 0,
            bottom: 0
          }
        }	
        */
      },
      lineChartData: {
          datasets: [{
            label: 'Dataset with string point data',
            borderColor: 'red',
            fill: false,
            data: [{
              x: newDateString(0),
              y: randomScalingFactor()
            }, {
              x: newDateString(2),
              y: randomScalingFactor()
            }, {
              x: newDateString(4),
              y: randomScalingFactor()
            }, {
              x: newDateString(5),
              y: randomScalingFactor()
            }],
          }, {
            label: 'Dataset with date object point data',
            borderColor: 'blue',
            fill: false,
            data: [{
              x: newDate(0),
              y: randomScalingFactor()
            }, {
              x: newDate(2),
              y: randomScalingFactor()
            }, {
              x: newDate(4),
              y: randomScalingFactor()
            }, {
              x: newDate(5),
              y: randomScalingFactor()
            }]
          }
        ]
      } 
    }
  }
}
</script>
