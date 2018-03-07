import * as types from '../../mutation-types'

export default {
  [types.ADD_PLAYER] (state, player) {
    state.players.push(player)
  },
  [types.LOAD_PLAYERS] (state, players) {
    state.players = state.players.concat(players)
  },
  [types.DELETE_PLAYER] (state, playerId) {
    state.players = state.players.filter(player => player.id !== playerId)
  },
  [types.EDIT_PLAYER] (state, playerData) {
    state.players = state.players.map((player) => {
      if (player.id === playerData.id) {
        Object.keys(playerData).forEach((key) => { player[key] = playerData[key] })
      }
      return player
    })
  }
}
