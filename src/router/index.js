import { createRouter, createWebHistory } from 'vue-router'
import Artworks from '@/views/Pages/Artworks'
import Blogs from '@/views/Pages/Blogs'
import Projects from '@/views/Pages/Projects'
import Login from '@/views/Pages/Login'
import Dashboard from '@/views/Admin/Dashboard'
import AdminBlogs from '@/views/Admin/Blogs'
import AdminProjects from '@/views/Admin/Projects'

const routes = [
  {
    path: '/',
    name: 'Blogs',
    component: Blogs
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
    path: '/login',
    name: 'Login',
    component: Login
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
