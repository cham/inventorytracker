import * as types from '../../mutation-types'

export const addPlayer = ({ commit }, item) => {
  commit(types.ADD_ITEM, item)
}
