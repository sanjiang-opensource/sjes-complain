import * as api from '../../api'
import * as type from '../mutation-types'

const state = {
  page: 1,
  size: 10,
  totalCount: null,
  current: null,
  list: [],
  busy: false,
  workerId: null
}

const getters = {
  list: state => state.list,
  current: state => state.current,
  size: state => state.size,
  totalCount: state => state.totalCount,
  busy: state => state.busy,
  workerId: state => state.workerId,
  page: state => state.page
}

const mutations = {
  [type.COMPLAIN_PAGE_LIST] (state, data) {
    state.list = data.list
  },
  [type.CLEAN_LIST] (state) {
    state.current = null
    state.totalPage = null
    state.list = []
    state.page = 1
    state.size = 10
  },
  [type.SET_INFINITE_BUSY] (state, data) {
    state.busy = data
  },
  [type.INIT_WORKERID] (state, data) {
    state.workerId = data
  }
}

const actions = {
  getComplainList ({commit}, workId, page, size) {
    api.fetchSearchByWorkId(workId, page, size)
      .then(data => {
        commit(type.COMPLAIN_PAGE_LIST, data)
      })
  },
  [type.CLEAN_LIST] ({commit}) {
    commit(type.CLEAN_LIST)
  },
  [type.SET_INFINITE_BUSY] ({commit}, data) {
    commit(type.SET_INFINITE_BUSY, data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
