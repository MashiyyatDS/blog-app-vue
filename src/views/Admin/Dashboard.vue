<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12 mt-2">
        <nav class="navbar d-flex justify-in-between p-2">
          <h5><i class="fa fa-chevron-right"></i> Admin panel</h5>
          <button class="btn btn-sm btn-outline-secondary d-lg-none d-sm-block d-xs-block ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
            <i class="fa fa-bars"></i>
          </button>
        </nav>
        
        <div class="p-5 mb-4 text-white bg-dark rounded-3 m-1">
          <div class="container-fluid p-1">
            <h1 class="display-5 fw-bold">Dashboard</h1><hr>
            <router-link to="/admin/account-settings" class="btn btn-primary btn-outlined-primary" type="button">
              Account settings
            </router-link>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 p-1">
            <router-link to="/admin/blogs" class="dashboard-blog-card">
              <div class="card text-white bg-dark p-3">
                <div class="card-body">
                  <h3 class="mb-3"><i class="fa fa-book"></i> {{ dashboard.blogs }} Blogs</h3>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-md-4 p-1">
            <router-link to="/admin/blogs" class="dashboard-blog-card">
              <div class="card text-white bg-dark p-3">
                <div class="card-body">
                  <h3 class="mb-3"><i class="fa fa-image"></i> {{ dashboard.artworks }} Artworks</h3>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-md-4 p-1">
            <router-link to="/admin/projects" class="dashboard-blog-card">
              <div class="card text-white bg-dark p-3">
                <div class="card-body">
                  <h3 class="mb-3"><i class="fa fa-folder"></i> {{ dashboard.projects }} Projects</h3>
                </div>
              </div>
            </router-link>
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
    ...mapActions(['fetchDashboard'])
  },
  created() {
    this.fetchDashboard()
  }
}
</script>

<style scoped>
  .dashboard-blog-card {
    text-decoration: none;
    color: rgb(71, 71, 71);
    text-align: center;
  }
</style>