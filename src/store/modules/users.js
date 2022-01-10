import axios from "axios"

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
        console.log(res)
        commit('setCurrentUser', res.data.user)
        commit('setAuthenticatedUser', true)
      })
      .catch(err => {
        commit('setCurrentUser', err.response.data.message)
        commit('setAuthenticatedUser', false)
      })
    },
  
    loginUser({ commit }, data) {
      axios.post('api/users', data)
      .then(res => {
        console.log(res)
        commit('setCurrentUser', res.data.user)
        commit('setAuthenticatedUser', true)
        localStorage.setItem('token', res.data.token)
      })
      .catch(err => console.log(err.response))
    }
  },
  
  mutations : {
    setCurrentUser: (state, user) => (state.currentUser = user),
    setAuthenticatedUser: (state, condition) => (state.isAuthenticated = condition)
  }
}

export default users