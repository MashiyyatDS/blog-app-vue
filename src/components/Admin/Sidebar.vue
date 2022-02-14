<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar d-none d-lg-block d-xxl-block" style="width: 280px;">
    <div class="logo-container d-flex justify-content">
      <a href="/" class="mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <img src="@/assets/images/logo-1.png" alt="" class="sidebar-logo">
      </a>
    </div>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/" class="nav-link text-white">
          <i class="fa fa-home"></i>
          <span class="ms-3">Home</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin/dashboard" class="nav-link text-white">
          <i class="fa fa-dashboard"></i>
          <span class="ms-3">Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/blogs" class="nav-link text-white">
          <i class="fa fa-image"></i>
          <span class="ms-3">Blogs / Artworks</span>
        </router-link>
      </li>
      <li>
        <router-link to="/admin/projects" class="nav-link text-white">
          <i class="fa fa-folder"></i>
          <span class="ms-3">Projects</span>
        </router-link>
      </li>
      <li>
        <button href="#" class="nav-link text-white" @click="logoutUser">
          <i class="fa fa-sign-out"></i>
          <span class="ms-3">Logout</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Sidebar',
  methods: {
    ...mapActions(['logoutUser'])
  }
}
</script>