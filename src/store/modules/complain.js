import * as types from '../mutation-types'
import * as api from '../../api'

const state = {
  complainDetail: {
    customerComplainWxModel: {},
    complainResults: []
  },
  shopName: null
}

const getters = {
  complainDetail: state => state.complainDetail
}

const mutations = {
  [types.GET_COMPLAIN_ID] (state, data) {
    state.complainDetail = data
  },
  [types.CLEAN_DETAIL] (state) {
    state.customerComplainWxModel = {}
    state.complainResults = []
  }
}

const actions = {
  getComplainDetail ({commit}, id) {
    api.fetchItemById(id)
      .then(data => {
        console.log(data)
        commit(types.GET_COMPLAIN_ID, data)
      })
  },
  [types.CLEAN_DETAIL] ({commit}) {
    commit(types.CLEAN_DETAIL)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
