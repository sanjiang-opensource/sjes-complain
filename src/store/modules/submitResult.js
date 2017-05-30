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
  submitResult ({commit}, shopName, shopId, id, result, turn) {
    api.resultSubmit(shopName, shopId, id, result, turn)
      .then(data => {
        console.log(data)
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
