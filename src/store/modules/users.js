import axios from "axios"
import router from '@/router'
import Swal from "sweetalert2"
import showLoader from '@/loader'

const state = {
  isAuthenticated: false,
  currentUser: [],
  dashboard: {}
}
  
const getters = {
  currentUser: (state) => state.currentUser,
  isAuthenticated: (state) => state.isAuthenticated,
  dashboard: (state) => state.dashboard
}

const actions = {
  authenticateUser({ commit }) {
    axios.get('/api/users')
    .then(res => {
      commit('setCurrentUser', res.data.user)
      commit('setAuthenticatedUser', true)
    })
    .catch(err => {
      console.clear()
      commit('setCurrentUser', err.response.data.message)
      commit('setAuthenticatedUser', false)
    })
  },

  loginUser({ commit }, data) {
    showLoader("Loading....")
    axios.post('api/users', data)
    .then(res => {
      console.log(res)
      commit('setCurrentUser', res.data.user)
      commit('setAuthenticatedUser', true)
      localStorage.setItem('token', res.data.token)
      window.location.href = "/admin/dashboard"
    })
    .catch(err => {
      Swal.fire(err.response.data.message)
      console.log(err.response)
    })
  }, 

  logoutUser() {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout',
    }).then(result => {
      if(result.isConfirmed) {
        showLoader("Logging out...")
        axios.post('api/users/logout')
        .then(() => {
          localStorage.removeItem('token')
          window.location.href = "/"
        })
        .catch(err => console.log(err.response))
      }
    })
  },

  guest() {
    axios.get('/api/users')
    .then(() => { 
      router.push({ path: '/page-not-found' })
      return false 
    })
    .catch((err) => console.log(err.response))
  },

  auth({ commit }) {
    axios.get('/api/users')
    .then(() => { 
      Swal.close()
      commit('setAuthenticatedUser', true)
      return true 
    })
    .catch(() => {
      Swal.close()
      router.push({ path: '/login' })
    })
  },

  fetchDashboard({ commit }) {
    showLoader("Loading...")
    axios.get('api/users/dashboard')
    .then(res => {
      Swal.close()
      commit('setDashboard', res.data)
    })
    .catch(err => console.log(err.response))
  },

  updateUser({ commit }, data) {
    showLoader("Updating...")
    axios.put('api/users', data)
    .then(res => {
      Swal.fire("Account updated")
      commit('setCurrentUser', res.data.user)
    })
    .catch(err => console.log(err.response))
  },

  async resetPassword(_, payload) {
    try {
      const response = await axios.put('api/users/reset-password', payload)
      Swal.fire({ title: response.data.message, icon: 'success' })
    } catch (error) {
      console.log(error.response)
    }
  }
}

const mutations = {
  setCurrentUser: (state, user) => (state.currentUser = user),
  setAuthenticatedUser: (state, condition) => (state.isAuthenticated = condition),
  setDashboard: (state, data) => (state.dashboard = data)
}

export default {
  state, getters, actions, mutations
}