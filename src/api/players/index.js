import * as db from '../../db'
import { generateId } from '../../utils/uuidv4'

export const getPlayers = () => db.findOne({ players: { $exists: true } })
  .then((playersDoc) => {
    if (playersDoc && playersDoc.players && playersDoc.players.length) {
      return playersDoc.players
    }
    return []
  })

export const addPlayer = player => {
  const playerData = {
    ...player,
    id: generateId(),
    inventory: [],
    totalWeight: 0
  }
  return getPlayers()
    .then(players => players.concat(playerData))
    .then(players => db.insertOrPatch({ players: { $exists: true } }, { players }))
    .then(() => playerData)
}

export const deletePlayer = playerId => {
  return getPlayers()
    .then(players => players.filter(player => player.id !== playerId))
    .then(players => db.insertOrPatch({ players: { $exists: true } }, { players }))
}

export const editPlayer = (playerId, playerData) => {
  return getPlayers()
    .then(players => db.insertOrPatch({ players: { $exists: true } }, {
      players: players.map((player) => {
        if (player.id === playerId) {
          Object.keys(playerData).forEach((key) => { player[key] = playerData[key] })
        }
        return player
      })
    }))
}
