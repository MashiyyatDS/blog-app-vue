<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12 mt-2 p-2">
        <nav class="navbar d-flex justify-content-in-between p-1">
          <h3>Blogs / Artworks</h3>
          <button class="btn-sm btn btn-outline-primary d-lg-none d-sm-block d-xs-block ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
            <i class="fa fa-bars"></i>
          </button>
        </nav>
        <!-- NAVBAR HERE -->
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between">
            <div class="col-8 p-1">
              <form action="">
                <label>Search:</label>
                <input type="text" class="form-control" placeholder="Search here...">
              </form>
            </div>
            <div class="col-4 p-1">
              <label>Filter:</label>
              <div class="input-group">
                <select class="form-select" @change="filterBlogs" v-model="category">
                  <option value="all">All</option>
                  <option value="artwork">Artwork</option>
                  <option value="blog">Blog</option>
                </select>
              </div>
            </div>
          </li>
          <li class="list-group-item">
            <a href="/admin/add-blog" class="btn btn-sm btn-outline-primary ms-1">
              <i class="fa fa-plus"></i> Add Blog / Artwork
            </a>
          </li>
          <li class="list-group-item table-container">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Date posted</th>
                  <th scope="col">Set NSFW content</th>
                  <th scope="col">Category</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="blog in getBlogs" :key="blog.id" :class="{ 'table-danger' : blog.isNsfw == true }">
                  <td>{{ blog.title }}</td>
                  <td>{{ blog.created_at }}</td>
                  <td>
                    <div class="form-check form-switch d-flex justify-content-center">
                      <input v-if="blog.isNsfw" class="form-check-input" type="checkbox" role="switch" checked>
                      <input v-else class="form-check-input" type="checkbox" role="switch">
                    </div>
                  </td>
                  <td>{{ blog.category }}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-success ms-1" 
                      data-bs-toggle="modal" 
                      data-bs-target="#blogUpdateForm"
                      @click="findBlog(blog.id)">
                      <i class="fa fa-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger ms-1"
                      @click="deleteBlog(blog.id)">
                      <i class="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
          <li class="list-group-item d-flex justify-content-center">
            <Pagination 
              v-bind:linkData="getBlogLinks"
              v-on:emitLink="fetchBlogs"/>
          </li>
        </ul>
        <BlogUpdateForm/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Admin/Sidebar'
import Offcanvas from '@/components/Admin/Offcanvas'
import BlogUpdateForm from '@/components/Admin/BlogUpdateForm'
import Pagination from '@/components/Admin/Pagination'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AdminBlogs',
  components: {
    Sidebar, Offcanvas, Pagination, BlogUpdateForm
  },
  data() {
    return {
      url: '/api/blogs/paginate=10/category=all',
      category: ''
    }
  },
  computed: {
    ...mapGetters(['getBlogs', 'getBlogLinks'])
  },
  methods: {
    ...mapActions(['fetchBlogs', 'findBlog', 'deleteBlog']),

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