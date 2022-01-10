import { createRouter, createWebHistory } from 'vue-router'
import Artworks from '@/views/Pages/Artworks'
import Blogs from '@/views/Pages/Blogs'
import ViewBlog from '@/views/Pages/ViewBlog'
import Projects from '@/views/Pages/Projects'
import ViewProject from '@/views/Pages/ViewProject'
import Login from '@/views/Pages/Login'
import Dashboard from '@/views/Admin/Dashboard'
import AdminBlogs from '@/views/Admin/Blogs'
import AdminProjects from '@/views/Admin/Projects'
import AddBlog from '@/views/Admin/AddBlog'
import AddProject from '@/views/Admin/AddProject'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Blogs',
    component: Blogs
  },
  {
    path: '/blogs/:slug',
    name: 'ViewBlog',
    component: ViewBlog,
    beforeEnter: (to, from, next) => {
      store.dispatch('fetchBlogs', '/api/blogs/paginate=3/category=blog')
      next()
    }
  },
  {
    path: '/artworks',
    name: 'Artworks',
    component: Artworks
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/projects/:slug',
    name: 'ViewProject',
    component: ViewProject
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/admin/blogs',
    name: 'AdminBlogs',
    component: AdminBlogs
  },
  {
    path: '/admin/projects',
    name: 'AdminProjects',
    component: AdminProjects
  },
  {
    path: '/admin/add-blog',
    name: 'AddBlog',
    component: AddBlog
  },
  {
    path: '/admin/add-project',
    name: 'AddProject',
    component: AddProject
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
