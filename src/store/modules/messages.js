import { ERROR_MESSAGE } from 'src/store/mutation-types'

export const state = {
  error: { present: false, message: null }
}

export const getters = {
  errorMessage (state) {
    return state.error
  }
}

export const mutations = {
  [ERROR_MESSAGE] (state, message) {
    state.error = { present: true, message }
  }
}

export default { state, mutations, getters }
