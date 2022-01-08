import axios from "axios"
import Swal from "sweetalert2"

const state = {
  blogs: [],
  blog: {
    title: '',
    content: '',
    isNsfw: 0,
    category: '',
    user_id: 1
  }
}

const getters = {
  getBlogs: (state) => state.blogs,
  getBlog: (state) => state.blog
}

const actions = {
  fetchBlogs({ commit }) {
    axios.get('/api/blogs/paginate=8/category=blog')
    .then(res => {
      console.log(res)
      commit("setBlogs", res.data.blogs.data)
    })
    .catch(err => console.log(err.response)) 
  },

  addBlog({ commit }, payload) {
    axios.post('/api/blogs', payload.blog)
    .then(res => {
      console.log(res)
      axios.post('api/tags', {
        tags: payload.tags,
        blog_id: res.data.blog.id
      })
      .then(res => {
        console.log(res)
        Swal.fire("Blog added")
      })
      .catch(err => console.log(err.response))
      commit('setBlog')
    })
    .catch(err => console.log(err.response))
  }
}

const mutations = {
  setBlogs: (state, blogs) => (state.blogs = blogs),
  setBlog: (state) => (state.blog = {})
}

export default {
  state, getters, actions, mutations
}