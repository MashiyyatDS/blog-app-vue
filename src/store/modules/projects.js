import axios from "axios"
import Swal from 'sweetalert2'

const state = {
  projects: [],
  projectId: '',
  project: {
    title: '',
    description: '',
    link: '',
    repository: '',
    image: '',
    user_id: 1
  },
  projectLinks: {}
}

const getters = {
  getProject: (state) => state.project,
  getProjects: (state) => state.projects,
  getProjectLinks: (state) => state.projectLinks
}

const actions = {
  addProject({ commit }, data) {
    // ============= 1. UPLOAD IMAGE ==============
    const formData = new FormData()
    formData.append('file', data.image)
    formData.append('upload_preset', 'jsa0dt26')
    fetch("https://api.cloudinary.com/v1_1/dv1tdnpbu/image/upload", {
      body: formData,
      method: 'POST'
    })
    .then(res => { return res.json() })
    .then(response => {
      // ============= 2. ADD PROJECT TO DB ==============
      console.log(response)
      axios.post('api/projects', {
        title: data.project.title,
        description: data.project.description,
        link: data.project.link,
        repository: data.project.repository,
        image: response.url,
        user_id: 1
      })
      .then(res => {
        // ============= 2. ADD PROJECT TO TAGS TO DB ==============
        commit('setProject', res.data.project)
        axios.post('api/project-tags', {
          tags: data.tags,
          project_id: res.data.project.id
        })
        .then(res => console.log(res))
        .catch(err => console.log(err.response))
        // =========================================================
      })
      .catch(err => console.log(err.response))
      // ==================================================
    })
    .catch(err => console.log(err.response))
  },

  fetchProjects({ commit }, url) {
    axios.get(url)
    .then(res => {
      console.log(res)
      commit("setProjects", res.data.projects.data)
      commit("setProjectLinks", res.data.projects.links)
    })
    .catch(err => console.log(err))
  },

  deleteProject({ commit }, id) {
    axios.delete(`api/projects/${id}`)
    .then(res => {
      console.log(res)
      commit("setProject")
    })
    .catch(err => console.log(err.response))
  },

  findProject({ commit }, id) {
    axios.get(`api/projects/${id}`)
    .then(res => {
      console.log(res)
      commit('setProject', res.data.project)
    })
    .catch(err => console.log(err))
  },

  updateProject({ commit }, data) {
    axios.put(`api/projects/${data.id}`, data.project)
    .then(res => {
      Swal.fire("Project updated")
      console.log(res)
      commit('updateProject', res.data.project)
    })
    .catch(err => console.log(err))
  }
}

const mutations = {
  setProject: (state, project) => (state.project = project),
  setProjects: (state, projects) => (state.projects = projects),
  setProjectLinks: (state, links) => (state.projectLinks = links),
  setProjectImage: (state, image) => (state.project.image = image),
  setProjectId: (state, projectId) => (state.projectId = projectId),
  updateProject: (state, project) => {
    let objIndex = state.projects.findIndex((obj => obj.id == project.id))
    state.projects[objIndex] = project
  }
}

export default {
  state, getters, actions, mutations
}
