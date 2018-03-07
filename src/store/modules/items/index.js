import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
  items: [],
  filteredItems: [],
  searchTerm: ''
}

export default {
  state,
  getters,
  actions,
  mutations
}
