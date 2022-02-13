<template>
  <div class="row">
    <div class="col-md-12">
      <Navbar />
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <Navtabs 
            v-bind:tab="'projects'"/>
        </div>
      </div>

      <div class="row m-1">
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
  <Footer />
</template>

<script>
import Navbar from '@/components/Partials/Navbar'
import Navtabs from '@/components/Partials/Navtabs'
import Pagination from '@/components/Admin/Pagination'
import ProjectItem from '@/components/Partials/ProjectItem'
import Footer from '@/components/Partials/Footer'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Projects',
  components: {
    Navbar,
    Navtabs,
    Pagination, 
    ProjectItem,
    Footer
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
