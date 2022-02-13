<template>
  <div class="m-1">
    <ul class="nav nav-tabs justify-content-center">
      <li class="nav-item">
        <router-link 
          to="/" 
          class="nav-link"
          :class="{ 'active' : tab == 'blogs' }">
          <i class="fa fa-list"></i> Blogs
        </router-link>
      </li>
      <li class="nav-item">
        <router-link 
          to="/artworks" 
          class="nav-link"
          :class="{ 'active' : tab == 'artworks' }">
          <i class="fa fa-image"></i> Artworks
        </router-link>
      </li>
      <li class="nav-item">
        <router-link 
          to="/projects" 
          class="nav-link"
          :class="{ 'active' : tab == 'projects' }">
          <i class="fa fa-folder"></i> Projects
        </router-link>
      </li>
      <li class="nav-item" v-if="authenticated">
        <router-link 
          to="/admin/dashboard" 
          class="nav-link">
          <i class="fa fa-user-o"></i> Admin Panel
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navtabs',
  props: ['tab'],
  computed: {
    ...mapGetters(['authenticated'])
  },
  methods: {
    ...mapActions(['authenticateUser'])
  },
  created() {
    this.authenticateUser()
  }
}
</script>