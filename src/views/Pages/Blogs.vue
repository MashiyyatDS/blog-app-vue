<template>
  <div class="row">
    <div class="col-md-12">
      <Navbar v-bind:title="'Blogs'" />
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <Navtabs 
            v-bind:tab="'blogs'"/>
        </div>
      </div>
      <div class="row m-1">
        <BlogItem 
          v-bind:blogs="getBlogs"/>
      </div>
      <div class="d-flex justify-content-center">
        <Pagination 
          v-bind:linkData="getBlogLinks"
          v-on:emitLink="fetchBlogs"/>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Pagination from '@/components/Admin/Pagination'
import BlogItem from '@/components/Partials/BlogItem'
import Navtabs from '@/components/Partials/Navtabs'
import Navbar from '@/components/Partials/Navbar'
import Footer from '@/components/Partials/Footer'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Blogs',
  components: {
    Pagination, 
    BlogItem,
    Navtabs,
    Navbar,
    Footer
  },
  data() {
    return {
      url: '/api/blogs/paginate=20/category=blog'
    }
  },
  computed: {
    ...mapGetters(['getBlogs', 'getBlogLinks'])
  },
  methods: {
    ...mapActions(['fetchBlogs'])
  },
  created() {
    this.fetchBlogs(this.url)
  }
}
</script>