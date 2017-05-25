import * as types from '../mutation-types'
import * as api from '../../api'

const state = {
  complainDetail: {}
}

const getters = {
  complainDetail: state => state.complainDetail
}

const mutations = {
  [types.GET_COMPLAIN_ID] (state, data) {
    state.complainDetail = data
  }
}

const actions = {
  getComplainDetail ({commit}, id) {
    api.fetchItemById(id)
      .then(data => {
        commit(types.GET_COMPLAIN_ID, data)
      })
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
