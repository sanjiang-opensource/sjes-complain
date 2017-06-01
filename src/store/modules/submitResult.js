import * as types from '../mutation-types'
import * as api from '../../api'

const state = {

}

const getters = {
  result: state => state.result
}

const mutations = {
  [types.SUBMIT_COMPLAIN] (state, data) {
    state.result = data
  }
}

const actions = {
  submitResult ({commit}, res) {
    api.resultSubmit(res)
      .then(data => {
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
