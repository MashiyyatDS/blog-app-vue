<template>
  <div class="col-md-6 offset-md-3 mb-3 blog" v-for="blog in blogs" :key="blog.slug">
    <router-link :to="'/blogs/' + blog.slug" _target="_blank">
      <div class="card position-relative">
        <span 
          class="position-absolute top-0 end-0 bg-danger p-2 text-white"
          v-if="blog.isNsfw == true">
          <i class="fa fa-warning"></i>
        </span>
        <div class="card-body">
          <div class="blog-header d-flex p-3">
            <div class="user-image-container nsfw">
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
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BlogItem',
  props: ['blogs']
}
</script>

<style scoped>
  .user-image-container.nsfw {
    /* blur */
  }
</style>