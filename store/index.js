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
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            this.$store.dispatch('SET_CREDENTIAL', { user: user || null })
          }).catch((error) => {
            console.log(error)
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
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
