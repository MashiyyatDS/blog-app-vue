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
            <p class="navbar-title"><a class="navbar-brand" href="#"><i class="fa fa-image"></i> ARTWORKS</a></p>
            <button class="btn btn-outline-primary d-block d-lg-none d-sm-block d-xs-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
              <i class="fa fa-bars"></i>
            </button>
          </div>
        </nav>

        <div class="row" data-masonry='{"percentPosition": true }'>
          <div class="col-lg-4 col-md-6">
            <div class="artwork-image-container">
              <img src="@/assets/images/artworks/artwork-1.png" alt="">
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="artwork-image-container">
              <img src="@/assets/images/artworks/artwork-2.png" alt="">
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="artwork-image-container">
              <img src="@/assets/images/artworks/artwork-3.png" alt="">
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="artwork-image-container">
              <img src="@/assets/images/artworks/artwork-4.png" alt="">
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="artwork-image-container">
              <img src="@/assets/images/artworks/artwork-5.png" alt="">
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="artwork-image-container">
              <img src="@/assets/images/artworks/artwork-6.png" alt="">
            </div>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="artwork-image-container">
              <img src="@/assets/images/artworks/artwork-7.png" alt="">
            </div>
          </div>
        </div>
        <!-- BLOG CARD -->
        <div class="d-flex justify-content-center mb-3 mt-3">
          <div class="d-grid col-6">
            <button class="btn btn-sm btn-outline-dark">Load more</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import Sidebar from '@/components/Partials/Sidebar'
import Offcanvas from '@/components/Partials/Offcanvas'

export default {
  name: 'Artworks',
  components: {
    Sidebar, Offcanvas
  }
}
</script>