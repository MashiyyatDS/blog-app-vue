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

        <div class="row blog" v-for="blog in getBlogs" :key="blog.id">
          <div class="col-md-6">
            <div class="blog-image-container p-2">
              <img v-bind:src="blog.image" alt="">
            </div>
          </div>
          <div class="col-md-6">
            <div class="blog-content-container p-2">
              <h3>{{ blog.title }}</h3>
              <small class="text-muted">{{ blog.created_at }}</small>
              <p>{{ blog.content }}</p>
              <div class="blog-tags-container">
                <button class="btn btn-sm btn-outline-dark ms-1 mb-1" v-for="tag in blog.tags" :key="tag.id">
                  <i class="fa fa-tag"></i> {{ tag.tag }}
                </button>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Blogs',
  components: {
    Sidebar, Offcanvas
  },
  computed: {
    ...mapGetters(['getBlogs'])
  },
  methods: {
    ...mapActions(['fetchBlogs'])
  },
  created() {
    this.fetchBlogs()
  }
}
</script>