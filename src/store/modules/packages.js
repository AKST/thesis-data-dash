import { LOAD_PACKAGES, ERROR_MESSAGE } from 'src/store/mutation-types'
import { request, checkCachedJson } from 'src/store/util/data'
import { prepareError } from 'src/store/util/error'

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
      const getPackages = request('api/package')
      const cachedResponse = await checkCachedJson(getPackages)
      if (cachedResponse != null) {
        commit(LOAD_PACKAGES, cachedResponse.data)
      }

      const response = await fetch(getPackages)
      const parsed = await response.json()
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
    for (const { id, data: { name } } of state.data) {
      map.set(id, name)
    }
    return map
  }
}

export default { state, mutations, actions, getters }

