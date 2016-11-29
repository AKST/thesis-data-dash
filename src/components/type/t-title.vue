<template>
  <div class="thesis__title">
    <h1 v-if="h1">{{ message }}</h1>
    <h2 v-if="h2">{{ message }}</h2>
    <h3 v-if="h3">{{ message }}</h3>
    <h4 v-if="h4">{{ message }}</h4>
    <h5 v-if="h5">{{ message }}</h5>
    <h6 v-if="h6">{{ message }}</h6>
  </div>
</template>

<script>
  export default {
    name: 't-title',

    props: {
      message: { type: String, default: '' },
      level: { level: Number, default: 1 }
    },

    data () {
      const level = this.level || 1
      const data = {}

      for (let i = 1; i < 7; i++) {
        data[`h${i}`] = level === i
      }

      return data
    }
  }
</script>

<style scoped>
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 700;
    font-size: inherit;
  }
</style>
