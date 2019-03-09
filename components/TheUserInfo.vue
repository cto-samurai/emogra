<template lang="pug">
.TheUserInfo
  template(v-if="user")
    v-card
      v-img(:src="user.photoURL")
      v-card-title
        strong {{ user.displayName }}
      v-card-actions
        a.button.is-primary(@click="logout") Signout
  template(v-else)
    v-card
      v-card-actions
        a.button.is-primary(@click="callAuth") Signin with Google
</template>

<style scoped>
</style>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['callAuth', 'logout'])
  }
}
</script>
