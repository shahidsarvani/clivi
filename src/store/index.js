import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    auth_success(state, token) {
      state.token = token
    },
    logout(state) {
      state.token = ''
    },
  },
  actions: {
    login({ commit }, payload) {
      commit('auth_success', payload.token)
    },
    logout({ commit }) {
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common.Authorization;
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    token: state => state.token
  },
  modules: {
  }
})
