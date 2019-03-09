<template lang="pug">
  v-layout(
    column
    justify-center
    align-center
  )
    v-flex(xs12 md3)
      the-user-info
</template>

<script>
// import FirebaseConnect from '~/components/FirebaseConnect.vue'
// import BarChart from '~/components/BarChart'

import auth from '~/plugins/auth'
import { mapGetters, mapActions } from 'vuex'
import TheUserInfo from '~/components/TheUserInfo'

export default {
  components: {
    TheUserInfo
  },
  async mounted() {
    let user
    if (!this.user) user = await auth()
    await Promise.all([
      this.user
        ? Promise.resolve()
        : this.$store.dispatch('SET_CREDENTIAL', { user: user || null })
    ])
  },
  computed: {
    ...mapGetters(['user'])
  },
  data() {
    return {
      test: ""
    }
  }
}
</script>
