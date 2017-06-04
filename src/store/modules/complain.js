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
    // state.result = data
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
    api.resultSubmit(res).then(data => {
      commit(types.SUBMIT_COMPLAIN, data)
    })
  },
  closeComplain ({commit}, res) {
    api.closeComplain(res)
      .then(data => {
        commit(types.SUBMIT_COMPLAIN, data)
      })
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
