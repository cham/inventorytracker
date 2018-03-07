import * as types from '../../mutation-types'
import * as itemsApi from '../../../api/items'

export const addItem = ({ commit }, item) => {
  return itemsApi.addCustomItem(item)
    .then(newItem => commit(types.ADD_ITEM, newItem))
    .catch(e => console.error(e))
}

export const loadItems = ({ commit }) => {
  return itemsApi.getItems()
    .then(items => commit(types.LOAD_ITEMS, items))
    .catch(e => console.error(e))
}

export const searchItems = ({ commit }, term) => {
  commit(types.SEARCH_ITEMS, term)
}
