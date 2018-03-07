import * as db from '../../db'
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

export const addCustomItem = item => getCustomItems()
  .then(items => items.concat({
    ...item,
    type: 'custom'
  }))
  .then(items => db.insertOrPatch({ items: { $exists: true } }, { items }))
