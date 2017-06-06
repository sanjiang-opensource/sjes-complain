import * as types from '../mutation-types'
import * as api from '../../api'

const state = {
  complainDetail: {
    customerComplainWxModel: {},
    complainResults: [],
    shopIds: []
  },
  message: {

  }
}

const getters = {
  complainDetail: state => state.complainDetail,
  message: state => state.message
}

const mutations = {
  [types.GET_COMPLAIN_ID] (state, data) {
    state.complainDetail = data
  },
  [types.CLEAN_DETAIL] (state) {
    state.complainDetail = {}
  },
  [types.SUBMIT_COMPLAIN] (state, data) {
    state.message = data
  }
}

const actions = {
  getComplainDetail ({commit}, res) {
    api.fetchItemById(res)
      .then(data => {
        commit(types.GET_COMPLAIN_ID, data)
      })
  },
  [types.CLEAN_DETAIL] ({commit}) {
    commit(types.CLEAN_DETAIL)
  },
  submitResult ({commit}, res) {
    return api.resultSubmit(res)
  },
  closeComplain ({commit}, res) {
    return api.closeComplain(res)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
