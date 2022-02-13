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
        <div class="col-md-6 offset-md-3 artwork">
          <div class="card">
            <div class="card-body">
              <div class="artwork-header p-3 d-flex">
                <div class="user-image-container">
                  <img src="@/assets/images/avatar.jpg" alt="" class="user-image">
                </div>
                <div class="artwork-user-name">
                  <p class="card-text fw-bolder ms-2 user-name">{{ blog.user.firstname }} {{ blog.user.lastname }}</p>
                  <small class="ms-2 text-muted blog-date">{{ blog.created_at }}</small>
                </div>
              </div>
              <div class="artwork-body">
                <div class="artwork-title-container ps-3 pb-2">
                  <p class="artwork-title">{{ blog.title }}</p>
                </div>
                <div class="artwork-image-container">
                  <img :src="blog.image" alt="">
                </div>
              </div>
              <div class="artwork-footer p-2">
                <button class="btn btn-sm btn-outline-dark disabled m-1" v-for="tag in blog.tags" :key="tag.id">
                  {{ tag.tag }}
                </button>
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
  name: 'ViewArtwork',
  components: {
    Navbar,
    Navtabs,
    Footer
  },
  computed: {
    ...mapGetters(['blog'])
  },
  methods: {
    ...mapActions(['viewBlog'])
  },
  created() {
    this.viewBlog(this.$route.params.slug)
  }
}
</script>