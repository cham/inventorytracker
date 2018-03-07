import * as db from '../../db'
import { generateId } from '../../utils/uuidv4'
import * as baseItems from './base.json'

export const getItems = () => getCustomItems()
  .then(items => items.concat(Object.keys(baseItems).map(itemId => ({
    ...baseItems[itemId],
    id: itemId,
    type: 'base'
  }))))

export const getCustomItems = () => db.findOne({ items: { $exists: true } })
  .then((itemsDoc) => {
    if (itemsDoc && itemsDoc.items && itemsDoc.items.length) {
      return itemsDoc.items
    }
    return []
  })

export const addCustomItem = item => {
  const itemData = {
    ...item,
    id: generateId(),
    type: 'custom'
  }
  return getCustomItems()
    .then(items => items.concat(itemData))
    .then(items => db.insertOrPatch({ items: { $exists: true } }, { items }))
    .then(() => itemData)
}

export const deleteItem = itemId => {
  return getCustomItems()
    .then(items => items.filter(item => item.id !== itemId))
    .then(items => db.insertOrPatch({ items: { $exists: true } }, { items }))
}
