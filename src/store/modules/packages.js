import cacheUtil, { cacheFetchAll } from 'src/services/cache/util'
import { LOAD_PACKAGES, ERROR_MESSAGE } from 'src/store/mutation-types'

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
    if (state.branch === STATES.loaded) { return commit('ignorePackages') }

    try {
      commit(LOAD_PACKAGES, await cacheFetchAll({ url: '/api/package', store: 'packages' }))
    }
    catch (e) {
      commit(ERROR_MESSAGE, cacheUtil.prepareError(e))
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
  }
}

export default { state, mutations, actions, getters }

