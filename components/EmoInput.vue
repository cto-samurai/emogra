<template lang='pug'>
.EmoInput
    div
        div Agree
        v-btn(color="success" @click="onAgree(1)") 1
        v-btn(color="success" @click="onAgree(2)") 2
        v-btn(color="success" @click="onAgree(3)") 3
    div
        div Trying to understand
        v-btn(color="warning" @click="onConfused(1)") Confused
    div
        div Disagree
        v-btn(color="error" @click="onDisagree(1)") 1
        v-btn(color="error" @click="onDisagree(2)") 2
        v-btn(color="error" @click="onDisagree(3)") 3
    div
        div Absent
        v-btn(color="warning" @click="onAbsent(1)") Absent
</template>

<style lang='scss'>
</style>


<script>
import firebase from 'firebase'

function putNewEmotion(emoNum, strength) {
    const emotionsRefStr = '/meetings/2/users/aaaaa/emotions/'
    const db = firebase.database()
    const obj = {
        emotion: emoNum,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        strength: strength
    }
    var emotionsRef = db.ref(emotionsRefStr)
    emotionsRef.push(obj)
}

export default {
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
      onAgree(strength) {
          console.info("onAgree", strength)
          putNewEmotion(1, strength)
      },
      onDisagree(strength) {
          console.info("onDisagreed", strength)
          putNewEmotion(2, strength)
      },
      onConfused(strength) {
          console.info("onConfused", strength)
          putNewEmotion(3, strength)
      },
      onAbsent(strength) {
          console.info("onAbsent", strength)
          putNewEmotion(4, strength)
      },
  },
  async mounted() {
    // initialize your firebase app
    firebase.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })

    // save a reference to the firestore database
    // to access it in the future
    const db = firebase.database()
  }
}
</script>