import Vue from 'vue'
import Vuex from 'vuex'
import complainList from './modules/complains'
import complain from './modules/complain'
import actions from './actions'
import createLogger from 'vuex/src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  modules: {
    complainList,
    complain
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

