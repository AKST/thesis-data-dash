<template>
  <svg class="root" :viewBox="viewBox" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <g>
        <circle :id="a.id" :r="circleR" :cx="a.x" :cy="yCenter" :stroke-width="circleStroke"/>
        <circle :id="b.id" :r="circleR" :cx="b.x" :cy="yCenter" :stroke-width="circleStroke"/>
      </g>
      <mask :id="mask.id" maskUnits="userSpaceOnUse" :width="actualWidth" :height="actualHeight" x="0" y="0">
        <rect x="0" y="0" :width="actualWidth" :height="actualHeight" fill="white"/>
        <use :xlink:href="a.ref" fill="black"/>
        <use :xlink:href="b.ref" fill="black"/>
      </mask>
    </defs>
    <path class="inner" :mask="mask.ref" :d="innerD"/>
    <path class="outer" :mask="mask.ref" :d="outerD"/>
    <use :xlink:href="a.ref" class="circle" @mousedown="mouseTargetA"/>
    <use :xlink:href="b.ref" class="circle" @mousedown="mouseTargetB"/>
  </svg>
</template>

<script>
  import uuid from 'uuid'
  import { elementHeight, elementWidth } from 'src/util/dom'

  export default {
    name: 'i-slider',
    data () {
      const aId = uuid()
      const bId = uuid()
      const maskId = uuid()
      return {
        circleR: 1,
        circleStroke: 2,
        actualWidth: 0,
        actualHeight: 0,
        viewBox: '0 0 100 100',
        yCenter: 0,
        innerD: 'M0 0',
        outerD: 'M0 0',
        mask: { ref: `url(#${maskId})`, id: maskId },
        a: { percent: 0, x: 0, id: aId, ref: `#${aId}` },
        b: { percent: 1, x: 0, id: bId, ref: `#${bId}` }
      }
    },
    mounted () {
      this.actualWidth = elementWidth(this.$el)
      this.actualHeight = elementHeight(this.$el)
      this.calcDimensions()
    },
    props: {
      range: { type: Object },
      onChange: {
        type: Function,
        default () {
          return () => null
        }
      }
    },
    computed: {
      circleRadiusWithStroke () {
        return this.circleR + (this.circleStroke / 2)
      }
    },
    methods: {
      calcDimensions () {
        this.viewBox = `0 0 ${this.actualWidth} ${this.actualHeight}`
        this.yCenter = this.actualHeight / 2
        this.circleR = this.actualHeight * (2 / 9)
        this.positionCircle(this.a)
        this.positionCircle(this.b)
        this.positionOuterPath()
        this.positionInnerPath()
      },
      positionOuterPath () {
        const ox = this.circleR
        const odx = this.actualWidth - (this.circleR * 2)
        const y = this.actualHeight / 2
        this.outerD = `M${ox} ${y} H ${odx}`
      },
      positionInnerPath () {
        const { min, max } = this.orderCircles()
        const ix = min.x
        const idx = max.x
        const y = this.actualHeight / 2
        this.innerD = `M${ix} ${y} H ${idx}`
      },
      positionCircle (c) {
        const circleR = this.circleRadiusWithStroke
        c.x = circleR + ((this.actualWidth - (circleR * 2)) * c.percent)
      },
      orderCircles () {
        if (this.a.x < this.b.x) {
          return { min: this.a, max: this.b }
        }
        else {
          return { min: this.b, max: this.a }
        }
      },
      mouseTargetA (event) {
        this.mouseTarget('a', event)
      },
      mouseTargetB (event) {
        this.mouseTarget('b', event)
      },
      mouseTarget (circleId, originalEvent) {
        const handler = this.updateCircle(circleId, originalEvent)
        const finish = event => {
          this.$el.removeEventListener('mousemove', handler)
          this.$el.removeEventListener('mouseleave', finish)
          this.$el.removeEventListener('mouseup', finish)
        }

        this.$el.addEventListener('mousemove', handler)
        this.$el.addEventListener('mouseleave', finish)
        this.$el.addEventListener('mouseup', finish)
      },
      updateCircle (circleId, { screenX: originalScreenX }) {
        const originalX = this[circleId].x
        return ({ screenX: newScreenX }) => {
          const diff = originalScreenX - newScreenX
          const maxBound = this.actualWidth - this.circleRadiusWithStroke
          const minBound = this.circleRadiusWithStroke
          const possibleX = originalX - diff
          const actualX = Math.max(minBound, Math.min(maxBound, possibleX))
          const percent = (actualX - this.circleRadiusWithStroke) / (this.actualWidth - (this.circleRadiusWithStroke * 2))
          this[circleId].x = actualX
          this[circleId].percent = percent
          this.positionInnerPath()

          const { min: { percent: minx }, max: { percent: maxx } } = this.orderCircles()
          this.onChange(this.range.intersectPercent(minx, maxx))
        }
      }
    }
  }
</script>

<style scoped>
  @import "../../styles/common.css";

  .root {
    width: 100%;
    height: 3em;
    box-sizing: border-box;
    pointer-events: all;
    user-select: none;
  }

  .circle {
    fill: transparent;
    stroke: var(--color-yellow);
    cursor: move;
  }

  .inner, .outer {
    stroke: var(--color-yellow);
  }
  .inner {
    stroke-width: 6px;
  }
  .outer {
    stroke-width: 2px;
  }
</style>
