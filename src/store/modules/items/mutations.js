import * as types from '../../mutation-types'

const sortItems = (state) => {
  state.items.sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })
}

const filterItems = (state) => {
  state.filteredItems = state.items.filter(item => item.name.toLowerCase().indexOf(state.searchTerm) > -1)
}

export default {
  [types.ADD_ITEM] (state, item) {
    state.items.push(item)
    sortItems(state)
    filterItems(state)
  },
  [types.LOAD_ITEMS] (state, items) {
    state.items = state.items.concat(items)
    sortItems(state)
    filterItems(state)
  },
  [types.SEARCH_ITEMS] (state, term) {
    state.searchTerm = term.toLowerCase()
    filterItems(state)
  },
  [types.DELETE_ITEM] (state, itemId) {
    state.items = state.items.filter(item => item.id !== itemId)
    sortItems(state)
    filterItems(state)
  }
}
