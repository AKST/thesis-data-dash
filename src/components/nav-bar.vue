<template>
  <section class="nav-root">
    <a class="nav-title-link" href="/">
      <t-title class="nav-title" :message="message" :level="titleLevel"></t-title>
    </a>
    <ul class="nav-links">
      <li class="nav-links-item" v-for="item in links">
        <a class="nav-links-link" v-bind:href="item.url">{{item.name}}</a>
      </li>
    </ul>
  </section>
</template>

<script>
  import tTitle from 'src/components/t-title'

  export default {
    name: 'nav-bar',

    components: { tTitle },

    computed: {
      links () {
        return this.$root.$nav.getLinks()
      }
    },

    data () {
      return { message: 'Thesis', titleLevel: 1 }
    }
  }
</script>

<style scoped>
  @import "../styles/common.css";

  .nav-root {
    --h-padding: 0.6em;

    width: var(--width-container);
    margin: var(--margin-container);

    font-size: 1.5rem;
    padding: 0.75rem var(--h-padding);
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
  }

  .nav-links {
    margin: 0;
    display: flex;
    font-size: 1rem;
    font-weight: 600;
  }

  .nav-links-item {
    list-style: none;

    & + .nav-links-item {
      margin-left: 1em;
    }

    & > .nav-links-link {
      color: var(--color-red);
      text-decoration: none;
    }
  }
</style>
