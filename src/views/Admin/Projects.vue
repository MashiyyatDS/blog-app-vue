<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12 mt-2">
        <nav class="navbar d-flex justify-content-in-between p-1">
          <h3>Projects</h3>
          <button class="btn-sm btn btn-outline-primary d-lg-none d-sm-block d-xs-block ms-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
            <i class="fa fa-bars"></i>
          </button>
        </nav>
        <!-- NAVBAR HERE -->
        <ul class="list-group">
          <li class="list-group-item">
            <router-link to="/admin/add-project" class="btn btn-sm btn-outline-success ms-1">
              <i class="fa fa-plus"></i> Add Project
            </router-link>
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
                    <button class="btn btn-sm btn-outline-danger ms-1">
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
      <!-- =============== PROJECT EDIT FORM  ===============-->
      <div class="modal fade" id="projectUpdateForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen-xxl-down">
          <form @submit.prevent="submitEditForm">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <ul class="list-group">
                  <li class="list-group-item">
                    <div class="mb-3">
                      <label class="form-label">Project title: </label>
                      <input type="text" class="form-control" v-model="getProject.title"
                      placeholder="Enter project title...">
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="mb-3">
                      <label class="form-label">Project description: </label>
                      <textarea cols="30" rows="8" class="form-control" 
                      placeholder="Enter project description..." v-model="getProject.description"></textarea>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="row">
                      <div class="col-6 p-1">
                        <label class="form-label">Demo link: </label>
                        <input type="text" class="form-control" 
                        placeholder="Enter project title..."
                         v-model="getProject.link">
                      </div>
                      <div class="col-6 p-1">
                        <label class="form-label">Repository: </label>
                        <input type="text" class="form-control" 
                        placeholder="Enter project title..."
                         v-model="getProject.repository">
                      </div>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="mb-3 p-1">
                      <label for="formFile" class="form-label">Project image: </label>
                      <input class="form-control" type="file" @change="handleFile">
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="chip-container">
                      <div class="chip" v-for="(chip, i) of chips" :key="chip.label">
                        {{chip}}
                        <i class="fa fa-times" @click="deleteChip(i)"></i>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Tags: </label>
                      <input v-model="currentChip" @keypress.prevent.enter="saveChip" class="form-control" placeholder="Enter project tags">
                    </div>
                  </li>
                </ul>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- =============== PROJECT EDIT FORM  ===============-->
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Admin/Sidebar'
import Offcanvas from '@/components/Admin/Offcanvas'
import Pagination from '@/components/Admin/Pagination'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdminProjects',
  components: {
    Sidebar, Offcanvas, Pagination
  },
  data() {
    return {
      chips: [],
      currentChip: '',
      url: 'api/projects/limit/5'
    }
  },
  computed: {
    ...mapGetters(['getProjects', 'getProject', 'getProjectLinks'])
  },
  methods: {
    ...mapActions(['fetchProjects', 'findProject', 'updateProject']), 

    handleFile(e) {
      e.target.files[0]
    },

    submitEditForm() {
      const payload = {
        id: this.getProject.id,
        project: this.getProject
      }
      this.updateProject(payload)
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