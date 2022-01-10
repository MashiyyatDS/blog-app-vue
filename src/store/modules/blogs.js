import axios from "axios"
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

const state = {
  blogs: [],
  blog: {
    title: '',
    content: '',
    isNsfw: 0,
    category: '',
    user_id: 1
  },
  blogLinks: {}
}

const getters = {
  getBlogs: (state) => state.blogs,
  getBlog: (state) => state.blog,
  getBlogLinks: (state) => state.blogLinks
}

const actions = {
  fetchBlogs({ commit }, url) {
    showLoader("Loading...")
    axios.get(url)
    .then(res => {
      Swal.close()
      console.log(res)
      commit("setBlogs", res.data.blogs.data)
      commit("setBlogLinks", res.data.blogs.links)
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
  },

  findBlog({ commit }, id) {
    axios.get(`api/blogs/${id}`)
    .then(res => {
      console.log(res)
      commit('setBlog', res.data.blog)
    })
    .catch(err => console.log(err.response))
  },

  updateBlog({ commit }, data) {
    axios.put(`api/blogs/${data.id}`, data.blog)
    .then(res => {
      Swal.fire("Blog updated")
      console.log(res)
      commit('updateBlog', res.data.blog)
    })
    .catch(err => console.log(err.response))
  },

  deleteBlog({ commit }, id) {
    axios.delete(`api/blogs/${id}`)
    .then(res => {
      Swal.fire("Blog deleted")
      console.log(res)
      commit('deleteBlog', id)
    })
    .catch(err => console.log(err.response))
  },

  viewBlog({ commit }, slug) {
    showLoader("Loading...")
    axios.get(`api/blogs/slug/${slug}`)
    .then(res => {
      Swal.close()
      commit('setBlog', res.data.blog)
    })
    .catch(err => console.log(err.response))
  },

  sample() {
    console.log("Working....")
  }
}

const mutations = {
  setBlogs: (state, blogs) => (state.blogs = blogs),
  setBlog: (state, blog) => (state.blog = blog),
  setBlogLinks: (state, links) => (state.blogLinks = links),
  updateBlog: (state, blog) => {
    let objIndex = state.blogs.findIndex(obj => obj.id == blog.id)
    state.blogs[objIndex] = blog
  },
  deleteBlog: (state, id) => {
    let objIndex = state.blogs.findIndex(obj => obj.id == id)
    state.blogs.splice(objIndex, 1)
  }
}

export default {
  state, getters, actions, mutations
}