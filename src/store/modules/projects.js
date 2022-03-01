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
    images: [],
    tags: [],
  },
  newProject: {
    title: '',
    description: '',
    link: '',
    repository: '',
    images: [],
    tags: [],
  },
  projectErrors: []
}

const getters = {
  project: (state) => state.project,
  newProject: (state) => state.newProject,
  getProject: (state) => state.project,
  getProjects: (state) => state.projects,
  getProjectLinks: (state) => state.project.links,
  getProjectTags: (state) => state.project.tags,
  projectErrors: (state) => state.projectErrors
}

const actions = {
  async addProject({ commit }, payload) {
    commit('setProjectErrors', [])
    showLoader("Adding Project...")
    try {
      // Upload project data
      const project = await axios.post('api/projects', {
        title: payload.title,
        description: payload.description,
        link: payload.link,
        repository: payload.repository,
        images: payload.images.length
      })
      let projectId = project.data.project.id

      // Upload project tags
      axios.post('api/project-tags', {
        tags: payload.tags,
        project_id: projectId
      })
      .then(res => console.log(res))
      .catch(err => console.error(err))

      // Upload project images
      payload.images.forEach(image => {
        let formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'jsa0dt26')

        fetch('https://api.cloudinary.com/v1_1/dv1tdnpbu/image/upload', {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          axios.post('api/project-images', {
            image: data.url,
            project_id: projectId
          })
        })
      })

      Swal.fire({title: "Project added", icon: 'success' })
      commit('clearProject')
    }catch (error) {
      Swal.close()
      commit('setProjectErrors', error.response.data.errors)
      console.log(error.response)
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
      console.log(res)
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
  updateProject: (state, project) => (state.projects[state.projects.findIndex((obj => obj.id == project.id))] = project),
  removeProject: (state, id) => (state.projects.splice(state.projects.findIndex(obj => obj.id == id), 1)),
  setProjectErrors: (state, errors) => (state.projectErrors = errors),
  clearProject: (state) => {
    [state.newProject.title, 
    state.newProject.description,
    state.newProject.link,
    state.newProject.repository,] = '',
    [state.newProject.tags, state.newProject.image] = [] 
  }
}

export default {
  state, getters, actions, mutations
}
