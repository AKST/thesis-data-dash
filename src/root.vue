<template>
  <div class="akst__thesis">
    <router-view/>
  </div>
</template>

<script>
  export default { name: 'index' }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:100,100i,300,300i,400,400i,500,500i,700,700i');
  @import "styles/common.css";

  body, html {
    margin: 0;
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  .akst__thesis {
    font-family: 'Roboto Mono', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--color-yellow);
    color: var(--color-red);
    height: 100%;
    width: 100%;
  }
</style>
