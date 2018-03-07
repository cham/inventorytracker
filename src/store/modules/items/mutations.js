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

export default {
  [types.ADD_ITEM] (state, item) {
    state.items.push(item)
    sortItems(state)
  },
  [types.LOAD_ITEMS] (state, items) {
    state.items = state.items.concat(items)
    sortItems(state)
  }
}
