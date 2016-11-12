/* @flow */

export class Link {
  _url: string
  _name: string

  constructor (url: string, name: string) {
    this._url = url
    this._name = name
  }

  // $SuppressFlow
  get name () {
    return this._name
  }

  // $SuppressFlow
  get url () {
    return this._url
  }
}

class Navlinks {
  defaults: Array<Link>

  constructor (defaults: Array<Link>) {
    this.defaults = defaults
  }

  getLinks () {
    return this.defaults
  }
}

export const Constructor = Navlinks

export default new Navlinks([
  new Link('/releases', 'GHC Releases'),
  new Link('/samples', 'Samples')
])
