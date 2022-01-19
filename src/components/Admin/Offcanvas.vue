<template>
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel" style="width: 300px;">
    <div class="offcanvas-body">
      <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar" style="width: 300px;">
        <div class="logo-container d-flex justify-content">
          <a href="/" class="mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <img src="@/assets/images/logo-1.png" alt="" class="sidebar-logo">
          </a>
        </div>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="/" class="nav-link text-white">
              <i class="fa fa-home"></i>
              <span class="ms-3">Home</span>
            </a>
          </li>
          <li class="nav-item">
            <router-link to="/admin/dashboard" class="nav-link text-white">
              <i class="fa fa-dashboard"></i>
              <span class="ms-3">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/blogs" class="nav-link text-white">
              <i class="fa fa-book"></i>
              <span class="ms-3">Blogs</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/projects" class="nav-link text-white">
              <i class="fa fa-folder"></i>
              <span class="ms-3">Projects</span>
            </router-link>
          </li>
          <li>
            <button class="nav-link text-white" @click="logoutUser">
              <i class="fa fa-sign-out"></i>
              <span class="ms-3">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'OffCanvas',
  methods: {
    ...mapActions(['logoutUser'])
  }
}
</script>

<style scoped>
  .offcanvas-body {
    padding: 0px!important;
  }
</style>