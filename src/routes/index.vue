<template>
  <div class="index-route">
    <nav-bar/>
    <g-scatter-plot/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import navBar from 'src/components/common/nav-bar'
  import gScatterPlot from 'src/components/graph/scatter-plot'

  export default {
    name: 'index',
    components: { navBar, gScatterPlot },
    computed: mapGetters({
      data: 'allAverages'
    }),
    created () {
      this.$store.dispatch('getAllAverages')
    }
  }
</script>

<style>
  @import "../styles/common.css";

  .index-route {

  }
</style>
