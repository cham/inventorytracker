import * as types from '../../mutation-types'
import * as itemsApi from '../../../api/items'

export const addPlayer = ({ commit }, item) => {
  commit(types.ADD_ITEM, item)
}

export const loadItems = ({ commit }) => {
  return itemsApi.getItems()
    .then(items => commit(types.LOAD_ITEMS, items))
}
