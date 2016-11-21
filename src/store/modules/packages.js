import getStore from 'src/services/database'
import { staleData as stale } from 'src/util/time'
import { LOAD_PACKAGES, ERROR_MESSAGE } from 'src/store/mutation-types'

const STATES = Object.freeze({
  empty: 'empty',
  loaded: 'loaded'
})

export const state = {
  branch: STATES.loaded,
  data: null
}

export const actions = {
  async getAllPackages ({ commit, state }) {
    if (state.branch === STATES.loaded) { commit('ignorePackages') }

    try {
      const store = await getStore()
      const packageMeta = await store.fetch('meta', 'packages')

      if (stale(packageMeta.fetchedLast)) {
        const packages = await fetch('/api/package')
        const result = await packages.json()

        await Promise.all([
          store.insertAll('packages', result.data),
          store.insert('meta', { ...packageMeta, fetchedLast: Date.now() })
        ])
        commit(LOAD_PACKAGES, packages)
      }
    }
    catch (e) {
      console.error(e)
      commit(ERROR_MESSAGE, 'failed to load packages')
    }
  }
}

export const mutations = {
  ignorePackages () {},

  [LOAD_PACKAGES] (state, packages) {
    state.branch = STATES.loaded
    state.data = packages.data
  }
}

export const getters = {
  allPackages (state) {
    return state.data
  }
}

export default { state, mutations, actions, getters }

