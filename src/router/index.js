import { createRouter, createWebHistory } from 'vue-router'
import Artworks from '@/views/Pages/Artworks'
import Blogs from '@/views/Pages/Blogs'
import Projects from '@/views/Pages/Projects'
import ViewBlog from '@/views/Pages/ViewBlog'
import ViewArtwork from '@/views/Pages/ViewArtwork'
import ViewProject from '@/views/Pages/ViewProject'
import Login from '@/views/Pages/Login'
import Dashboard from '@/views/Admin/Dashboard'
import AccountSettings from '@/views/Admin/AccountSettings'
import AdminBlogs from '@/views/Admin/Blogs'
import AdminProjects from '@/views/Admin/Projects'
import AddBlog from '@/views/Admin/AddBlog'
import AddProject from '@/views/Admin/AddProject'
import NotFound from '@/views/Pages/NotFound'
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
    component: ViewBlog
  },
  {
    path: '/artworks',
    name: 'Artworks',
    component: Artworks
  },
  {
    path: '/artworks/:slug',
    name: 'ViewArtwork',
    component: ViewArtwork
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
    component: Dashboard,
    meta: {
      auth: true
    }
  },
  {
    path: '/admin/account-settings',
    name: 'AccountSettings',
    component: AccountSettings,
    meta: {
      auth: true
    }
  },
  {
    path: '/admin/blogs',
    name: 'AdminBlogs',
    component: AdminBlogs,
    meta: {
      auth: true
    }
  },
  {
    path: '/admin/projects',
    name: 'AdminProjects',
    component: AdminProjects,
    meta: {
      auth: true
    }
  },
  {
    path: '/admin/add-blog',
    name: 'AddBlog',
    component: AddBlog,
    meta: {
      auth: true
    }
  },
  {
    path: '/admin/add-project',
    name: 'AddProject',
    component: AddProject,
    meta: {
      auth: true
    }
  },
  {
    path: '/page-not-found',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.guest == true)) {
    if(localStorage.getItem('token') != null) {
      router.push({ path: '/' })
    }
  }

  if(to.matched.some(record => record.meta.auth == true)) {
    store.dispatch(...['getUser'])
    store.dispatch(...['authenticateUser'])
    if(localStorage.getItem('token') == null) {
      router.push({ path: '/login' })
    }
  } 
  
  next()
  
})


export default router
