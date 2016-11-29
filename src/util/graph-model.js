import { isBoth } from 'src/util/functions'

/**
 * Class for representing a range of values for an axis
 */
export class Range {
  constructor (description = '') {
    this.description = description
    this.min = Infinity
    this.max = -Infinity
  }

  adjust (value) {
    if (value > this.max) {
      this.max = value
    }
    if (value < this.min) {
      this.min = value
    }
  }

  intersectPercent (min, max) {
    const copy = new Range(this.description)
    copy.min = this.min + (this.difference * min)
    copy.max = this.min + (this.difference * max)
    return copy
  }

  get difference () {
    return this.max - this.min
  }
}

/**
 * Basic makes ranges with the same description
 */
export class RangeFactory {
  constructor (description) {
    if (description == null) {
      throw new Error('description cannot be null')
    }
    this.description = description
    Object.freeze(this)
  }

  init () {
    return new Range(this.description)
  }
}

export class Node {
  constructor (x, y, meta = {}) {
    this.x = Number.isNaN(x) ? 0 : x
    this.y = Number.isNaN(y) ? 0 : y
    this.meta = Object.freeze(Object.assign({}, meta))
  }
}

/*
 * Generic function for filtering data and preparing axis' and ranges for a plot
 */
export const prepareForPlot = (function () {
  function isNumber (number) {
    return typeof number === 'number'
  }

  function withRange (range) {
    return function (number) {
      return number >= range.min && number <= range.max
    }
  }

  function always () {
    return true
  }

  return function ({
      xName = 'x',
      yName = 'y',
      ranges: { y: yRangeFilter, x: xRangeFilter } = {},
      xOrigin = null,
      yOrigin = null,
      data = null
  }) {
    if (data == null) throw new TypeError('data must be specified')

    const xRange = xOrigin != null ? xOrigin.init() : new Range('x')
    const yRange = yOrigin != null ? yOrigin.init() : new Range('y')
    const xPredicate = xRangeFilter != null ? isBoth(isNumber, withRange(xRangeFilter)) : always
    const yPredicate = yRangeFilter != null ? isBoth(isNumber, withRange(yRangeFilter)) : always
    const items = []

    for (const item of data) {
      const { [xName]: x, [yName]: y } = item
      if (xPredicate(x) && yPredicate(y)) {
        if (isNumber(x)) xRange.adjust(x)
        if (isNumber(y)) yRange.adjust(y)
        items.push(new Node(x, y, item))
      }
    }

    return { items, range: { x: xRange, y: yRange } }
  }
}())

export default { Range, Node, RangeFactory, prepareForPlot }
