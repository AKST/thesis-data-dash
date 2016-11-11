class Navlinks {
  constructor (defaults) {
    this.defaults = defaults
  }

  getLinks () {
    return this.defaults
  }
}

export class Link {
  constructor (url, name) {
    this._url = url
    this._name = name
  }

  get name () { return this._name }
  get url () { return this._url }
}

export const Service = Navlinks
export default Navlinks
