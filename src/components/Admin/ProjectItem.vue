<template>
  <div 
    class="card-item mb-1"
    v-for="project in getProjects" :key="project.slug">
    <div class="card">
      <div class="card-body">
        <div class="dropdown position-absolute top-0 end-0">
          <button 
            class="btn btn-sm text-dark" type="button" 
            id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-bars text-muted"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button 
                class="dropdown-item" 
                @click="findProject(project.id)" 
                data-bs-toggle="modal" 
                data-bs-target="#projectUpdateForm">
                Edit
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                @click="deleteProject(project.id)">
                Delete
              </button>
            </li>
          </ul>
        </div>
        <div class="row p-2">
          <div class="col-md-6">
            <small class="text-muted fw-bolder">
              <i class="fa fa-chevron-right"></i> {{ project.title }}
            </small><br>
            <small class="text-muted">{{ project.created_at }}</small>
          </div>
          <div class="col-md-6">
            <a :href="project.link" class="btn btn-sm btn-outline-secondary">
              <i class="fa fa-link"></i> Demo
            </a>
            <a :href="project.repository" class="btn btn-sm btn-outline-secondary ms-1">
              <i class="fa fa-github"></i> Code
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProjectItem',
  computed: {
    ...mapGetters(['getProjects'])
  },
  methods: {
    ...mapActions([
      'deleteProject',
      'findProject'
    ])
  }
}
</script>