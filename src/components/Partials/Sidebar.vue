<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar d-none d-lg-block d-xxl-block" style="width: 336px">
    <div class="logo-container mb-5">
      <a href="/" class="mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <img src="@/assets/images/logo-2.png" alt="" class="sidebar-logo">
      </a>
    </div>
    <ul class="nav nav-pills flex-column mb-auto">
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
      <div class="d-flex mt-3">
        <button class="btn-sm btn btn-outline-dark ms-1"><i class="fa fa-facebook"></i></button>
        <button class="btn-sm btn btn-outline-dark ms-1"><i class="fa fa-instagram"></i></button>
        <button class="btn-sm btn btn-outline-dark ms-1"><i class="fa fa-github"></i></button>
        <button class="btn-sm btn btn-outline-dark ms-1"><i class="fa fa-linkedin"></i></button>
        <button class="btn-sm btn btn-outline-dark ms-1"><i class="fa fa-twitter"></i></button>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>