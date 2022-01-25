<template>
  <div class="col-md-12 mb-4" v-for="blog in blogs" :key="blog.slug">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-center bg-dark">
          <h5 class="card-title p-2">
            <router-link :to="'/blogs/' + blog.slug" class="text-white">
              <i class="fa fa-chevron-right"></i> {{ blog.title }}
            </router-link>
          </h5>
        </div>
        <div class="blog-image-container">
          <img :src="blog.image" alt="">
        </div>
        <div class="blog-tags-container">
          <button class="btn btn-sm btn-outline-dark disabled m-1" v-for="tag in blog.tags" :key="tag.slug">
            {{ tag.tag }}
          </button>
        </div>
        <div class="blog-details-container mb-3">
          <small class="text-muted fw-bolder m-1">Author: {{ blog.user.firstname }} {{ blog.user.lastname }}</small><br>
          <small class="text-muted m-1">Posted at {{ blog.created_at }}</small>
        </div>
        <div class="row">
          <div class="col-12 p-1">
            <div class="d-grid">
              <a href="" class="btn btn-sm btn-primary">
                View blog 
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
  name: 'BlogItem',
  props: ['blogs']
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