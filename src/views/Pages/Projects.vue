<template>
  <div>
    <Offcanvas/>
    <div class="row">
      <div class="col-lg-3">
        <Sidebar/>
      </div>
      <div class="col-lg-9 col-md-12">
        <nav class="navbar navbar navbar-dark bg-dark mb-3 sticky-top" style="margin: 2px;border-radius: 5px;">
          <div class="container-fluid p-1">
            <p class="navbar-title"><a class="navbar-brand" href="#"><i class="fa fa-folder"></i> PROJECTS</a></p>
            <button class="btn btn-outline-primary d-block d-lg-none d-sm-block d-xs-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
              <i class="fa fa-bars"></i>
            </button>
          </div>
        </nav>

        <!-- PROJECT ITEM -->
        <div class="row mb-3" v-for="project in getProjects" :key="project.id">
          <div class="col-md-6 p-1">
            <div class="project-image-container">
              <img v-bind:src="project.image" alt="">
            </div>
          </div>
          <div class="col-md-6 p-1">
            <div class="project-content-container">
              <h3><i class="fa fa-folder"></i> {{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-tags-container">
                <span class="badge bg-primary ms-1" v-for="tag in project.tags" :key="tag.id">
                  {{ tag.tag }}
                </span>
              </div>
              <hr>
              <div class="d-flex">
                <div class="d-grid col-6 p-1">
                  <a v-bind:href="project.link" class="btn btn-sm btn-outline-dark">Demo</a>
                </div>
                <div class="d-grid col-6 p-1">
                  <a v-bind:href="project.repository" class="btn btn-sm btn-outline-dark">Code</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="pagination-container d-flex justify-content-center mb-3">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#"><i class="fa fa-chevron-left"></i></a></li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#"><i class="fa fa-chevron-right"></i></a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Partials/Sidebar'
import Offcanvas from '@/components/Partials/Offcanvas'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Projects',
  components: {
    Sidebar, Offcanvas
  },
  computed: {
    ...mapGetters(['getProjects'])
  },
  methods: {
    ...mapActions(['fetchProjects'])
  },
  created() {
    this.fetchProjects()
  }
}
</script>