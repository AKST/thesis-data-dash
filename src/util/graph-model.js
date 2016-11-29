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
    else if (value < this.min) {
      this.min = value
    }
  }

  get difference () {
    return this.max - this.min
  }
}

export class Node {
  constructor (x, y, meta = {}) {
    this.x = Number.isNaN(x) ? 0 : x
    this.y = Number.isNaN(y) ? 0 : y
    this.meta = Object.freeze(Object.assign({}, meta))
  }
}

export default { Range }
