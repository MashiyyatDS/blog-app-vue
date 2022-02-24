import axios from "axios"
import Swal from "sweetalert2"
import showLoader from '@/loader'
import router from '@/router'

const state = {
  blogs: [],
  blog: {
    title: '',
    content: '',
    isNsfw: 0,
    category: '',
    tags: [],
    user: {
      firstname: '',
      lastname: ''
    }
  },
  newBlog: {
    title: '',
    content: '',
    isNsfw: false,
    category: 'blog',
    tags: [],
    image: []
  },
  blogLinks: [],
  blogErrors: []
}

const getters = {
  getBlogs: (state) => state.blogs,
  blog: (state) => state.blog,
  newBlog: (state) => state.newBlog,
  getBlogLinks: (state) => state.blogLinks,
  getBlogTags: (state) => state.blog.tags,
  blogErrors: (state) => state.blogErrors
}

const actions = {
  async fetchBlogs({ commit }, url) {
    showLoader("Loading...")
    commit("setBlogs", {})
    commit("setBlogLinks", {})
    try {
      const response = await axios.get(url)
      Swal.close()
      commit("setBlogs", response.data.blogs.data)
      commit("setBlogLinks", response.data.blogs.links)
    } catch (error) {
      console.error(error.response)
    }
  },

  async addBlog({ commit }, payload) {
    commit('setBlogErrors', [])
    showLoader("Adding blog...")
    let formData = new FormData()
    formData.append('file', payload.image)
    formData.append('upload_preset', 't8j7klfq')
    try {
      // =================== Upload image to cloudinary ===================
      const image = await fetch('https://api.cloudinary.com/v1_1/dv1tdnpbu/image/upload', {
        body: formData,
        method: 'POST'
      })
      .then(res => res.json()).then(data => data)
      let imageName = image.url
  
      const blog = await axios.post('/api/blogs', {
        title: payload.title,
        content: payload.content,
        category: payload.category,
        isNsfw: payload.isNsfw,
        image: imageName
      })
      console.log(blog)
  
      const tags = await axios.post('api/tags', {
        blog_id: blog.data.blog.id,
        tags: payload.tags
      })
      console.log(tags)
      Swal.fire({ title: 'Blog added', icon: 'success' })
      commit('clearBlog')
    } catch (error) {
      Swal.close()
      console.clear()
      commit('setBlogErrors', error.response.data.errors)
    }
  },

  findBlog({ commit }, id) {
    commit('setBlog', {})
    commit('setBlogTags', {})
    axios.get(`api/blogs/${id}`)
    .then(res => {
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
        showLoader("Deleting blog...")
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

  async setNsfw({ commit }, payload) {
    try {
      const response = await axios.put(`api/blogs/${payload.id}`, {
        isNsfw: payload.isNsfw
      })
      commit('updateBlog', response.data.blog)
    } catch (e) {
      console.error(e.response)
    }
  },

  async viewBlog({ commit }, slug) {
    showLoader("Loading...")
    try {
      const response = await axios.get(`api/blogs/slug/${slug}`)
      commit('setBlog', response.data.blog)
      Swal.close()
    } catch (e) {
      console.error(e.response)
      if(e.response.status == 404) {
        console.clear()
        Swal.close()
        router.push({ path: '/page-not-found' })
      }
    }
  }

}

const mutations = {
  setBlogs: (state, blogs) => (state.blogs = blogs),
  setBlog: (state, blog) => (state.blog = blog),
  setBlogLinks: (state, links) => (state.blogLinks = links),
  setBlogTags: (state, tags) => (state.blog.tags = tags),
  updateBlog: (state, blog) => (state.blogs[state.blogs.findIndex(obj => obj.id == blog.id)] = blog),
  deleteBlog: (state, id) => (state.blogs.splice(state.blogs.findIndex(obj => obj.id == id), 1)),
  setBlogErrors: (state, errors) => (state.blogErrors = errors),
  clearBlog: (state) => {
    [state.newBlog.title, state.newBlog.content] = '',
    state.newBlog.tags = []
  }
}

export default {
  state, getters, actions, mutations
}