<template>
  <div class="akst__g-sp"></div>
</template>

<script>
  import { elementHeight, elementWidth } from 'src/util/dom'
  import { select as d3Select } from 'd3-selection'
  import { scaleLinear } from 'd3-scale'
  import { axisBottom, axisLeft } from 'd3-axis'

  export default {
    name: 'g-scatter-plot',

    data () {
      return { _chart: null, _animationFrame: 0 }
    },

    props: {
      items: { type: Array },
      xAxis: { type: Object },
      yAxis: { type: Object },
      onNodeEnter: {
        type: Function,
        default: function () {
          return function () {}
        }
      },
      onNodeExit: {
        type: Function,
        default: function () {
          return function () {}
        }
      }
    },

    mounted: function self () {
      if (this.items != null) {
        this.renderData()
      }
      else {
        // if not ready just do this till it is
        window.requestAnimationFrame(self.bind(this))
      }
    },

    created () {
      window.addEventListener('resize', this.handleResize)
    },

    beforeDestory () {
      window.removeEventListener('resize', this.handleResize)
    },

    watch: {
      items () {
        this.renderData()
      }
    },

    methods: {
      performResize (event) {
        if (this.items != null) {
          this.renderData()
          this.$data._animationFrame = 0
        }
      },
      handleResize (event) {
        if (this.$data._animationFrame === 0) {
          this.$data._animationFrame = window.requestAnimationFrame(this.performResize)
        }
      },
      /**
       * Renders scatter plot based on data provided by properties
       */
      renderData () {
        if (this._chart != null) {
          this.$el.removeChild(this._chart.node())
        }

        const margin = 50

        // we take margin from here because the axis info
        // needs to go somewhere so we put it here
        const width = elementWidth(this.$el) - (margin * 3.5)
        const height = elementHeight(this.$el) - (margin * 2)

        const chart = this._chart = d3Select(this.$el)
          .append('svg:svg')
            .attr('width', width + (margin * 3))
            .attr('height', height + (margin * 2))
            .attr('class', 'akst__g-sp__svg')

        const mainX = margin * 1.8
        const mainY = margin * 0.75
        const main = chart
          .append('g')
            .attr('transform', `translate(${mainX},${mainY})`)
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'akst__g-sp__svg__main')

        const xScale = scaleLinear()
          .domain([this.xAxis.min, this.xAxis.max])
          .range([0, width + (margin / 2)])

        const yScale = scaleLinear()
          .domain([this.yAxis.min, this.yAxis.max])
          .range([height, 0 - (this.yAxis.difference / 10)])

        main.append('g')
          .attr('transform', `translate(0,${height})`)
          .attr('class', 'akst__g-sp__svg__axis--x')
          .call(axisBottom(xScale))

        main.append('g')
          .attr('transform', 'translate(0,0)')
          .attr('class', 'akst__g-sp__svg__axis--y')
          .call(axisLeft(yScale))

        main.append('svg:g')
          .selectAll('akst__g-sp__svg__item')
            .data(this.items).enter().append('svg:circle')
              .attr('cx', item => xScale(item.x))
              .attr('cy', item => yScale(item.y))
              .attr('class', 'akst__g-sp__svg__item')
              .attr('r', 5)
              .on('mouseover', d => this.onNodeEnter(d))
              .on('mouseout', () => this.onNodeExit())

        const xTitleX = (width / 2) + (margin * 1.5)
        const xTitleY = height + (margin * 1.75)
        chart.append('text')
          .attr('text-anchor', 'middle')
          .attr('transform', `translate(${xTitleX}, ${xTitleY})`)
          .attr('class', 'akst__g-sp__svg__axis__label')
          .text(this.xAxis.description)

        const yTitleX = margin * 0.75
        const yTitleY = (height / 2) + margin
        chart.append('text')
          .attr('text-anchor', 'middle')
          .attr('transform', `translate(${yTitleX}, ${yTitleY}) rotate(-90)`)
          .attr('class', 'akst__g-sp__svg__axis__label')
          .text(this.yAxis.description)
      }
    }
  }
</script>

<style>
  /* not scoped due styles being attached to svg */
  @import "../../styles/common.css";

  .akst__g-sp {

  }

  .akst__g-sp__svg__item {
    fill: color(var(--color-red) alpha(50%));
  }

  @custom-selector :--axis .akst__g-sp__svg__axis--x, .akst__g-sp__svg__axis--y;

  :--axis {
    font-family: inherit;
    font-size: 0.70rem;
    font-weight: 700;
  }

  .akst__g-sp__svg__axis__label {
    font-size: 0.9rem;
    font-weight: 900;
  }

  .akst__g-sp__svg__axis--x > .tick > text {
    font-size: 0.6rem;
    transform: rotate(-10deg) translateY(5px);
    text-anchor: end;
  }

  .akst__g-sp__svg__axis--y {
    font-size: 0.8rem;
  }

  :--axis > :matches(.domain, .tick > line) {
    stroke: color(var(--color-red) alpha(75%));
    stroke-width: 2px;
  }

  :--axis > .tick > text, .akst__g-sp__svg__axis__label {
    fill: color(var(--color-red));
  }
</style>
