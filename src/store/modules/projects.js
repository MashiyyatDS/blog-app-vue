import axios from "axios"
import Swal from 'sweetalert2'
import router from '@/router'
import showLoader from '@/loader'

const state = {
  projects: [],
  project: {
    title: '',
    description: '',
    link: '',
    repository: '',
    image: '',
    tags: [],
    links: []
  }
}

const getters = {
  project: (state) => state.project,
  getProject: (state) => state.project,
  getProjects: (state) => state.projects,
  getProjectLinks: (state) => state.project.links,
  getProjectTags: (state) => state.project.tags
}

const actions = {
  async addProject(_, payload) {
    showLoader("Adding Project...")
    let formData = new FormData()
    formData.append('file', payload.image)
    formData.append('upload_preset', 'jsa0dt26')
    try {
      // =================== Upload image to cloudinary ===================
      const image = await fetch('https://api.cloudinary.com/v1_1/dv1tdnpbu/image/upload', {
        body: formData,
        method: 'POST'
      }).then(res => { return res.json() }).then(data => { return data })
      let imageName = image.url
      // =================== Upload project data ===================
      const project = await axios.post('api/projects', {
        title: payload.project.title,
        description: payload.project.description,
        link: payload.project.link,
        repository: payload.project.repository,
        image: imageName
      })
      let projectId = project.data.project.id
      // =================== Upload project tags ===================
      axios.post('api/project-tags', {
        tags: payload.tags,
        project_id: projectId
      })

      Swal.fire({title: "Project added", icon: 'success' })
    }catch (error) {
      console.error(error.response)
    }
  },

  async fetchProjects({ commit }, url) {
    showLoader("Loading...")
    commit("setProjects", {})
    commit("setProjectLinks", {})
    try {
      const response = await axios.get(url)
      commit("setProjects", response.data.projects.data)
      commit("setProjectLinks", response.data.projects.links)
      console.log(response)
      Swal.close()
    } catch (error) {
      console.error(error.response)
    }
  },

  deleteProject({ commit }, id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "The selected project will be deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then(result => {
      if(result.isConfirmed) {
        axios.delete(`api/projects/${id}`)
        .then(res => {
          commit("removeProject", id)
          Swal.fire({title: res.data.message, icon: 'success' })
        })
        .catch(err => console.log(err.response))
      }
    })
  },

  findProject({ commit }, id) {
    commit('setProject', {})
    commit('setProjectTags', {})
    axios.get(`api/projects/${id}`)
    .then(res => {
      commit('setProject', res.data.project)
      commit('setProjectTags', res.data.project.tags)
    })
    .catch(err => console.log(err))
  },

  updateProject({ commit }, data) {
    showLoader("Updating...")
    axios.put(`api/projects/${data.id}`, data.project)
    .then(res => {
      Swal.close()
      Swal.fire("Project updated")
      console.log(res)
      commit('updateProject', res.data.project)
    })
    .catch(err => console.log(err))
    // Update Project Tags
    axios.put(`api/projects/${data.id}/project-tags`, {
      tags: data.tags
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err.response))
  },

  searchProject({ commit }, data) {
    showLoader("Searching...")
    axios.get(`api/projects/search/${data}`)
    .then(res => {
      Swal.close()
      commit("setProjects", res.data.projects.data)
      commit("setProjectLinks", res.data.projects.links)
    })
    .catch(err => console.log(err.response))
  },

  viewProject({ commit }, slug) {
    showLoader("Loading...")
    commit('setProject', {})
    axios.get(`api/projects/slug/${slug}`)
    .then(res => {
      Swal.close()
      commit('setProject', res.data.project)
    })
    .catch(err => {
      Swal.close()
      router.push("/page-not-found")
      console.log(err.response)
    })
  }
}

const mutations = {
  setProject: (state, project) => (state.project = project),
  setProjectTags: (state, tags) => (state.project.tags = tags),
  setProjects: (state, projects) => (state.projects = projects),
  setProjectLinks: (state, links) => (state.project.links = links),
  setProjectImage: (state, image) => (state.project.image = image),
  updateProject: (state, project) => {
    let objIndex = state.projects.findIndex((obj => obj.id == project.id))
    state.projects[objIndex] = project
  },
  removeProject: (state, id) => {
    let objIndex = state.projects.findIndex(obj => obj.id == id)
    state.projects.splice(objIndex, 1)
  }
}

export default {
  state, getters, actions, mutations
}
