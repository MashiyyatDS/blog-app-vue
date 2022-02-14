<template>
  <div 
    class="card blog-item mb-1"
    :class="{ 'border-danger' : blog.isNsfw == true }"
    v-for="blog in getBlogs"
    :key="blog.id">
    <div class="card-body p-2 position-relative">
      <div class="dropdown position-absolute top-0 end-0">
        <button 
          class="btn btn-sm text-dark" type="button" 
          id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa fa-bars text-muted"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <button 
              class="dropdown-item" 
              data-bs-toggle="modal" 
              data-bs-target="#blogUpdateForm"
              @click="findBlog(blog.id)">
              Edit
            </button>
          </li>
          <li>
            <button
              class="dropdown-item"
              @click="deleteBlog(blog.id)" >
              Delete
            </button>
          </li>
        </ul>
      </div>

      <div class="row">
        <div class="col-md-4 col-6">
          <small class="text-muted fw-bolder">
            <i class="fa fa-chevron-right"></i> {{ blog.title }}
          </small><br>
          <small class="text-muted">January 21, 2022</small>
        </div>
        <div class="col-md-4 col-6 d-flex">
          <small class="text-muted">NSFW content: </small>
          <div class="ms-1 form-check form-switch d-flex justify-content-center">
            <input 
              class="form-check-input" type="checkbox" role="switch" checked
              v-if="blog.isNsfw == true"
              @change="setNsfw({ isNsfw: false, id: blog.id })">
            <input 
              class="form-check-input" type="checkbox" role="switch"
              @change="setNsfw({ isNsfw: true, id: blog.id })"
              v-else>
          </div>
        </div>
        <div class="col-md-4 mt-1">
          <small class="text-muted">Category: </small>
          <small 
            class="p-1 text-white rounded-3"
            :class="{ 
              'bg-primary' : blog.category == 'blog', 
              'bg-success' : blog.category == 'artwork' }">
            {{ blog.category }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BlogItem',
  computed: {
    ...mapGetters(['getBlogs'])
  },
  methods: {
    ...mapActions([
      'deleteBlog',
      'findBlog',
      'setNsfw'
      ])
  }
}
</script>