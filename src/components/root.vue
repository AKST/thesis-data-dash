<template>
  <div class="akst__thesis">
    <router-view v-if="!error.present"/>
    <div v-else class="akst__error">
      <t-title :message="'Error'" :level="1"/>
      <t-title :message="error.value.message" :level="2"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import tTitle from 'src/components/type/t-title'

  export default {
    name: 'index',
    components: { tTitle },
    computed: mapGetters({
      error: 'errorMessage'
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

  .akst__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
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
