<template>
  <div class="col-md-6 offset-md-3 mb-3" v-for="project in projects" :key="project.slug">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-center bg-dark">
          <h5 class="card-title p-2">
            <router-link :to="'/projects/' + project.slug" class="text-white">
              <i class="fa fa-chevron-right"></i> {{ project.title }}
            </router-link>
          </h5>
        </div>
        <div class="project-image-container">
          <img :src="project.image" alt="">
        </div>
        <div class="project-tags-container">
          <button class="btn btn-sm btn-outline-dark disabled m-1" v-for="tag in project.tags" :key="tag.slug">
            {{ tag.tag }}
          </button>
        </div>
        <div class="project-details-container mb-3">
          <small class="text-muted fw-bolder m-1">Author: {{ project.user.firstname }} {{ project.user.lastname }}</small><br>
          <small class="text-muted m-1">Posted at {{ project.created_at }}</small>
        </div>
        <div class="row">
          <div class="col-6 p-1">
            <div class="d-grid">
              <a :href="project.link" class="btn btn-sm btn-primary" target="_blank">
                <i class="fa fa-globe"></i> Demo 
              </a>
            </div>
          </div>
          <div class="col-6 p-1">
            <div class="d-grid">
              <a :href="project.repository" class="btn btn-sm btn-dark" target="_blank">
                <i class="fa fa-github"></i> Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectItem',
  props: ['projects']
}
</script>

<style scoped>
  .card-body {
    padding: 0px;
  }
  .card-title a {
    text-decoration: none;
  }
</style>