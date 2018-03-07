import * as types from '../../mutation-types'

export default {
  [types.ADD_PLAYER] (state, player) {
    state.players.push(player)
  },
  [types.LOAD_PLAYERS] (state, players) {
    state.players = state.players.concat(players)
  }
}
