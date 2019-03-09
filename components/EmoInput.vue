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
    div
        v-text-field(v-model="userId" placeholder="Your name")
    div {{userId}}
</template>

<style lang='scss'>
</style>


<script>
import firebase from 'firebase'

function putNewEmotion(userId, emoNum, strength) {
    const emotionsRefStr = '/meetings/2/users/' + userId + '/emotions/'
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
        userId: ""
    }
  },
  methods: {
      onAgree(strength) {
          console.info("onAgree", strength)
          if (this.userId == "") return
          putNewEmotion(this.userId, 1, strength)
      },
      onDisagree(strength) {
          console.info("onDisagreed", strength)
          if (this.userId == "") return
          putNewEmotion(this.userId, 2, strength)
      },
      onConfused(strength) {
          console.info("onConfused", strength)
          if (this.userId == "") return
          putNewEmotion(this.userId, 3, strength)
      },
      onAbsent(strength) {
          console.info("onAbsent", strength)
          if (this.userId == "") return
          putNewEmotion(this.userId, 4, strength)
      },
  },
  async mounted() {
  }
}
</script>