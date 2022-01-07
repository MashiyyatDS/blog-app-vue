<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12">
        <nav class="navbar navbar navbar-dark bg-dark mb-3 sticky-top" style="margin: 2px;border-radius: 5px;">
          <div class="container-fluid p-1">
            <p class="navbar-title"><a class="navbar-brand" href="#"><i class="fa fa-folder"></i> PROJECTS</a></p>
            <button class="btn btn-outline-primary d-block d-lg-none d-sm-block d-xs-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
              <i class="fa fa-bars"></i>
            </button>
          </div>
        </nav>

        <!-- PROJECT ITEM -->
        <div class="row mb-3">
          <div class="col-md-6 p-1">
            <div class="project-image-container">
              <img src="@/assets/images/blog-1.jpg" alt="">
            </div>
          </div>
          <div class="col-md-6 p-1">
            <div class="project-content-container">
              <h3><i class="fa fa-folder"></i> Sample Project 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, exercitationem illum ut beatae non voluptas totam harum distinctio placeat obcaecati voluptate? Eaque impedit vel ea similique, dolor nemo dolore autem?</p>
              <div class="project-tags-container">
                <span class="badge bg-primary ms-1">Laravel 8</span>
                <span class="badge bg-primary ms-1">VueJS</span>
                <span class="badge bg-primary ms-1">VUEX</span>
                <span class="badge bg-primary ms-1">Bootstrap 5</span>
                <span class="badge bg-primary ms-1">JavaScript</span>
                <span class="badge bg-primary ms-1">PHP</span>
                <span class="badge bg-primary ms-1">MySQL</span>
              </div>
              <hr>
              <div class="d-flex">
                <div class="d-grid col-6 p-1">
                  <button class="btn btn-sm btn-outline-dark">Demo</button>
                </div>
                <div class="d-grid col-6 p-1">
                  <button class="btn btn-sm btn-outline-dark">Code</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- PROJECT ITEM -->
        <div class="row mb-3">
          <div class="col-md-6 p-1">
            <div class="project-image-container">
              <img src="@/assets/images/blog-2.jpg" alt="">
            </div>
          </div>
          <div class="col-md-6 p-1">
            <div class="project-content-container">
              <h3><i class="fa fa-folder"></i> Sample Project 1</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, exercitationem illum ut beatae non voluptas totam harum distinctio placeat obcaecati voluptate? Eaque impedit vel ea similique, dolor nemo dolore autem?</p>
              <div class="project-tags-container">
                <span class="badge bg-primary ms-1">Laravel 8</span>
                <span class="badge bg-primary ms-1">VueJS</span>
                <span class="badge bg-primary ms-1">VUEX</span>
                <span class="badge bg-primary ms-1">Bootstrap 5</span>
                <span class="badge bg-primary ms-1">JavaScript</span>
                <span class="badge bg-primary ms-1">PHP</span>
                <span class="badge bg-primary ms-1">MySQL</span>
              </div>
              <hr>
              <div class="d-flex">
                <div class="d-grid col-6 p-1">
                  <button class="btn btn-sm btn-outline-dark">Demo</button>
                </div>
                <div class="d-grid col-6 p-1">
                  <button class="btn btn-sm btn-outline-dark">Code</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="pagination-container d-flex justify-content-center mb-3">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#"><i class="fa fa-chevron-left"></i></a></li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#"><i class="fa fa-chevron-right"></i></a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Partials/Sidebar'
import Offcanvas from '@/components/Partials/Offcanvas'

export default {
  name: 'Projects',
  components: {
    Sidebar, Offcanvas
  }
}
</script>