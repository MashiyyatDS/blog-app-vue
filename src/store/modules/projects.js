// import axios from 'axios'

import axios from "axios"

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
  }
}

const getters = {
  getProject: (state) => state.project,
  getProjects: (state) => state.projects
}

const actions = {
  addProject({ commit }, data) {
    console.log(data)
    commit("setProject")
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
        console.log(res)
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

  fetchProjects({ commit }) {
    axios.get('api/projects')
    .then(res => {
      console.log(res)
      commit("setProjects", res.data.projects.data)
    })
    .catch(err => console.log(err.response))
  },

  deleteProject({ commit }, id) {
    axios.delete(`api/projects/${id}`)
    .then(res => {
      console.log(res)
      commit("setProject")
    })
    .catch(err => console.log(err.response))
  }
}

const mutations = {
  setProject: () => {},
  setProjects: (state, projects) => (state.projects = projects),
  setProjectImage: (state, image) => (state.project.image = image),
  setProjectId: (state, projectId) => (state.projectId = projectId)
}

export default {
  state, getters, actions, mutations
}
