<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12 mt-2">
        <nav class="navbar d-flex justify-content-in-between p-1">
          <h5><i class="fa fa-chevron-right"></i> Admin panel</h5>
          <button class="btn btn-sm btn-outline-secondary d-lg-none d-sm-block d-xs-block ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
            <i class="fa fa-bars"></i>
          </button>
        </nav>
        <!-- NAVBAR HERE -->
        <div class="m-1">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <button class="nav-link active" aria-current="page"><i class="fa fa-list"></i> Blogs</button>
            </li>
            <li class="nav-item">
              <router-link to="/admin/add-blog" class="nav-link">
                <i class="fa fa-plus"></i> Add blog
              </router-link>
            </li>
          </ul>
        </div>

        <div class="m-1">
          <li class="row d-flex justify-content-between">
            <div class="col-md-6">
              <form action="">
                <small class="text-muted">Search:</small>
                <input type="text" class="form-control" placeholder="Search here...">
              </form>
            </div>
            <div class="col-md-6">
              <small class="text-muted">Filter:</small>
              <div class="input-group ps-1">
                <select class="form-select" @change="filterBlogs" v-model="category">
                  <option value="all">All</option>
                  <option value="artwork">Artwork</option>
                  <option value="blog">Blog</option>
                </select>
              </div>
            </div>
          </li>
        </div>

        <div class="m-1">
          <BlogItem />
        </div>
        <div class="m-1 d-flex justify-content-center">
          <Pagination 
            v-bind:linkData="getBlogLinks"
            v-on:emitLink="fetchBlogs"/>
        </div>
        <BlogUpdateForm/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Admin/Sidebar'
import Offcanvas from '@/components/Admin/Offcanvas'
import BlogUpdateForm from '@/components/Admin/BlogUpdateForm'
import BlogItem from '@/components/Admin/BlogItem'
import Pagination from '@/components/Admin/Pagination'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AdminBlogs',
  components: {
    Sidebar, 
    Offcanvas, 
    Pagination, 
    BlogUpdateForm,
    BlogItem
  },
  data() {
    return {
      url: '/api/blogs/paginate=15/category=all',
      category: 'all'
    }
  },
  computed: {
    ...mapGetters([
      'getBlogs', 
      'getBlogLinks'])
  },
  methods: {
    ...mapActions([
      'fetchBlogs', 
      'findBlog', 
      'deleteBlog']),

    filterBlogs() {
      this.fetchBlogs(`/api/blogs/paginate=10/category=${this.category}`)
    }
  },
  created() {
    this.fetchBlogs(this.url)
  }
}
</script>

<style scoped>
  .table-container {
    padding: 0px;
    text-align: center;
  }
  .table {
    margin-bottom: 0px;
  }
</style>