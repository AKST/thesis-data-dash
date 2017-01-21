<template>
  <div class="root">
    <nav-bar/>
  </div>
</template>

<script>
  import navBar from 'src/components/common/nav-bar'

  export default {
    name: 'package-single',
    components: { navBar },
    created () {
      console.log('test')
    }
  }
</script>
