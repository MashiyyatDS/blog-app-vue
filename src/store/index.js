import { createStore } from 'vuex'
import blogs from './modules/blogs'
import projects from './modules/projects'

const store = createStore({
  modules: {
    blogs,
    projects
  }
})

export default store