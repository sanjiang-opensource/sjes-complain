import Vue from 'vue'
import Vuex from 'vuex'
import complainList from './modules/complains'
import complain from './modules/complain'
import shopList from './modules/shops'
import actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  modules: {
    complainList,
    complain,
    shopList
  },
  strict: debug,
  plugins: []
})
