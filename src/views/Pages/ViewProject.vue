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
              <p v-html="getProject.description"></p>
            </li>
            <li class="list-group-item">
              <div class="artwork-tags-container">
                <button class="btn btn-sm btn-outline-dark m-1 disabled" v-for="tag in getProject.tags" :key="tag.id">{{ tag.tag }}</button>
              </div>
            </li>
            <li class="list-group-item">
              <div class="d-flex">
                <div class="d-grid col-6 p-1">
                  <a :href="getProject.link" class="btn btn-sm btn-primary" target="_blank">Demo</a>
                </div>
                <div class="d-grid col-6 p-1">
                  <a v-bind:href="getProject.repository" class="btn btn-sm btn-dark" target="_blank">Code</a>
                </div>
              </div>
            </li>
          </ul>
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
  .art-image-container img {
    border-radius: 0px;
  }
</style>