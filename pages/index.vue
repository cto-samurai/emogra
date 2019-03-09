<template lang="pug">
  v-layout(
    column
    justify-center
    align-center
  )
    v-flex(xs12)
      div
        v-text-field(v-model='name' placeholder='meeting name')
      div
        v-btn(@click='onClick') Create New Meeting
</template>

<script>
import firebase from 'firebase'
export default {
  components: {
  },
  methods: {
    onClick() {
      if (!this.name) return

      const uuidv1 = require('uuid/v1')
      const uuid = uuidv1()
      const db = firebase.database()
      const emotionsRefStr = `/meetings/${uuid}`
      var emotionsRef = db.ref(emotionsRefStr)
      emotionsRef.set({name: this.name})

      this.$router.push(`/view/${uuid}`)
    }
  },
  data() {
    return {
      name: ''
    }
  }
}
</script>