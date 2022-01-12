<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar d-none d-lg-block d-xxl-block" style="width: 336px">
    <div class="logo-container mb-5">
      <a href="/" class="mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <img src="@/assets/images/logo-2.png" alt="" class="sidebar-logo">
      </a>
    </div>
    <ul class="nav nav-pills flex-column mb-auto">
      <li v-show="isAuthenticated">
        <router-link to="/admin/dashboard" class="nav-link link-dark">
          <i class="fa fa-list"></i> <span class="ms-3">Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link to="/" class="nav-link link-dark">
          <i class="fa fa-book"></i> <span class="ms-3">Blogs</span>
        </router-link>
      </li>
      <li>
        <router-link to="/artworks" class="nav-link link-dark">
          <i class="fa fa-image"></i> <span class="ms-3">Artworks</span>
        </router-link>
      </li>
      <li>
        <router-link to="/projects" class="nav-link link-dark">
          <i class="fa fa-folder"></i> <span class="ms-3">Projects</span>
        </router-link>
      </li>
      <li v-show="isAuthenticated">
        <router-link to="/admin/dashboard" class="nav-link link-dark">
          <i class="fa fa-sign-out"></i> <span class="ms-3">Logout</span>
        </router-link>
      </li>
      <div class="d-flex mt-3">
        <a href="" class="btn-sm btn btn-outline-dark ms-1"><i class="fa fa-facebook"></i></a>
        <a class="btn-sm btn btn-outline-dark ms-1"><i class="fa fa-instagram"></i></a>
        <a href="https://github.com/Mash-min" class="btn-sm btn btn-outline-dark ms-1"><i class="fa fa-github"></i></a>
        <a class="btn-sm btn btn-outline-dark ms-1"><i class="fa fa-linkedin"></i></a>
        <a class="btn-sm btn btn-outline-dark ms-1"><i class="fa fa-twitter"></i></a>
      </div>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['getCurrentUser'])
  },
  created() {
    this.getCurrentUser()
  }
}
</script>