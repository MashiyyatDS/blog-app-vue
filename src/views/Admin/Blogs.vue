<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12 mt-2">
        <nav class="navbar d-flex justify-content-in-between p-1">
          <h3>Blogs</h3>
          <button class="btn-sm btn btn-outline-primary d-lg-none d-sm-block d-xs-block ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
            <i class="fa fa-bars"></i>
          </button>
        </nav>
        <!-- NAVBAR HERE -->
        <router-link to="/admin/add-blog" class="btn btn-sm btn-outline-success ms-1">
          <i class="fa fa-plus"></i> Add blog
        </router-link>
        <div class="p-3">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Date posted</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="blog in getBlogs" :key="blog.id">
                <td>{{ blog.title }}</td>
                <td>{{ blog.created_at }}</td>
                <td>
                  <button class="btn btn-sm btn-outline-success ms-1">
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger ms-1">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Admin/Sidebar'
import Offcanvas from '@/components/Admin/Offcanvas'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AdminBlogs',
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