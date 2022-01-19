import axios from "axios"
import Swal from 'sweetalert2'
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
    commit("setProjects", {})
    commit("setProjectLinks", {})
    axios.get(url)
    .then(res => {
      Swal.close()
      commit("setProjects", res.data.projects.data)
      commit("setProjectLinks", res.data.projects.links)
    })
    .catch(err => console.log(err.response))
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
          console.log(res)
          commit("removeProject", id)
          Swal.fire("Project deleted")
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
      console.log(res)
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
