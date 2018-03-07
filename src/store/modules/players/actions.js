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
