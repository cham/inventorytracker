import * as baseItems from './base.json'

export const getItems = () => new Promise((resolve, reject) => {
  resolve(Object.keys(baseItems).map(itemId => ({
    ...baseItems[itemId],
    id: itemId
  })))
})
