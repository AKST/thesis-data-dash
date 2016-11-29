<template>
  <div class="akst__r-index">
    <nav-bar/>
    <div class="akst__r-index__content">
      <div class="akst__r-index__left">
        <t-title class="akst__r-index__vis-title" :message="graphTitle" :level="2"/>
        <g-scatter-plot
          :onNodeEnter="nodeEntryData"
          :graphData="graphData"
          class="akst__r-index__visualisation"/>
      </div>
      <div class="akst__r-index__right" v-if="showMoreInfo">
        <tTitle :level="3" :message="'Node Info'" class="akst__r-index__info-title"/>
        <ul class="akst__r-index__meta-ls">
          <li class="akst__r-index__meta" v-for="i in metaItems">
            <span class="akst__r-index__meta__key">{{i.key}}</span>
            <span class="akst__r-index__meta__value" v-if="i.hasLink">
              <a v-bind:href="i.link" class="akst__r-index__meta__value__link">{{i.value}}</a>
            </span>
            <span class="akst__r-index__meta__value" v-else>{{i.value}}</span>
          </li>
        </ul>
      </div>
      <div class="akst__r-index__right" v-else>
        <tTitle :level="3" :message="'Node Info'" class="akst__r-index__info-title"/>
        <p class="akst__r-index__info__empty">
          No package has been selected
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import { commaSeperate } from 'src/util/math'
  import { Range, Node } from 'src/util/graph-model'
  import navBar from 'src/components/common/nav-bar'
  import tTitle from 'src/components/type/t-title'
  import gScatterPlot from 'src/components/graph/scatter-plot'

  class MetaEntry {
    constructor (key, value, link = '') {
      this.key = key
      this.value = value
      this.link = link
    }
    get hasLink () {
      return this.link !== ''
    }
  }

  /**
   * Generates data for the scatter plot based off packages
   * average data for said packages
   */
  function composeData ({ packages, averages }) {
    const names = new Map()

    for (const { id, name } of packages) {
      names.set(id, name)
    }

    const xRange = new Range('Total Size (bytes)')
    const yRange = new Range('Average Time (seconds)')
    const items = []

    for (const { package_id: id, total_size: x, average_time: y, ghc_version } of averages) {
      if (typeof x === 'number') xRange.adjust(x)
      if (typeof y === 'number') yRange.adjust(y)
      items.push(new Node(x, y, { name: names.get(id), id, ghc_version }))
    }

    return { items, range: { x: xRange, y: yRange } }
  }

  /**
   * Main url of thesis dashboard
   */
  export default {
    name: 'index',
    components: { navBar, gScatterPlot, tTitle },

    data () {
      return {
        graphTitle: 'Binary Size / Average Compliation',
        graphData: null,
        // the currently focused node
        focusedNode: null,
        // meta data associated with the current focused node
        metaItems: null,
        // if more information should be shown
        showMoreInfo: false
      }
    },

    computed: mapGetters({ averages: 'allAverages', packages: 'allPackages' }),

    watch: {
      averages (update) {
        if (this.packages == null || update == null) return
        this.graphData = composeData({ packages: this.packages, averages: update })
      },
      packages (update) {
        if (this.averages == null || update == null) return
        this.graphData = composeData({ packages: update, averages: this.averages })
      },
      focusedNode (focused, previous) {
        if (focused !== previous) {
          const packageUrl = `/package/${focused.meta.id}`
          this.showMoreInfo = true
          this.metaItems = [
            new MetaEntry('Package Name', focused.meta.name, packageUrl),
            new MetaEntry('GHC Version', focused.meta.ghc_version),
            new MetaEntry('Avg Compilation Time', `${focused.y.toFixed(2)}s`),
            new MetaEntry('Total Binary Size', `${commaSeperate(focused.x)}b`)
          ]
        }
      }
    },

    created () {
      this.$store.dispatch('getAllAverages')
      this.$store.dispatch('getAllPackages')
    },

    methods: {
      nodeEntryData (focusedNode) {
        this.focusedNode = focusedNode
      }
    }
  }
</script>

<style>
  @import "../styles/common.css";

  :root {
    --title-size: 1.5rem;
    --title-padding-v: calc((3.5rem - var(--title-size)) / 2);
    --title-space-ocupation: calc(var(--title-size) + (var(--title-padding-v) * 2));
  }

  .akst__r-index {
  }

  .akst__r-index__content {
    @apply --shared-parent-theme;
  }

  .akst__r-index__left {
    @apply --shared-left-theme;
    padding-left: 1rem;
    box-sizing: border-box;
  }

  .akst__r-index__right {
    @apply --shared-right-theme;
    padding: 0 1rem;
    margin-top: 0.5rem;
    margin-right: 1rem;
    box-sizing: border-box;
    color: var(--color-yellow);
    background-color: var(--color-red);

    @nest & > .akst__r-index__meta-ls {
      list-style: none;
      padding-left: 0;
      font-size: 0.9em;
      @nest & > .akst__r-index__meta {
        @nest & > .akst__r-index__meta__key {
          font-weight: 500;
          font-style: italic;
          opacity: 0.8;
        }
        @nest & > .akst__r-index__meta__value {
          font-weight: 900;
          @nest & > .akst__r-index__meta__value__link {
            color: inherit;
            font-style: italic;
          }
        }
      }
    }
  }

  .akst__r-index__info-title {
    --title-size: 1.25rem;
  }

  .akst__r-index__vis-title, .akst__r-index__info-title {
    margin: 0;
    font-size: var(--title-size);
    padding: var(--title-padding-v) 0;
    line-height: 1;
    text-align: center;
    font-style: italic;
    @nest & > h2 {
      font-size: inherit;
    }
  }

  .akst__r-index__info__empty {
    font-weight: 700;
  }

  .akst__r-index__visualisation {
    width: 100%;
    min-height: calc(100vh - (var(--height-nav) + var(--title-space-ocupation) + var(--title-padding-v)));
    background-color: color(var(--color-yellow) lightness(90%));
  }
</style>
