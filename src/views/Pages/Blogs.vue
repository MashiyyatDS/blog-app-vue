<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12">
        <nav class="navbar navbar navbar-dark bg-dark mb-3 sticky-top">
          <div class="container-fluid p-1">
            <p class="navbar-title"><a class="navbar-brand" href="#"><i class="fa fa-book"></i> BLOGS</a></p>
            <button class="btn btn-outline-primary d-block d-lg-none d-sm-block d-xs-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
              <i class="fa fa-bars"></i>
            </button>
          </div>
        </nav>

        <ul class="list-group p-1">
          <li class="list-group-item" v-for="blog in getBlogs" :key="blog.id" data-aos="fade-in">
            <div class="row blog">
              <div class="col-md-6">
                <div class="blog-image-container p-2">
                  <img v-bind:src="blog.image" alt="">
                </div>
              </div>
              <div class="col-md-6">
                <ul class="list-group">
                  <li class="list-group-item blog-content-container">
                    <h3>{{ blog.title }}</h3>
                    <small class="text-muted">Posted at {{ blog.created_at }}</small>
                  </li>
                  <li class="list-group-item blog-content-container">
                    <small class="text-muted">Author: <span class="fw-bolder">{{ blog.user.firstname + " " + blog.user.lastname }}</span></small>
                  </li>
                  <li class="list-group-item">
                    <button class="btn btn-sm btn-outline-dark ms-1 mb-1 disabled" v-for="tag in blog.tags" :key="tag.id">
                      {{ tag.tag }}
                    </button>
                  </li>
                  <li class="list-group-item">
                    <div class="d-grid">
                      <router-link :to=" '/blogs/' + blog.slug " class="btn btn-sm btn-primary">View blog</router-link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="list-group-item pagination-container d-flex justify-content-center mb-3">
            <Pagination 
              v-bind:linkData="getBlogLinks"
              v-on:emitLink="fetchBlogs"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Partials/Sidebar'
import Offcanvas from '@/components/Partials/Offcanvas'
import Pagination from '@/components/Admin/Pagination'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Blogs',
  components: {
    Sidebar, Offcanvas, Pagination
  },
  data() {
    return {
      url: '/api/blogs/paginate=5/category=blog'
    }
  },
  computed: {
    ...mapGetters(['getBlogs', 'getBlogLinks'])
  },
  methods: {
    ...mapActions(['fetchBlogs'])
  },
  created() {
    this.fetchBlogs(this.url)
  }
}
</script>