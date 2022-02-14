<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12 mt-2">
        <nav class="navbar d-flex justify-content-in-between p-1">
          <h5><i class="fa fa-chevron-right"></i> Admin Panel</h5>
          <button class="btn btn-sm btn-outline-secondary d-lg-none d-sm-block d-xs-block ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
            <i class="fa fa-bars"></i>
          </button>
        </nav>

        <div class="m-1">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <button class="nav-link active" aria-current="page"><i class="fa fa-list"></i> Projects</button>
            </li>
            <li class="nav-item">
              <router-link to="/admin/add-project" class="nav-link">
                <i class="fa fa-plus"></i> Add project
              </router-link>
            </li>
          </ul>
        </div>
        
        <div class="search-project-container m-1">
          <form class="d-flex" @submit.prevent="submitSearch"> 
            <button 
              type="button" class="btn btn-outline-secondary"
              @click="fetchProjects(url)">
              <i class="fa fa-refresh"></i>
            </button>
            <input type="text" class="form-control ms-1" placeholder="Search Project" v-model="search">
            <button type="submit" class="btn btn-outline-secondary ms-1"><i class="fa fa-search"></i></button>
          </form>
        </div>

        <div class="m-1">
          <ProjectItem />
        </div>

        <div class="m-1 d-flex justify-content-center">
          <Pagination 
            v-bind:linkData="getProjectLinks"
            v-on:emitLink="fetchProjects"/>
        </div>
      </div>
      <ProjectUpdateForm />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Admin/Sidebar'
import ProjectItem from '@/components/Admin/ProjectItem'
import Offcanvas from '@/components/Admin/Offcanvas'
import Pagination from '@/components/Admin/Pagination'
import ProjectUpdateForm from '@/components/Admin/ProjectUpdateForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdminProjects',
  components: {
    Sidebar, 
    Offcanvas, 
    Pagination, 
    ProjectUpdateForm,
    ProjectItem
  },
  data() {
    return {
      url: 'api/projects/limit/10',
      search: ""
    }
  },
  computed: {
    ...mapGetters([
      'getProject', 
      'getProjectLinks'])
  },
  methods: {
    ...mapActions([
      'fetchProjects', 
      'searchProject']), 

    handleFile(e) {
      e.target.files[0]
    },

    submitSearch() {
      if(!this.search == "") {
        this.searchProject(this.search)
      }
    }
  },
  created() {
    this.fetchProjects(this.url)
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