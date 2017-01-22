<template>
  <div class="root">
    <nav-bar/>
    <div class="panels">
      <!-- tuning visualisation -->
      <div class="left">
        <tTitle :level="3" :message="'Filter'" class="side-title"/>

        <tTitle :level="4" :message="'Total Size Bounds'" class="filter-item-description"/>
        <i-slider :range="xAxisCanonical" :onChange="xFilterUpdate" class="filter-slider"/>

        <tTitle :level="4" :message="'Average Time Bounds'" class="filter-item-description"/>
        <i-slider :range="yAxisCanonical" :onChange="yFilterUpdate" class="filter-slider"/>
      </div>

      <!-- visualisation -->
      <div class="center">
        <t-title class="center-title" :message="graphTitle" :level="2"/>
        <g-scatter-plot
          :onNodeEnter="nodeEntryData"
          :items="graphData"
          :xAxis="xAxisFiltered"
          :yAxis="yAxisFiltered"
          class="akst__r-index__visualisation"/>
      </div>

      <!-- left bar that contains state about nodes-->
      <div class="right">
        <tTitle :level="3" :message="'Node Info'" class="side-title"/>

        <!-- active state for side bar -->
        <ul class="metainfo-ls" v-if="showMoreInfo">
          <li class="metainfo-it" v-for="i in metaItems">
            <span class="metainfo-key">{{i.key}}</span>
            <span class="metainfo-value" v-if="i.link">
              <router-link tag="a" :to="i.link" class="metainfo-value-link">
                {{i.value}}
              </router-link>
            </span>
            <span class="metainfo-value" v-else>{{i.value}}</span>
          </li>
        </ul>

        <!-- empty state for side bar -->
        <p class="metainfo-empty" v-else>No package has been selected</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import { verstr } from 'src/util/semver'
  import { commaSeperate } from 'src/util/math'
  import { prepareForPlot, RangeFactory } from 'src/util/graph-model'
  import navBar from 'src/components/common/nav-bar'
  import tTitle from 'src/components/type/t-title'
  import gScatterPlot from 'src/components/graph/scatter-plot'
  import iSlider from 'src/components/input/i-slider'

  const xFactory = new RangeFactory('Total Size (bytes)')
  const yFactory = new RangeFactory('Average Time (seconds)')

  /**
   * Main url of thesis dashboard
   */
  export default {
    name: 'index',
    components: { navBar, gScatterPlot, tTitle, iSlider },

    data () {
      return {
        graphTitle: 'Binary Size / Average Compliation',
        xAxisCanonical: null,
        yAxisCanonical: null,
        xAxisFiltered: null,
        yAxisFiltered: null,
        graphData: null,
        // the currently focused node
        focusedNode: null,
        // meta data associated with the current focused node
        metaItems: null,
        // if more information should be shown
        showMoreInfo: false
      }
    },

    computed: mapGetters({ averages: 'allAverages', packages: 'allPackagesAsMap' }),

    watch: {
      /**
       * This is expected to fire whenever new data is available
       * for averages or on initial load
       */
      averages (update) {
        if (update == null) return
        this.withDataUpdate({ averages: update })
      },
      focusedNode (focused, previous) {
        if (focused !== previous) {
          const packageUrl = `/package/${focused.meta.packageId}`
          const packageName = this.packages.get(focused.meta.packageId)
          this.showMoreInfo = true
          this.metaItems = [
            { key: 'Package Name', value: packageName, link: packageUrl },
            { key: 'GHC Version', value: verstr(focused.meta.ghc) },
            { key: 'Avg Compilation Time', value: `${focused.y.toFixed(2)}s` },
            { key: 'Total Binary Size', value: `${commaSeperate(focused.x)}b` }
          ]
        }
      }
    },

    created () {
      this.$store.dispatch('getAllAverages')
      this.$store.dispatch('getAllPackages')
    },

    methods: {
      /**
       * When data is loaded, it prepared for the plot
       */
      withDataUpdate ({ averages }) {
        const { items, range: { x, y } } = prepareForPlot({
          data: averages,
          xOrigin: xFactory,
          yOrigin: yFactory,
          xName: 'size',
          yName: 'time'
        })
        this.xAxisCanonical = x
        this.yAxisCanonical = y
        this.xAxisFiltered = x
        this.yAxisFiltered = y
        this.graphData = items
      },

      /**
       * Recalcates the items plotted, by the scatter plot
       * using a range based filter exclude certain items
       */
      recalcuateItems () {
        const { items } = prepareForPlot({
          data: this.averages,
          xOrigin: xFactory,
          yOrigin: yFactory,
          xName: 'size',
          yName: 'time',
          ranges: {
            x: this.xAxisFiltered,
            y: this.yAxisFiltered
          }
        })
        this.graphData = items
      },

      /**
       * callback passed to scatter plot to indicated a highlighed node
       */
      nodeEntryData (focusedNode) {
        this.focusedNode = focusedNode
      },

      /**
       * When the x filter has been updated
       */
      xFilterUpdate (update) {
        this.xAxisFiltered = update
        this.recalcuateItems()
      },

      /**
       * When the y filter has been updated
       */
      yFilterUpdate (update) {
        this.yAxisFiltered = update
        this.recalcuateItems()
      }
    }
  }
</script>

<style scoped>
  @import "../styles/common.css";

  :root {
    --title-size: 1.5rem;
    --title-padding-v: calc((3.5rem - var(--title-size)) / 2);
    --title-space-ocupation: calc(var(--title-size) + (var(--title-padding-v) * 2));
  }

  .panels {
    @apply --shared-parent-theme;
  }

  .center {
    @apply --shared-center-theme;
    padding-left: 1rem;
    box-sizing: border-box;
  }

  .right, .left {
    padding: 0 1rem;
    position: relative;
    box-sizing: border-box;
    margin-top: 0.5rem;
    color: var(--color-yellow);
    background-color: var(--color-red);
  }

  .left {
    @apply --shared-left-theme;
    margin-left: 1rem;
  }

  .right {
    @apply --shared-right-theme;
    margin-right: 1rem;
    @nest & > .metainfo-ls {
      list-style: none;
      padding-left: 0;
      font-size: 0.9em;
      @nest & > .metainfo-it {
        @nest & > .metainfo-key {
          font-weight: 500;
          font-style: italic;
          opacity: 0.8;
        }
        @nest & > .metainfo-value {
          font-weight: 900;
          @nest & > .metainfo-value-link {
            color: inherit;
            font-style: italic;
          }
        }
      }
    }
  }

  .filter-item-description {
    margin: 0;
    font-size: 1rem;
    text-align: center;
  }

  .filter-slider {
  }

  .side-title {
    --title-size: 1.25rem;
  }

  .side-title, .center-title {
    margin: 0;
    font-size: var(--title-size);
    padding: var(--title-padding-v) 0;
    line-height: 1;
    text-align: center;
    font-style: italic;
  }

  .metainfo-empty {
    font-weight: 700;
  }

  .akst__r-index__visualisation {
    width: 100%;
    min-height: calc(100vh - (var(--height-nav) + var(--title-space-ocupation) + var(--title-padding-v)));
    background-color: color(var(--color-yellow) lightness(90%));
  }
</style>
