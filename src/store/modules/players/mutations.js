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
  },
  [types.ADD_PLAYER_INVENTORY] (state, { playerId, itemId, quantity }) {
    state.players = state.players.map((player) => {
      let found = false
      if (player.id === playerId) {
        player.inventory = player.inventory.map((item) => {
          if (item.id === itemId) {
            item.quantity += quantity
            found = true
          }
          return item
        })
        if (!found) {
          player.inventory.push({ id: itemId, quantity })
        }
      }
      return player
    })
  }
}
