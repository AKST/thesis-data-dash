import { ADD_NAV_ITEM, REMOVE_NAV_ITEM } from 'src/store/mutation-types'

export const state = {
  stack: []
}

export const actions = {
  [ADD_NAV_ITEM] ({ commit }, item) {
    commit('addNavItem', item)
  },
  [REMOVE_NAV_ITEM] ({ commit }, predicate) {
    commit('removeNavItem', predicate)
  }
}

export const mutation = {
  addNavItem (state, addition) {
    state.stack.push(addition)
  },

  removeNavItem ({ stack }, predicate) {
    throw new Error('not implemented')
  }
}

export const getters = {
  navItems (state) {
    const items = [
      { url: '/releases', name: 'GHC Releases' },
      { url: '/packages', name: 'Packages' }
    ]

    return items
  }
}

export default { state, actions, mutation, getters }
