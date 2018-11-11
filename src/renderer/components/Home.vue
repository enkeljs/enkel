<template>
  <div class="home_container">
    Home
  </div>
</template>
<style scoped>
  .home_container {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
  .home_header_container {
    position: relative;
    width: 100%;
    height: 36px;
    font-size: 13px;
    color: #333;
  }
  .back {
    position: absolute;
    top: 0;
    left: 10px;
    padding: 0 10px 0 0;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .logout {
    position: absolute;
    top: 0;
    right: 10px;
    padding: 0 10px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .home_body_container {
    width: 100%;
    height: calc(100% - 36px);
  }
</style>
<script>
  export default {
    name: 'Home',
    data () {
      return {
        currentUser: {}
      }
    }
  }
</script>
