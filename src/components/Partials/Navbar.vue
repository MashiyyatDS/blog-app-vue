<template>
  <nav class="navbar navbar-dark bg-dark mb-3">
    <div class="container-fluid justify-content-center">
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/images/logo2.svg" alt="" style="height: 30px">
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['title']
}
</script>