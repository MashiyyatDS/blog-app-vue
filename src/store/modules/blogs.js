import axios from "axios"
import Swal from "sweetalert2"
import router from '@/router'

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
    tags: []
  },
  blogLinks: {}
}

const getters = {
  getBlogs: (state) => state.blogs,
  getBlog: (state) => state.blog,
  getBlogLinks: (state) => state.blogLinks,
  getBlogTags: (state) => state.blog.tags
}

const actions = {
  fetchBlogs({ commit }, url) {
    showLoader("Loading...")
    commit("setBlogs",{})
    commit("setBlogLinks", {})
    axios.get(url)
    .then(res => {
      Swal.close()
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
    commit('setBlog', {})
    commit('setBlogTags', {})
    axios.get(`api/blogs/${id}`)
    .then(res => {
      console.log(res.data.blog)
      commit('setBlog', res.data.blog)
      commit('setBlogTags', res.data.blog.tags)
    })
    .catch(err => console.log(err.response))
  },

  updateBlog({ commit }, data) {
    showLoader("Updating...")
    // ============== UPDATE BLOG DATA ===============
    axios.put(`api/blogs/${data.blog.id}`, data.blog)
    .then(res => {
      Swal.fire("Blog updated")
      commit('updateBlog', res.data.blog)
    })
    .catch(err => console.log(err.response))
    // ============ UPDATE BLOG TAGS ==============
    axios.put(`api/blogs/${data.blog.id}/tags`, { tags: data.tags })
    .then(res => console.log(res))
    .catch(err => console.log(err.response))
  },

  deleteBlog({ commit }, id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "The selected blog/artwork will be deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`api/blogs/${id}`)
        .then(res => {
          Swal.fire("Blog deleted")
          console.log(res)
          commit('deleteBlog', id)
        })
        .catch(err => console.log(err.response))
      }
    })
  },

  viewBlog({ commit }, slug) {
    showLoader("Loading...")
    commit('setBlog', {})
    axios.get(`api/blogs/slug/${slug}`)
    .then(res => {
      Swal.close()
      commit('setBlog', res.data.blog)
    })
    .catch(err => {
      Swal.close()
      router.push("/page-not-found")
      console.log(err.response)
    })
  }
}

const mutations = {
  setBlogs: (state, blogs) => (state.blogs = blogs),
  setBlog: (state, blog) => (state.blog = blog),
  setBlogLinks: (state, links) => (state.blogLinks = links),
  setBlogTags: (state, tags) => (state.blog.tags = tags),
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