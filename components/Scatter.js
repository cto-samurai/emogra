import { Scatter } from 'vue-chartjs'

export default {
  extends: Scatter,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  },
  watch: {
    data(nv) {
      this.renderChart(nv, this.options)
    }
  }
}