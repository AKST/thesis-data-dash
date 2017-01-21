import { ERROR_MESSAGE } from 'src/store/mutation-types'
import { prepareError } from 'src/store/util/error'
import { timeout } from 'src/util/time'

const STATES = Object.freeze({
  empty: 'empty',
  loaded: 'loaded'
})

export const state = {
  branch: STATES.empty,
  currentExtension: 'hi',
  extensions: new Set(),
  data: [],
}


export const actions = {
  async getAllAverages ({ commit, state }) {
    async function request (q, commitId) {
      const r = await timeout(fetch(`/api/average?${q}`), 10000)
      return await r.json()
    }

    try {
      const sizeURL = `type=size`
      const timeURL = 'type=time'

      const [{ data: time }, { data: size }] = await Promise.all([
        request(timeURL, 'LOADED_TIMES'),
        request(sizeURL, 'LOADED_SIZES')
      ])

      commit('LOAD_AVERAGES', { time, size })
    }
    catch (e) {
      commit(ERROR_MESSAGE, prepareError(e))
    }
  }
}

export const mutations = {
  LOAD_AVERAGES (state, { time, size }) {
    const { extensions, averages } = withAverages(time, size)
    state.branch = STATES.loaded
    state.extensions = extensions
    state.data = averages
  }
}

export const getters = {
  allAverages (state) {
    return state.data != null
      ? state.data.map(format(state.currentExtension))
      : null
  }
}


function format (ext) {
  return item => ({ size: item.sizes[ext], ...item })
}

function withAverages (time, size) {
  const idRegex = /\d+-\d+\.\d+\.\d+/
  const extensions = new Set()
  const map = {}

  for (const entry of size) {
    const [id] = entry.id.match(idRegex)
    if (map[id] == null) {
      const ghc = entry.data['ghc-version']
      const packageId = entry.data['package-id']
      map[id] = { id, packageId, ghc, sizes: {} }
    }

    const fileExt = entry.data['file-extension']
    map[id].sizes[fileExt] = entry.data['average-size']
    extensions.add(fileExt)
  }

  return {
    extensions,

    averages: time.map(entry => {
      const [id] = entry.id.match(idRegex)
      const item = map[id]
      return { time: entry.data['average-time'], ...item }
    }),
  }
}

export default { state, mutations, actions, getters }
