<template lang="pug">
  v-layout(
    column
    justify-center
    align-center
  )
    v-flex(xs12)
      firebase-connect
      
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import FirebaseConnect from '~/components/FirebaseConnect.vue'

export default {
  components: {
    FirebaseConnect
  }
}
</script>
