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
            <p class="navbar-title"><a class="navbar-brand" href="#"><i class="fa fa-folder"></i> PROJECTS</a></p>
            <button class="btn btn-outline-primary d-block d-lg-none d-sm-block d-xs-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
              <i class="fa fa-bars"></i>
            </button>
          </div>
        </nav>

        <div class="row">
          <ProjectItem 
            v-bind:projects="getProjects"/>
        </div>
        <div class="d-flex justify-content-center mt-3">
          <Pagination 
            v-bind:linkData="getProjectLinks"
            v-on:emitLink="fetchProjects"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Partials/Sidebar'
import Offcanvas from '@/components/Partials/Offcanvas'
import Pagination from '@/components/Admin/Pagination'
import ProjectItem from '@/components/Partials/ProjectItem'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Projects',
  components: {
    Sidebar, Offcanvas, Pagination, ProjectItem
  },
  computed: {
    ...mapGetters(['getProjects', 'getProjectLinks'])
  },
  methods: {
    ...mapActions(['fetchProjects', 'getCurrentUser'])
  },
  created() {
    this.fetchProjects('api/projects/limit/5')
  }
}
</script>
