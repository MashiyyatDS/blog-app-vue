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
            <p class="navbar-title"><a class="navbar-brand" href="#"><i class="fa fa-book"></i> BLOGS</a></p>
            <button class="btn btn-outline-primary d-block d-lg-none d-sm-block d-xs-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
              <i class="fa fa-bars"></i>
            </button>
          </div>
        </nav>

        <div class="row blog">
          <div class="col-md-6">
            <div class="blog-image-container p-2">
              <img src="@/assets/images/blog-1.jpg" alt="">
            </div>
          </div>
          <div class="col-md-6">
            <div class="blog-content-container p-2">
              <h3>Sample Blog Post</h3>
              <small class="text-muted">Posted at January 1, 2022, 10:59 AM</small>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem explicabo eligendi cumque quo, rem perferendis voluptatum atque ea nesciunt natus qui animi iure delectus alias sint, dolor commodi sed odio?</p>
              <div class="blog-tags-container">
                <button class="btn btn-sm btn-outline-dark ms-1"><i class="fa fa-tag"></i> Meme</button>
                <button class="btn btn-sm btn-outline-dark ms-1"><i class="fa fa-tag"></i> FGO</button>
                <button class="btn btn-sm btn-outline-dark ms-1"><i class="fa fa-tag"></i> Fate</button>
                <button class="btn btn-sm btn-outline-dark ms-1"><i class="fa fa-tag"></i> Craft Essence</button>
              </div>
            </div>
          </div>
        </div>
        <!-- BLOG CARD -->
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
  name: 'Blogs',
  components: {
    Sidebar, Offcanvas
  }
}
</script>