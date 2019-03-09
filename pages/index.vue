<template lang="pug">
  v-layout(
    column
    justify-center
    align-center
  )
    v-flex(xs12)
      firebase-connect(@emotionUpdated="emotionUpdated")
      scatter(:data="scatterData" :options="options" style="position: relative;width: 1200px;")
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import FirebaseConnect from '~/components/FirebaseConnect.vue'
import Scatter from '~/components/Scatter'
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

const colors = [
  "#69D2E7","#A7DBD8","#E0E4CC","#F38630","#FA6900",
  "#FE4365","#FC9D9A","#F9CDAD","#C8C8A9","#83AF9B"
];

export default {
  components: {
    FirebaseConnect,
    Scatter
  },
  methods: {
    emotionUpdated(users) {
      const datasets = this.toDatasets(users) 
      console.info('datasets', datasets);
      this.scatterData = { datasets: this.toDatasets(users) }
    },
    toDatasets(users) {
      let userIndex = 0;
      return Object.keys(users).map((uid) => {
        const user = users[uid]
        const emotions = users[uid].emotions

        return {
            label: `${user.fullname}`,
            borderColor: colors[userIndex++],
            fill: false,
            showLine: false,
            data: this.toData(emotions)
        }
      });
    },
    toData(emotions) {
      const sortedEmotions = Object.values(emotions).sort((a, b) => { return a.timestamp - b.timestamp; });
      return sortedEmotions.map((emotion) => {
        return {
          x: emotion.timestamp,
          y: this.convertEmotionToY(emotion)
        }
      });
    },
    convertEmotionToY(emotion) {
      switch(emotion.emotion) {
        case 1: // agree
          return 4 + emotion.strength;
        case 2: // disagree
          return 4 - emotion.strength;
        case 3: // confused
          return 4;
        default: // absent
          return 0;
      }
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        width: 1200
      },
      scatterData: {},
    }
  }
}
</script>