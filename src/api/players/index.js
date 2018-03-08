import * as db from '../../db'
import * as itemsApi from '../items'
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

export const addPlayerInventory = (playerId, { itemId, quantity }) => {
  let updatedPlayerData
  return Promise.all([ itemsApi.getItems(), getPlayers() ])
    .then((itemAndPlayerData) => {
      const items = itemAndPlayerData[0]
      const players = itemAndPlayerData[1]
      return db.insertOrPatch({ players: { $exists: true } }, {
        players: players.map((player) => {
          let found = false
          if (player.id !== playerId) {
            return player
          }
          player.inventory = player.inventory.map((item) => {
            if (item.id === itemId) {
              item.quantity += quantity
              found = true
            }
            return item
          }).filter(item => item.quantity > 0)
          if (!found && quantity > 0) {
            player.inventory.push({ id: itemId, quantity })
          }
          player.totalWeight = player.inventory.reduce((memo, ownedItem) => {
            const foundItem = items.find(item => item.id === ownedItem.id)
            if (foundItem) {
              memo += foundItem.weight * ownedItem.quantity
            }
            return memo
          }, 0)
          updatedPlayerData = player
          return player
        })
      })
    })
    .then(() => updatedPlayerData)
}
