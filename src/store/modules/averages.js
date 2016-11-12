import { LOAD_AVERAGES, ERROR_MESSAGE } from 'src/store/mutation-types'

export const state = {
  averages: { state: 'empty' }
}

export const actions = {
  async getAllAverages ({ commit }) {
    try {
      const averages = await fetch('/api/averages')
      commit(LOAD_AVERAGES, await averages.json())
    }
    catch (e) {
      console.error(e)
      commit(ERROR_MESSAGE, 'failed to load averages')
    }
  }
}

export const mutations = {
  [LOAD_AVERAGES] (state, averages) {
    state.averages = averages
  }
}

export default { state, mutations, actions }
