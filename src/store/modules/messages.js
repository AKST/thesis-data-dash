import { ERROR_MESSAGE } from 'src/store/mutation-types'

function errorMessageFromType (type) {
  switch (type) {
    case 'server:timeout':
      return 'Failed to load data in time'
    case 'application':
      return 'Internal Application error'
    default:
      return `Unknown error code "${type}"`
  }
}

export const state = {
  error: { present: false, value: null }
}

export const getters = {
  errorMessage (state) {
    return state.error
  }
}

export const mutations = {
  [ERROR_MESSAGE] (state, { type, error }) {
    const message = errorMessageFromType(type)
    console.error(error)
    state.error = { present: true, value: { message, error } }
  }
}

export default { state, mutations, getters }
