import * as types from '../../mutation-types'
import * as playersApi from '../../../api/players'

export const addPlayer = ({ commit }, player) => {
  return playersApi.addPlayer(player)
    .then(newPlayer => commit(types.ADD_PLAYER, newPlayer))
    .catch(e => console.error(e))
}

export const loadPlayers = ({ commit }) => {
  return playersApi.getPlayers()
    .then(players => commit(types.LOAD_PLAYERS, players))
    .catch(e => console.error(e))
}

export const deletePlayer = ({ commit }, playerId) => {
  return playersApi.deletePlayer(playerId)
    .then(() => commit(types.DELETE_PLAYER, playerId))
    .catch(e => console.error(e))
}

export const editPlayer = ({ commit }, playerData) => {
  return playersApi.editPlayer(playerData.id, playerData)
    .then(() => commit(types.EDIT_PLAYER, playerData))
    .catch(e => console.error(e))
}

export const addPlayerInventory = ({ commit }, { playerId, itemId, quantity }) => {
  return playersApi.addPlayerInventory(playerId, { itemId, quantity })
    .then(playerData => commit(types.EDIT_PLAYER, playerData))
    .catch(e => console.error(e))
}
