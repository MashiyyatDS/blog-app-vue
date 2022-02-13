<template>
  <div class="row">
    <div class="col-md-12">
      <Navbar />
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <Navtabs 
            v-bind:tab="'artworks'"/>
        </div>
      </div>
      <div class="row m-1">
        <ArtworkItem 
          v-bind:artworks="getArtworks"/>
      </div>
      <!-- BLOG CARD -->
      <div class="d-flex justify-content-center mb-3 mt-3">
        <Pagination 
          v-bind:linkData="getArtworkLinks"
          v-on:emitLink="fetchArtworks"/>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/Partials/Navbar'
import Navtabs from '@/components/Partials/Navtabs'
import Pagination from '@/components/Admin/Pagination'
import ArtworkItem from '@/components/Partials/ArtworkItem'
import Footer from '@/components/Partials/Footer'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Artworks',
  components: {
    Navbar,
    Navtabs,
    Pagination, 
    ArtworkItem,
    Footer
  },
  data() {
    return {
      url: '/api/blogs/paginate=20/category=artwork'
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