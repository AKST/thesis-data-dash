<template>
  <div class="graph-scatterPlot"></div>
</template>

<script>
  export default {
    name: 'g-scatter-plot',
    props: {
      data: { type: Object }
    },
    mounted () {
      const element = this.$el
      console.log(element)
    }
  }
</script>

<style>
  .graph-scatterPlot {

  }
</style>
