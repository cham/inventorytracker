import * as types from '../../mutation-types'

export default {
  [types.ADD_ITEM] (state, item) {
    state.items.push(item)
  }
}
