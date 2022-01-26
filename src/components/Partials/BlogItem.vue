<template>
  <div class="col-md-10 offset-md-1 mb-3 blog" v-for="blog in blogs" :key="blog.slug">
    <router-link :to="'/blogs/' + blog.slug">
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
            <div class="blog-title-container p-3">
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
  .blog a {
    text-decoration: none;
  }
  .card-body {
    padding: 0px;
  }
  .blog-header .user-image {
    width: 100%;
  }
  .user-image-container {
    width: 50px;
    height: 50px;
    border-radius: 30px;
    overflow: hidden;
  }
  .user-name {
    color: rgb(31, 31, 31);
    font-family: 'Lexend';
    margin-bottom: 0px;
  }
  .blog-title {
    margin: 0px!important;
    font-family: 'Poppins';
    color: black;
  }
  .blog-data {
    font-size: 3px;
  }
  .blog-image-container {
    width: 100%;
  }
</style>