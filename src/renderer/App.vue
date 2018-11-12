<template>
  <div id="app">
    <router-view name="HomeRouter"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'enkel'
  }
</script>

<style>
  /* CSS */
  * {
    padding: 0;
    margin: 0;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
  }
  html,
  body {
    height: 100%;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
  #app {
    height: 100%;
  }
</style>
