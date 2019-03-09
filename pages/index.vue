<template lang="pug">
  v-layout(
    column
    justify-center
    align-center
  )
    v-flex(xs12)
      //-firebase-connect
      bar-chart(:data="barChartData" :options="{ maintainAspectRatio: false }")
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import FirebaseConnect from '~/components/FirebaseConnect.vue'
import BarChart from '~/components/BarChart'

export default {
  components: {
    FirebaseConnect,
    BarChart
  },
  data() {
    return {
      barChartData: {
        labels: [1,2,3],
        datasets: [
          {
            label: 'Nuxt.js Commit Activity',
            backgroundColor: '#41b883',
            data: [1,2,3]
          }
        ]
      }
    }
  }
}
</script>
