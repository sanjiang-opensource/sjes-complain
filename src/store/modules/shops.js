import * as api from '../../api'
import * as type from '../mutation-types'

const state = {
  page: 1,
  size: 10,
  content: []
}

const getters = {
  content: state => state.content,
  size: state => state.size
}

const mutations = {
  [type.SHOP_LIST] (state, data) {
    state.content = data.content
  },
  [type.CLEAN_SHOP_LIST] (state) {
    state.content = []
    state.page = 1
    state.size = 10
  }
}

const actions = {
  getShopList ({commit}, shopName, page, size) {
    api.fetchSearchByShopName(shopName, page, size)
      .then(data => {
        commit(type.SHOP_LIST, data)
      })
  },
  [type.CLEAN_SHOP_LIST] ({commit}) {
    commit(type.CLEAN_SHOP_LIST)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
