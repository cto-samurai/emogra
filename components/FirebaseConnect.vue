<template lang='pug'>
.FirebaseConnect
</template>

<style lang='scss'>
.FirebaseConnect {
}
</style>


<script>
import firebase from 'firebase'

export default {
  components: {
  },
  data() {
    return {
      meetings: undefined
    }
  },
  async mounted () {
    // initialize your firebase app
    firebase.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID,
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })

    // save a reference to the firestore database
    // to access it in the future
    const db = firebase.database()
    const users = db.ref('/meetings/2/users')
    users.on('value', (snapshot) => {
      this.$emit('emotionUpdated', snapshot.val())
    })
  }
}
</script>
