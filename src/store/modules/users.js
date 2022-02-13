import axios from "axios"
// import router from '@/router'
import Swal from "sweetalert2"
import showLoader from '@/loader'
import router from "../../router"

const state = {
  authenticated: false,
  currentUser: [],
  dashboard: {}
}
  
const getters = {
  currentUser: (state) => state.currentUser,
  authenticated: (state) => state.authenticated,
  dashboard: (state) => state.dashboard
}

const actions = {
  authenticateUser({ commit }) {
    if(localStorage.getItem('token') != null) {
      commit('setAuthenticatedUser', true)
    } else {
      commit('setAuthenticatedUser', false)
    }
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
  },

  async getUser({ commit }) {
    try {
      const response = await axios.get('api/users')
      commit('setCurrentUser', response.data.user)
    } catch (e) {
      localStorage.removeItem('token');
      router.push({ path: '/login' })
      Swal.close()
      console.clear()
    }
  }
}

const mutations = {
  setCurrentUser: (state, user) => (state.currentUser = user),
  setAuthenticatedUser: (state, payload) => (state.authenticated = payload),
  setDashboard: (state, data) => (state.dashboard = data)
}

export default {
  state, getters, actions, mutations
}