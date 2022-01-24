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
            <p class="navbar-title"><a class="navbar-brand" href="#"><i class="fa fa-folder"></i> {{ getBlog.title }}</a></p>
            <button class="btn btn-outline-primary d-block d-lg-none d-sm-block d-xs-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
              <i class="fa fa-bars"></i>
            </button>
          </div>
        </nav>

        <ul class="list-group mb-3">
          <li class="list-group-item" style="padding: 0px">
            <div class="art-image-container">
              <img v-bind:src="getBlog.image" alt="">
            </div>
          </li>
          <li class="list-group-item project-content-container">
            <h3>{{ getBlog.title }}</h3>
            <small class="text-muted">Posted at {{ getBlog.created_at }}</small>
          </li>
          <li class="list-group-item project-content-container">
            <p>{{ getBlog.content }}</p>
          </li>
          <li class="list-group-item">
            <div class="artwork-tags-container">
              <button class="btn btn-sm btn-outline-dark m-1 disabled" v-for="tag in getBlog.tags" :key="tag.id">{{ tag.tag }}</button>
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
  name: 'ViewBlog',
  components: {
    Sidebar, Offcanvas
  },
  data() {
    return {
      err: null,
      blog: null
    }
  },
  computed: {
    ...mapGetters(['getBlog'])
  },
  methods: {
    ...mapActions(['viewBlog'])
  },
  created() {
    this.viewBlog(this.$route.params.slug)
  }
}
</script>

<style scoped>
  .art-image-container img {
    border-radius: 0px;
  }
</style>