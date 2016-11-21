<template>
  <div class="akst__thesis">
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'index',
    computed: mapGetters({
      errors: 'errorMessage'
    })
  }
</script>

<style>
  @import "../styles/common.css";

  :root {
    line-height: 1.5;
    font-size: 16px;
    @media (--mobile) {
      font-size: 14px;
    }
  }

  body, html {
    margin: 0;
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  html {
    font-family: Helvetica, Arial, sans-serif;
  }
  html.wf-active {
    font-family: 'Roboto Mono', Helvetica, Arial, sans-serif;
  }

  .akst__thesis {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--color-yellow);
    color: var(--color-red);
    height: 100%;
    width: 100%;
  }
</style>
