<template>
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel" style="width: 300px;">
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
            <a href="#" class="nav-link active" aria-current="page">
              <i class="fa fa-dashboard"></i>
              <span class="ms-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link text-white">
              <i class="fa fa-book"></i>
              <span class="ms-3">Blogs</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link text-white">
              <i class="fa fa-folder"></i>
              <span class="ms-3">Projects</span>
            </a>
          </li>
          <li>
            <a href="#" class="nav-link text-white">
              <i class="fa fa-sign-out"></i>
              <span class="ms-3">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Offcanvas'
}
</script>

<style scoped>
  .offacanvas-body {
    padding: 0px;
  }
</style>