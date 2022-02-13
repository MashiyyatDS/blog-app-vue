import axios from "axios"
import Swal from "sweetalert2"
import showLoader from '@/loader'

const state = {
  artwork: {},
  artworks: [],
  links: {}
}

const getters = {
  getArtworks: (state) => state.artworks,
  getArtworkLinks: (state) => state.links
}

const actions = {
  fetchArtworks({ commit }, url) {
    showLoader("Loading...")
    commit('setArtworks', {})
    commit('setArtworkLinks', {})
    axios.get(url)
    .then(res => {
      Swal.close()
      commit('setArtworks', res.data.blogs.data)
      commit('setArtworkLinks', res.data.blogs.links)
    })
    .catch(err => console.log(err.response))
  },
}

const mutations = {
  setArtworks: (state, artworks) => (state.artworks = artworks),
  setArtworkLinks: (state, links) => (state.links = links)
}

export default {
  state, getters, actions, mutations
}