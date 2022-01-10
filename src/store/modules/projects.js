import axios from "axios"
import Swal from 'sweetalert2'

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
  project: (state) => state.project,
  getProject: (state) => state.project,
  getProjects: (state) => state.projects,
  getProjectLinks: (state) => state.projectLinks
}

const actions = {
  addProject({ commit }, data) {
    // ============= 1. UPLOAD IMAGE ==============
    showLoader("Uploading project...")
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
        // ============= 3. ADD PROJECT TO TAGS TO DB ==============
        commit('setProject', res.data.project)
        axios.post('api/project-tags', {
          tags: data.tags,
          project_id: res.data.project.id
        })
        Swal.fire("Project Added!")
        .then(res => {
          console.log(res)})
        .catch(err => console.log(err.response))
        // =========================================================
      })
      .catch(err => console.log(err.response))
      // ==================================================
    })
    .catch(err => console.log(err.response))
  },

  fetchProjects({ commit }, url) {
    showLoader("Loading...")
    axios.get(url)
    .then(res => {
      Swal.close()
      console.log(res)
      commit("setProjects", res.data.projects.data)
      commit("setProjectLinks", res.data.projects.links)
    })
    .catch(err => console.log(err.response))
  },

  deleteProject({ commit }, id) {
    axios.delete(`api/projects/${id}`)
    .then(res => {
      console.log(res)
      commit("removeProject", id)
      Swal.fire("Project deleted")
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
  },

  searchProject({ commit }, data) {
    axios.get(`api/projects/search/${data}`)
    .then(res => {
      console.log(res)
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
      console.log(res)
      Swal.close()
      commit('setProject', res.data.project)
    })
    .catch(err => {
      console.log(err.response)
    })
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
  },
  removeProject: (state, id) => {
    let objIndex = state.projects.findIndex(obj => obj.id == id)
    state.projects.splice(objIndex, 1)
  }
}

export default {
  state, getters, actions, mutations
}
