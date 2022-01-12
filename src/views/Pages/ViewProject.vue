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
            <p class="navbar-title"><a class="navbar-brand" href="#"><i class="fa fa-folder"></i> Project</a></p>
            <button class="btn btn-outline-primary d-block d-lg-none d-sm-block d-xs-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
              <i class="fa fa-bars"></i>
            </button>
          </div>
        </nav>

        <ul class="list-group mb-3">
          <li class="list-group-item" style="padding: 0px">
            <div class="art-image-container">
              <img v-bind:src="getProject.image" alt="">
            </div>
          </li>
          <li class="list-group-item project-content-container">
            <h3>{{ getProject.title }}</h3>
            <small class="text-muted">{{ getProject.created_at }}</small>
          </li>
          <li class="list-group-item project-content-container">
            <p>{{ getProject.description }}</p>
          </li>
          <li class="list-group-item">
            <div class="artwork-tags-container">
              <button class="btn btn-sm btn-outline-dark m-1" v-for="tag in getProject.tags" :key="tag.id">{{ tag.tag }}</button>
            </div>
          </li>
          <li class="list-group-item">
            <div class="d-flex">
              <div class="d-grid col-6 p-1">
                <a v-bind:href="getProject.link" class="btn btn-sm btn-primary">Demo</a>
              </div>
              <div class="d-grid col-6 p-1">
                <a v-bind:href="getProject.repository" class="btn btn-sm btn-dark">Code</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Partials/Sidebar'
import Offcanvas from '@/components/Partials/Offcanvas'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ViewProject',
  components: {
    Sidebar, Offcanvas
  },
  computed: {
    ...mapGetters(['getProject'])
  },
  methods: {
    ...mapActions(['viewProject'])
  },
  created() {
    this.viewProject(this.$route.params.slug)
  }
}
</script>

<style scoped>
  .art-image-container img {
    border-radius: 0px;
  }
</style>