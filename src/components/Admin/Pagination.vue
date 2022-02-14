<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" 
        v-for="link in linkData" 
        :key="link.id" 
        :class="{ 'disabled' : link.url == null , 'active' : link.active == true}">
        <button class="page-link" @click="emitLink(link.url)">
          <span v-if="link.label == 'Previous' "><i class="fa fa-chevron-left"></i></span>
          <span v-else-if="link.label == 'Next' "><i class="fa fa-chevron-right"></i></span>
          <span v-else>{{ link.label }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['linkData'],
  methods: {
    emitLink(url) {
      this.$emit('emitLink', url)
    }
  }
}
</script>

<style scoped>

</style>