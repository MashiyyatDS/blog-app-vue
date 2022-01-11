import { createStore } from 'vuex'
import blogs from './modules/blogs'
import projects from './modules/projects'
import users from '@/store/modules/users'
import artworks from '@/store/modules/artworks'

const store = createStore({
  modules: {
    blogs,
    projects, 
    users,
    artworks
  }
})

export default store