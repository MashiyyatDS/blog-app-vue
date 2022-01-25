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

        <div class="row">
          <BlogItem 
            v-bind:blogs="getBlogs"/>
        </div>
        <div class="d-flex justify-content-center">
          <Pagination 
            v-bind:linkData="getBlogLinks"
            v-on:emitLink="fetchBlogs"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Partials/Sidebar'
import Offcanvas from '@/components/Partials/Offcanvas'
import Pagination from '@/components/Admin/Pagination'
import BlogItem from '@/components/Partials/BlogItem'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Blogs',
  components: {
    Sidebar, Offcanvas, Pagination, BlogItem
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