<template lang="pug">
  v-layout(
    column
    justify-center
    align-center
  )
    v-flex(xs12)
        emo-input
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import moment from 'moment'
import EmoInput from "~/components/EmoInput.vue"

export default {
  components: {
      EmoInput
  },
  methods: {
  },
  data() {
    return {
    }
  }
}
</script>