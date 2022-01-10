<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12 mt-2 p-1">
        <nav class="navbar d-flex justify-content-in-between p-1">
          <h3>Projects</h3>
          <button class="btn-sm btn btn-outline-primary d-lg-none d-sm-block d-xs-block ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
            <i class="fa fa-bars"></i>
          </button>
        </nav>
        <!-- NAVBAR HERE -->
        <div class="search-project-container mb-1">
          <form class="d-flex" @submit.prevent="submitSearch"> 
            <input type="text" class="form-control" placeholder="Search Project" v-model="search">
            <button type="submit" class="btn btn-outline-primary ms-1"><i class="fa fa-search"></i></button>
          </form>
        </div>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between">
            <a href="/admin/add-project" class="btn btn-sm btn-outline-success ms-1"><i class="fa fa-plus"></i> Add Project</a>
          </li>
          <li class="list-group-item table-container">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Date posted</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="project in getProjects" :key="project.id">
                  <td>{{ project.title }}</td>
                  <td>{{ project.created_at }}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-success ms-1" 
                      @click="findProject(project.id)" 
                      data-bs-toggle="modal" 
                      data-bs-target="#projectUpdateForm">
                      <i class="fa fa-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger ms-1" @click="deleteProject(project.id)">
                      <i class="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
          <li class="list-group-item d-flex justify-content-center">
            <Pagination 
              v-bind:linkData="getProjectLinks"
              v-on:emitLink="fetchProjects"/>
          </li>
        </ul>
      </div>
      <ProjectUpdateForm />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Admin/Sidebar'
import Offcanvas from '@/components/Admin/Offcanvas'
import Pagination from '@/components/Admin/Pagination'
import ProjectUpdateForm from '@/components/Admin/ProjectUpdateForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdminProjects',
  components: {
    Sidebar, Offcanvas, Pagination, ProjectUpdateForm
  },
  data() {
    return {
      url: 'api/projects/limit/5',
      search: ""
    }
  },
  computed: {
    ...mapGetters(['getProjects', 'getProject', 'getProjectLinks'])
  },
  methods: {
    ...mapActions(['fetchProjects', 'findProject', 'deleteProject', 'searchProject']), 

    handleFile(e) {
      e.target.files[0]
    },

    submitSearch() {
      this.searchProject(this.search)
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