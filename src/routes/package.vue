<template>
  <div class="root">
    <nav-bar/>
    <div class="panels">
      <div class="center">
        <ul class="ls">
          <router-link tag="li" class="it" v-for="it in package" :to="packageRoute(it)">
            <span class="it-name">{{it.data.name}}</span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import navBar from 'src/components/common/nav-bar'

  const packageRoute = ({ id }) => `/package/${id}`

  export default {
    name: 'package',
    components: { navBar },

    computed: mapGetters({
      package: 'allPackages'
    }),

    created () {
      this.$store.dispatch('getAllPackages')
    },

    methods: {
      packageRoute
    }
  }
</script>

<style scoped>
  @import "../styles/common.css";

  :root {
    --list-outer-padding: 1em;
  }

  .panels {
    @apply --shared-parent-theme;
  }

  .center {
    @apply --shared-center-theme;
    padding: var(--list-outer-padding) var(--list-outer-padding);
    margin: 0 auto;
    box-sizing: border-box;
  }

  .ls {
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: calc(100vh - (var(--height-nav) + var(--list-outer-padding) * 2));
    overflow: scroll;
  }

  .it {
    padding: 0.5em 0.75em;
    color: var(--color-white);
    background-color: var(--color-black);
    @nest & + .it {
      margin-top: 0.25em;
      border-top: var(--color-red) solid 1px;
    }
  }

  .it-name {

  }
</style>
