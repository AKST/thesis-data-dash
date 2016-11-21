import getStore from 'src/services/database'
import { staleData as stale } from 'src/util/time'
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
    if (state.branch === STATES.loaded) { commit('ignoreAverages') }

    try {
      const store = await getStore()
      const averageMeta = await store.fetch('meta', 'averages')

      if (stale(averageMeta.fetchedLast)) {
        const averages = await fetch('/api/average')
        const result = await averages.json()

        await Promise.all([
          store.insertAll('averages', result.data),
          store.insert('meta', { ...averageMeta, fetchedLast: Date.now() })
        ])
        commit(LOAD_AVERAGES, result)
      }
    }
    catch (e) {
      console.error(e)
      commit(ERROR_MESSAGE, 'failed to load averages')
    }
  }
}

export const mutations = {
  ignoreAverages () {},

  [LOAD_AVERAGES] (state, averages) {
    state.branch = STATES.loaded
    state.data = averages.data
  }
}

export const getters = {
  allAverages (state) {
    return state.data
  }
}

export default { state, mutations, actions, getters }
