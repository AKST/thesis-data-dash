<template>
  <section class="nav-root">
    <!-- since flex box takes absolute elements in
      -  consideration, we can't make .nav-root have
      -  space-between as justify-content and flex box
      -->
    <div class="nav-root-center">
      <a class="nav-title-link" href="/">
        <t-title class="nav-title" :message="message" :level="titleLevel"/>
      </a>
      <ul class="nav-links">
        <li class="nav-links-item" v-for="item in links">
          <a class="nav-links-link" v-bind:href="item.url">{{item.name}}</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  import tTitle from 'src/components/type/t-title'

  export default {
    name: 'nav-bar',
    components: { tTitle },

    computed: mapGetters({
      links: 'navItems'
    }),

    data () {
      return { message: 'Thesis', titleLevel: 1 }
    }
  }
</script>

<style scoped>
  @import "../../styles/common.css";

  .nav-root-center {
    width: 100;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-root {
    font-size: 1.5rem;
    --h-padding: 1rem;
    position: relative;
    box-sizing: border-box;

    padding: 0.75rem var(--h-padding);
    width: 100%;

    &:after {
      position: absolute;
      bottom: 0.2em;
      left: var(--h-padding);
      right: var(--h-padding);
      height: 0.18em;
      background-color: var(--color-red);
      box-shadow: var(--color-red-shadow) 2px 2px;
      content: ' ';
      display: block;
    }
  }

  .nav-title-link {
    color: inherit;
    text-decoration: none;
  }

  .nav-title {
    text-shadow: var(--color-red-shadow) 2px 2px;
    line-height: 1;
    font-size: 1.5em;
  }

  .nav-links {
    margin: 0;
    display: flex;
    font-size: 0.6em;
    font-weight: 600;
    box-sizing: border-box;
  }

  .nav-links-item {
    list-style: none;
    padding: 0.25em 0.72em;
    color: var(--color-yellow);
    background-color: var(--color-red);

    & + .nav-links-item {
      margin-left: 1em;
    }

    & > .nav-links-link {
      color: inherit;
      text-decoration: none;
    }
  }
</style>
