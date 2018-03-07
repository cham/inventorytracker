import * as types from '../../mutation-types'

export const addPlayer = ({ commit }, player) => {
  commit(types.ADD_PLAYER, player)
}
