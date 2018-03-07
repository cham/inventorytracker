import * as types from '../../mutation-types'

export default {
  [types.ADD_ITEM] (state, item) {
    state.items.push(item)
  },
  [types.LOAD_ITEMS] (state, items) {
    state.items = state.items.concat(items)
  }
}
