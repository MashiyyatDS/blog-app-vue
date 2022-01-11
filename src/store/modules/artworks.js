import axios from "axios"

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
    window.scrollTo(0, 0)
    axios.get(url)
    .then(res => {
      console.log(res)
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