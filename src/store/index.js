import { createStore } from 'vuex'
import blogs from './modules/blogs'
import projects from './modules/projects'
import users from '@/store/modules/users'

const store = createStore({
  modules: {
    blogs,
    projects, 
    users
  }
})

export default store