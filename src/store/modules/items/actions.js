import * as types from '../../mutation-types'
import * as itemsApi from '../../../api/items'

export const addItem = ({ commit }, item) => {
  commit(types.ADD_ITEM, item)
}

export const loadItems = ({ commit }) => {
  return itemsApi.getItems()
    .then(items => commit(types.LOAD_ITEMS, items))
}

export const searchItems = ({ commit }, term) => {
  commit(types.SEARCH_ITEMS, term)
}
