import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from 'vuex/dist/logger'
import players from './modules/players'
import items from './modules/items'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    players,
    items
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
