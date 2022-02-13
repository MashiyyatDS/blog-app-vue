<template>
  <div class="col-md-6 offset-md-3 mb-3 artwork" v-for="artwork in artworks" :key="artwork.slug">
    <router-link :to="'/artworks/' + artwork.slug">
      <div class="card">
        <div class="card-body">
          <div class="artwork-header p-3 d-flex">
            <div class="user-image-container">
              <img src="@/assets/images/avatar.jpg" alt="" class="user-image">
            </div>
            <div class="artwork-user-name">
              <p class="card-text fw-bolder ms-2 user-name">{{ artwork.user.firstname }} {{ artwork.user.lastname }}</p>
              <small class="ms-2 text-muted blog-date">{{ artwork.created_at }}</small>
            </div>
          </div>
          <div class="artwork-body">
            <div class="artwork-title-container ps-3 pb-2">
              <p class="artwork-title">{{ artwork.title }}</p>
            </div>
            <div class="artwork-image-container">
              <img :src="artwork.image" alt="">
            </div>
          </div>
          <div class="artwork-footer p-2">
            <button class="btn btn-sm btn-outline-dark disabled m-1" v-for="tag in artwork.tags" :key="tag.id">
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
  name: 'ArtworkItem',
  props: ['artworks']
}
</script>
