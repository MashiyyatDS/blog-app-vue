<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12 mt-2">
        <nav class="navbar d-flex justify-content-in-between p-1">
          <h3>Dashboard</h3>
          <button class="btn-sm btn btn-outline-primary d-lg-none d-sm-block d-xs-block ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
            <i class="fa fa-bars"></i>
          </button>
        </nav>
        <!-- NAVBAR HERE -->
        <div class="row">
          <div class="col-md-4 p-1">
            <div class="card">
              <div class="card-body">
                <h3>Blogs</h3>
                This is some text within a card body.
              </div>
            </div>
          </div>
          <div class="col-md-4 p-1">
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>
          </div>
          <div class="col-md-4 p-1">
            <div class="card">
              <div class="card-body">
                This is some text within a card body.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Admin/Sidebar'
import Offcanvas from '@/components/Admin/Offcanvas'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    Sidebar, Offcanvas
  },
  data() {
    return {
      blogUrl: '/api/blogs/paginate=10/category=blog'
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    ...mapActions(['getCurrentUser', 'fetchBlogs', 'fetchProjects'])
  },
  created() {
    this.getCurrentUser()
    this.fetchBlogs(this.blogUrl)
  }
}
</script>