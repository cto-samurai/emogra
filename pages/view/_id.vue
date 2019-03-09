<template lang="pug">
  v-layout(
    column
    justify-center
    align-center
  )
    v-flex(xs12)
      firebase-connect(@emotionUpdated="emotionUpdated" :id='$route.params.id')
      scatter(:data="scatterData" :options="options" style="position: relative;width: 1200px;")
    v-flex(xs12)
      emo-input(:id='$route.params.id')
</template>

<script>
import Logo from '~/components/Logo.vue'
import EmoInput from '~/components/EmoInput.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import FirebaseConnect from '~/components/FirebaseConnect.vue'
import Scatter from '~/components/Scatter'
import moment from 'moment'
import colors from '~/common/colors'

function newDate(days) {
	return moment().add(days, 'd').toDate();
}

function newDateString(days) {
  return moment().add(days, 'd').format();
}

function randomScalingFactor() {
  return Math.random() * 10;
}

function average(values) {
  return values.reduce((acc, val) => { return acc + val }, 0) / values.length;
}

export default {
  components: {
    FirebaseConnect,
    Scatter,
    EmoInput
  },
  methods: {
    emotionUpdated(users) {
      if(!users) return
      const datasets = this.toDatasets(users)
      datasets.push(this.averageDataset(users))
      this.scatterData = { datasets }
    },
    toDatasets(users) {
      let userIndex = 0;
      return Object.keys(users).map((uid) => {
        const user = users[uid]
        const emotions = users[uid].emotions
        const color = colors[userIndex++]

        return {
            label: uid,
            borderColor: color + 11,
            backgroundColor: color + 11,
            borderWidth: 1,
            pointRadius: 2,
            fill: true,
            showLine: true,
            data: this.toData(emotions)
        }
      });
    },
    toData(emotions) {
      const sortedEmotions = Object.values(emotions).sort((a, b) => { return a.timestamp - b.timestamp; });
      return sortedEmotions.map((emotion) => {
        return {
          x: emotion.timestamp,
          y: this.convertEmotionToScore(emotion)
        }
      });
    },
    convertEmotionToScore(emotion) {
      if (!emotion) {
        return 0;
      }
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
    },
    averageDataset(users) {
      // O(n)
      Object.keys(users).forEach((k) => { users[k].uuid = k });
      // O(n1 * n2)
      const timestamps = Object.keys(users)
        .map((uid) => { 
          const user = users[uid]
          return Object.keys(user.emotions).map((key) => {
            const emotion = user.emotions[key]
            return [uid, key, emotion.timestamp] }) })
        .flat()
        .sort((a, b) => { return a[2] - b[2] });
      const latestScores = {};
      // O(n)
      const data = timestamps.map(((t) => {
        debugger
        latestScores[t[0]] = this.convertEmotionToScore(users[t[0]].emotions[t[1]]);
        return { x: t[2], y: average(Object.values(latestScores)) };
      }));
      return {
        label: 'Everyone',
        borderColor: 'red',
        fill: false,
        showLine: true,
        data
      };
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        width: 1200,
        animation: false
      },
      scatterData: {},
    }
  }
}
</script>