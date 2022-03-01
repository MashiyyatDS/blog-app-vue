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
        <div class="col-md-6 offset-md-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-center bg-dark">
                <h5 class="card-title p-2 text-white">
                  <i class="fa fa-chevron-right"></i> {{ getProject.title }}
                </h5>
              </div>
              <div class="project-image-container">
                <div :id="getProject.slug" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item"
                      v-for="(image, index) in getProject.images" 
                      :key="image.id"
                      :class="{ 'active' : index == 0 }">
                      <img :src="image.image" class="d-block w-100" alt="...">
                    </div>
                  </div>
                  <button class="carousel-control-prev" type="button" :data-bs-target="'#'+getProject.slug" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" :data-bs-target="'#'+getProject.slug" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div class="project-tags-container">
                <button class="btn btn-sm btn-outline-dark disabled m-1" v-for="tag in getProject.tags" :key="tag.slug">
                  {{ tag.tag }}
                </button>
              </div>
              <div class="project-description-container p-2">
                <small class="text-muted">
                  {{ getProject.description }}
                </small>
              </div>
              <div class="row">
                <div class="col-6 p-1">
                  <div class="d-grid">
                    <a :href="getProject.link" class="btn btn-sm btn-primary" target="_blank">
                      <i class="fa fa-globe"></i> Demo 
                    </a>
                  </div>
                </div>
                <div class="col-6 p-1">
                  <div class="d-grid">
                    <a :href="getProject.repository" class="btn btn-sm btn-dark" target="_blank">
                      <i class="fa fa-github"></i> Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Partials/Navbar'
import Navtabs from '@/components/Partials/Navtabs'
import Footer from '@/components/Partials/Footer'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ViewProject',
  components: {
    Navbar,
    Navtabs,
    Footer
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
  .project-description-container {
    text-align: justify;
  }
</style>