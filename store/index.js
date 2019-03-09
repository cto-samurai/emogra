import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '~/plugins/firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'

const db = firebase.database()
const provider = new firebase.auth.GoogleAuthProvider()

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null
    },
    getters: {
      user: state => state.user
    },
    mutations: {
      setCredential(state, { user }) {
        state.user = user
      },
      ...firebaseMutations
    },
    actions: {
      async SET_CREDENTIAL({ commit }, { user }) {
        if (!user) return
        commit('setCredential', { user })
      },
      callAuth() {
        firebase.auth().signInWithPopup(provider).then((result) => {
            const token = result.credential.accessToken
            const user = result.user
            this.$store.dispatch('SET_CREDENTIAL', { user: user || null })
          }).catch((error) => {
            console.log(error)
            var errorCode = error.code
            var errorMessage = error.message
            var email = error.email
            var credential = error.credential
          })
      },
      logout({ commit }) {
        firebase.auth().signOut().then(() => {
          commit('setCredential', { undefined })
        })
      }
    }
  })
}

export default createStore
