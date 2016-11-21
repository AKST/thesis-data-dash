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

  /**
   * Generates data for the scatter plot based off
   */
  function * composeData (packages, averages) {
    const names = new Map()

    for (const { id, name } of packages) {
      names.set(id, name)
    }

    for (const { package_id: id, total_size: x, total_size: y } of averages) {
      yield { name: names.get(id), id, x, y }
    }
  }

  export default {
    name: 'index',
    components: { navBar, gScatterPlot },

    data () {
      return { graphData: null }
    },

    computed: mapGetters({
      averages: 'allAverages',
      packages: 'allPackages'
    }),

    watch: {
      averages (update) {
        if (this.packages == null || update == null) return
        this.graphData = [...composeData(this.packages, update)]
        console.log(this.graphData)
      },
      packages (update) {
        if (this.averages == null || update == null) return
        this.graphData = [...composeData(update, this.averages)]
      }
    },

    created () {
      this.$store.dispatch('getAllAverages')
      this.$store.dispatch('getAllPackages')
    }
  }
</script>

<style>
  @import "../styles/common.css";

  .index-route {

  }
</style>
