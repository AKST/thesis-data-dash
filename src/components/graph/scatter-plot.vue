<template>
  <div class="akst__g-sp"></div>
</template>

<script>
  import { select as d3Select } from 'd3-selection'
  import { scaleLinear } from 'd3-scale'
  import { axisBottom, axisLeft } from 'd3-axis'

  export default {
    name: 'g-scatter-plot',

    data () {
      return { _chart: null, _animationFrame: 0 }
    },

    props: {
      graphData: { type: Object },
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

    mounted () {
      if (this.graphData != null) {
        this.renderData()
      }
    },

    created () {
      window.addEventListener('resize', this.handleResize)
    },

    beforeDestory () {
      window.removeEventListener('resize', this.handleResize)
    },

    watch: {
      graphData () {
        this.renderData()
      }
    },

    methods: {
      performResize (event) {
        this.renderData()
        this.$data._animationFrame = 0
      },
      handleResize (event) {
        if (this.$data._animationFrame === 0) {
          this.$data._animationFrame = window.requestAnimationFrame(this.performResize)
        }
      },
      calcWidth () {
        const style = getComputedStyle(this.$el, null)
        const lPadding = parseInt(style.getPropertyValue('padding-left'), 10)
        const rPadding = parseInt(style.getPropertyValue('padding-right'), 10)
        const withPadding = this.$el.scrollWidth

        return withPadding - (lPadding + rPadding)
      },
      calcHeight () {
        const style = getComputedStyle(this.$el, null)
        const tPadding = parseInt(style.getPropertyValue('padding-top'), 10)
        const bPadding = parseInt(style.getPropertyValue('padding-bottom'), 10)
        const withPadding = this.$el.scrollHeight

        return withPadding - (tPadding + bPadding)
      },
      /**
       * Renders scatter plot based on data provided by properties
       */
      renderData () {
        if (this._chart != null) {
          this.$el.removeChild(this._chart.node())
        }

        const { items, range: { x, y } } = this.graphData
        const margin = 50

        // we take margin from here because the axis info
        // needs to go somewhere so we put it here
        const width = this.calcWidth() - (margin * 3.5)
        const height = this.calcHeight() - (margin * 2)

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
          .domain([x.min, x.max])
          .range([0, width + (margin / 2)])

        console.log(x.difference / 20)
        const yScale = scaleLinear()
          .domain([y.min, y.max])
          .range([height, 0 - (y.difference / 10)])

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
            .data(items).enter().append('svg:circle')
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
          .text(x.description)

        const yTitleX = margin * 0.75
        const yTitleY = (height / 2) + margin
        chart.append('text')
          .attr('text-anchor', 'middle')
          .attr('transform', `translate(${yTitleX}, ${yTitleY}) rotate(-90)`)
          .attr('class', 'akst__g-sp__svg__axis__label')
          .text(y.description)
      }
    }
  }
</script>

<style>
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

  .akst__g-sp__svg__axis--x {
    font-size: 0.6rem;
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
