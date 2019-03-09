<template lang='pug'>
  v-list
    v-list-tile(v-for='(item, i) in items', :key='i', :to='item.to', router='', exact='')
      v-list-tile-action
        v-icon {{ item.icon }}
      v-list-tile-content
        v-list-tile-title(v-text='item.title')

</template>

<style lang='scss'>
.MeetingList {
}
</style>


<script>
import firebase from 'firebase'

export default {
  components: {
  },
  data() {
    return {
      meetings: undefined,
      items: [],
    }
  },
  async mounted () {
    const db = firebase.database()
    const users = db.ref('/meetings')
    users.on('value', (snapshot) => {
      const ms = snapshot.val()
      const meetings = []
      Object.keys(ms).forEach(x => {
        if (ms[x].users != null) {
          meetings.push({
            icon: 'apps',
            title: `${x}`,
            to: '/',
            data: ms[x]
          })
        }
      })
      this.items = meetings
    })
  }
}
</script>
