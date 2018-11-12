<template>
  <div class="home_container">
    <div class="hd">
      <headers></headers>
    </div>
    <div class="bd">
      <contents></contents>
    </div>
  </div>
</template>
<style scoped>
  .home_container {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
  .hd {
    width: 100%;
    height: 65px;
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }
  .bd {
    width: 100%;
    height: calc(100% - 65px);
  }
</style>
<script>
  export default {
    name: 'home',
    components: {
      Headers: () => import('./parts/Headers.vue'),
      Contents: () => import('./parts/Contents.vue')
    },
    data () {
      return {
        currentUser: {}
      }
    }
  }
</script>
