import cacheUtil, { cacheFetchAll } from 'src/services/cache/util'
import { LOAD_AVERAGES, ERROR_MESSAGE } from 'src/store/mutation-types'

const STATES = Object.freeze({
  empty: 'empty',
  loaded: 'loaded'
})

export const state = {
  branch: STATES.empty,
  data: null
}

export const actions = {
  async getAllAverages ({ commit, state }) {
    if (state.branch === STATES.loaded) {
      commit('ignoreAverages')
      return
    }

    try {
      commit(LOAD_AVERAGES, await cacheFetchAll({ url: '/api/average', store: 'averages' }))
    }
    catch (e) {
      commit(ERROR_MESSAGE, cacheUtil.prepareError(e))
    }
  }
}

export const mutations = {
  ignoreAverages () {},

  [LOAD_AVERAGES] (state, averages) {
    state.branch = STATES.loaded
    state.data = averages
  }
}

export const getters = {
  allAverages (state) {
    return state.data
  }
}

export default { state, mutations, actions, getters }
