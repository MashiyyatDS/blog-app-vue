<template>
  <nav class="navbar navbar navbar-dark bg-dark mb-3 sticky-top" style="margin: 2px;border-radius: 5px;">
    <div class="container-fluid p-1">
      <p class="navbar-title"><a class="navbar-brand" href="#"><i class="fa fa-book"></i> {{ title }}</a></p>
      <button class="btn btn-outline-primary d-block d-lg-none d-sm-block d-xs-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
        <i class="fa fa-bars"></i>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
  props: ['title']
}
</script>