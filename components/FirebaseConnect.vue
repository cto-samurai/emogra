<template lang='pug'>
.FirebaseConnect
  div 'hello'
  div {{meetings}}
  div .bar-chart
    BarChart :data="barChartData" :options="{ maintainAspectRatio: false }"
</template>

<style lang='scss'>
.FirebaseConnect {
}
</style>


<script>
import firebase from 'firebase'
import { Bar } from 'vue-chartjs'

export default {
  components: {
  },
  data() {
    return {
      meetings: undefined
    }
  },
  async mounted () {

    console.log(process.env.FIREBASE_DATABASE_URL)

    // initialize your firebase app
    firebase.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })

    // save a reference to the firestore database
    // to access it in the future
    const db = firebase.database()
    const meetings = db.ref('/meetings')
    meetings.once('value').then((snapshot) => {
      console.log(snapshot.val())
      this.meetings = snapshot.val()
    })
  }
}
</script>
