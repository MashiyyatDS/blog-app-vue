import axios from "axios"
import Swal from "sweetalert2"
import router from '@/router'
import showLoader from '@/loader'

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

  async addBlog(_, payload) {
    showLoader("Adding blog...")
    let formData = new FormData()
    formData.append('file', payload.image)
    formData.append('upload_preset', 't8j7klfq')
    try {
      // =================== Upload image to cloudinary ===================
      const image = await fetch('https://api.cloudinary.com/v1_1/dv1tdnpbu/image/upload', {
        body: formData,
        method: 'POST'
      }).then(res => { return res.json() }).then(data => { return data })
      let imageName = image.url
  
      const blog = await axios.post('/api/blogs', {
        title: payload.blog.title,
        content: payload.blog.content,
        category: payload.blog.category,
        isNsfw: payload.blog.isNsfw,
        user_id: payload.blog.user_id,
        image: imageName
      })
      console.log(blog)
  
      const tags = await axios.post('api/tags', {
        blog_id: blog.data.blog.id,
        tags: payload.tags
      })
      console.log(tags)
      Swal.fire({ title: 'Blog added', icon: 'success' })
    } catch (error) {
      Swal.close()
      console.error(error.response)
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