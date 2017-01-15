import { LOAD_PACKAGES, ERROR_MESSAGE } from 'src/store/mutation-types'
import { prepareError } from 'src/store/util/error'
import { timeout } from 'src/util/time'

const STATES = Object.freeze({
  empty: 'empty',
  loaded: 'loaded'
})

export const state = {
  branch: STATES.empty,
  data: null
}

export const actions = {
  async getAllPackages ({ commit, state }) {
    if (state.branch === STATES.loaded) { return }

    try {
      const request = await timeout(fetch('/api/package'), 2000)
      const parsed = await request.json()
      commit(LOAD_PACKAGES, parsed.data)
    }
    catch (e) {
      commit(ERROR_MESSAGE, prepareError(e))
    }
  }
}

export const mutations = {
  ignorePackages () {},

  [LOAD_PACKAGES] (state, packages) {
    state.branch = STATES.loaded
    state.data = packages
  }
}

export const getters = {
  allPackages (state) {
    return state.data
  },
  allPackagesAsMap (state) {
    const map = new Map()
    for (const { id, name } of state.data) {
      map.set(id, name)
    }
    return map
  }
}

export default { state, mutations, actions, getters }

