<template>
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel" style="width: 300px;">
    <div class="offcanvas-body">
      <div class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar" style="width: 300px;">
          <div class="logo-container mb-5">
        <a href="/" class="mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <img src="@/assets/images/logo-2.png" alt="" class="sidebar-logo">
        </a>
      </div>
      <ul class="nav nav-pills flex-column mb-auto">
        <li v-if="authenticated">
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
        <li v-if="authenticated">
          <button class="nav-link link-dark" @click="logoutUser">
            <i class="fa fa-sign-out"></i> <span class="ms-3">Logout</span>
          </button>
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
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Offcanvas',
  computed: {
    ...mapGetters(['authenticated'])
  },
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