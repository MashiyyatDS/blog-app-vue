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
                <h3 class="mb-3">{{ dashboard.blogs }} Blogs</h3>
                <div class="d-grid">
                  <router-link to="/admin/blogs" class="btn btn-outline-primary btn-sm">View blogs</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 p-1">
            <div class="card">
              <div class="card-body">
                <h3 class="mb-3">{{ dashboard.artworks }} Artworks</h3>
                <div class="d-grid">
                  <router-link to="/admin/blogs" class="btn btn-outline-primary btn-sm">View artworks</router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 p-1">
            <div class="card">
              <div class="card-body">
                <h3 class="mb-3">{{ dashboard.projects }} Projects</h3>
                <div class="d-grid">
                  <router-link to="/admin/projects" class="btn btn-outline-primary btn-sm">View projects</router-link>
                </div>
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
  computed: {
    ...mapGetters(['currentUser', 'dashboard'])
  },
  methods: {
    ...mapActions(['getCurrentUser', 'fetchDashboard'])
  },
  created() {
    this.getCurrentUser()
    this.fetchDashboard()
  }
}
</script>