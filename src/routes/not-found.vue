<template>
  <div class="notfound-route">
    <nav-bar/>
    <div class="notfound-body">
      <t-title class="notfound-message" :message="'not found'"/>
    </div>
  </div>
</template>


<script>
  import tTitle from 'src/components/t-title'
  import navBar from 'src/components/nav-bar'

  export default {
    name: 'notfound',
    components: { navBar, tTitle }
  }
</script>

<style>
  @import "../styles/common.css";

  .notfound-route {

  }

  .notfound-body {
    display: flex;
    font-size: 2em;
    height: calc(100vh - 100px);
    align-items: center;
    justify-content: center;
  }
</style>
