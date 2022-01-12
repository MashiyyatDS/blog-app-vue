import axios from "axios"
import router from '@/router'
import Swal from "sweetalert2"

function showLoader(message){
  Swal.fire({
    title: message,
    html: `
      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    `,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false
  })
}

const users = {
  states : {
    isAuthenticated: false,
    currentUser: {}
  },
  
  getters : {
    currentUser: (state) => state.currentUser,
    isAuthenticated: (state) => state.isAuthenticated
  },
  
  actions : {
    getCurrentUser({ commit }) {
      axios.get('/api/users')
      .then(res => {
        commit('setCurrentUser', res.data.user)
        commit('setAuthenticatedUser', true)
      })
      .catch(err => {
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

    guest() {
      axios.get('/api/users')
      .then(() => router.push({ path: '/' }))
      .catch(err => {
        console.log(err.response.data.message)
      })
    },

    auth() {
      axios.get('/api/users')
      .catch(err => {
        router.push({ path: '/login' })
        console.log(err.response.data.message)
      })
    }
  },
  
  mutations : {
    setCurrentUser: (state, user) => (state.currentUser = user),
    setAuthenticatedUser: (state, condition) => (state.isAuthenticated = condition)
  }
}

export default users