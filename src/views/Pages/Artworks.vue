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
            <p class="navbar-title"><a class="navbar-brand" href="#"><i class="fa fa-image"></i> ARTWORKS</a></p>
            <button class="btn btn-outline-primary d-block d-lg-none d-sm-block d-xs-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
              <i class="fa fa-bars"></i>
            </button>
          </div>
        </nav>

        <div class="row">
          <ul class="list-group mb-1 artwork" v-for="artwork in getArtworks" :key="artwork.id" data-aos="fade-in">
            <router-link :to="'/artworks/' + artwork.slug">
              <li class="list-group-item artwork-content-container d-flex justify-content-center">
                <h3>{{ artwork.title }}</h3>
              </li>
              <li class="list-group-item">
                <div class="col-lg-6 offset-lg-3">
                  <div class="artwork-image-container">
                    <img v-bind:src="artwork.image" alt="">
                  </div>
                </div>
              </li>
            </router-link>
          </ul>
        </div>
        <!-- BLOG CARD -->
        <div class="d-flex justify-content-center mb-3 mt-3">
          <Pagination 
            v-bind:linkData="getArtworkLinks"
            v-on:emitLink="fetchArtworks"/>
        </div>
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
  name: 'Artworks',
  components: {
    Sidebar, Offcanvas, Pagination
  },
  data() {
    return {
      url: '/api/blogs/paginate=8/category=artwork'
    }
  },
  methods: {
    ...mapActions(['fetchArtworks', 'getCurrentUser'])
  },
  computed: {
    ...mapGetters(['getArtworks', 'getArtworkLinks'])
  },
  created() {
    this.fetchArtworks(this.url)
  }
}
</script>

<style scoped>
.artwork-content-container {
  font-family: 'Lexend';
  font-size: 25px;
}
.artwork a{
  text-decoration: none!important;
}
</style>