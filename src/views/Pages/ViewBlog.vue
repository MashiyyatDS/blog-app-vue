<template>
  <div class="row">
    <div class="col-md-12">
      <Navbar />
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <Navtabs 
            v-bind:tab="'blogs'"/>
        </div>
      </div>
      <div class="row m-1">
        <div class="col-md-6 offset-md-3 mb-3 blog">
          <div class="card">
            <div class="card-body">
              <div class="blog-header d-flex p-3">
                <div class="user-image-container">
                  <img src="@/assets/images/avatar.jpg" alt="" class="user-image">
                </div>
                <div class="blog-user-name">
                  <p class="card-text fw-bolder ms-2 user-name">{{ blog.user.firstname }} {{ blog.user.lastname }}</p>
                  <small class="ms-2 text-muted blog-date">{{ blog.created_at }}</small>
                </div>
              </div>
              <div class="blog-body">
                <div class="blog-title-container ps-3 pb-2">
                  <p class="blog-title">{{ blog.title }}</p>
                </div>
                <div class="blog-image-container">
                  <img :src="blog.image" alt="" class="blog-image">
                </div>
              </div>
              <div class="blog-footer p-2">
                <button class="btn btn-sm btn-outline-dark disabled m-1" v-for="tag in blog.tags" :key="tag.id">
                  {{ tag.tag }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="fb-root"></div>
        <div class="fb-comments" data-href="https://mashmin.netlify.app/blogs/blog-20755449731645927956" data-width="300" data-numposts="10"></div>
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
  name: 'ViewBlog',
  components: {
    Navbar,
    Navtabs,
    Footer
  },
  data() {
    return {
      err: null
    }
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

<style scoped>
  .art-image-container img {
    border-radius: 0px;
  }
</style>