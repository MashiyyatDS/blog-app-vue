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

        <ul class="list-group">
          <li class="list-group-item preloaders" v-if="isLoading">
            <p class="card-text placeholder-glow">
              <span class="placeholder col-7"></span>
              <span class="placeholder col-7"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-6"></span>
              <span class="placeholder col-8"></span>
            </p>
            <hr>
            <p class="card-text placeholder-glow">
              <span class="placeholder col-7"></span>
              <span class="placeholder col-7"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-6"></span>
              <span class="placeholder col-8"></span>
            </p>
            <hr>
            <p class="card-text placeholder-glow">
              <span class="placeholder col-7"></span>
              <span class="placeholder col-7"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-6"></span>
              <span class="placeholder col-8"></span>
            </p>
            <hr>
            <p class="card-text placeholder-glow">
              <span class="placeholder col-7"></span>
              <span class="placeholder col-7"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-4"></span>
              <span class="placeholder col-6"></span>
              <span class="placeholder col-8"></span>
            </p>
          </li>
          <li class="list-group-item" 
            v-for="project in getProjects" 
            :key="project.id"
            data-aos="fade-in">
            <div class="row mb-3">
              <div class="col-md-6 p-1">
                <div class="project-image-container">
                  <img v-bind:src="project.image" alt="">
                </div>
              </div>
              <div class="col-md-6 p-1">
                <ul class="list-group">
                  <li class="list-group-item project-content-container">
                    <h3>
                      <router-link :to="`/projects/${project.slug}`">
                        <i class="fa fa-chevron-right"></i> {{ project.title }}
                      </router-link>  
                    </h3>
                    <small class="text-muted">Posted at {{ project.created_at }}</small>
                  </li>
                  <li class="list-group-item">
                    <small class="text-muted">Author: {{ project.user.firstname + " " + project.user.lastname }}</small>
                  </li>
                  <li class="list-group-item">
                    <div class="project-tags-container">
                      <button class="btn btn-sm btn-outline-dark" v-for="tag in project.tags" :key="tag.id">
                        {{ tag.tag }}
                      </button>
                    </div>
                  </li>
                  <li class="list-group-item">
                    <div class="d-flex">
                      <div class="d-grid col-6 p-1">
                        <a v-bind:href="project.link" class="btn btn-sm btn-primary">Demo</a>
                      </div>
                      <div class="d-grid col-6 p-1">
                        <a v-bind:href="project.repository" class="btn btn-sm btn-dark">Code</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="list-group-item pagination-container d-flex justify-content-center mb-3" v-if="!isLoading">
            <Pagination 
              v-bind:linkData="getProjectLinks"
              v-on:emitLink="fetchProjects"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Partials/Sidebar'
import Offcanvas from '@/components/Partials/Offcanvas'
import Pagination from '@/components/Admin/Pagination'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Projects',
  components: {
    Sidebar, Offcanvas, Pagination
  },
  computed: {
    ...mapGetters(['getProjects', 'getProjectLinks', 'isLoading'])
  },
  methods: {
    ...mapActions(['fetchProjects'])
  },
  created() {
    this.fetchProjects('api/projects/limit/5')
  }
}
</script>

<style scoped>
  .project-content-container a{
    text-decoration: none;
    color: rgb(63, 63, 63);
    font-size: 19px;
  }
  .accordion-item {
    border-radius: 0px!important;
  }
  .project-tags-container button {
    font-size: 13px;
    margin: 1.5px;
  }
</style>