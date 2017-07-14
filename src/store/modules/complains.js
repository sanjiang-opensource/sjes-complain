import * as type from '../mutation-types'

const state = {
  page: 1,
  size: 10,
  totalCount: null,
  current: null,
  shops: [],
  area: false,
  busy: false,
  newIndex: 1,
  scroll: 0,
  workerId: null,
  list: []
}

const getters = {
  current: state => state.current,
  size: state => state.size,
  totalCount: state => state.totalCount,
  busy: state => state.busy,
  page: state => state.page,
  newIndex: state => state.newIndex,
  scroll: state => state.scroll,
  workerId: state => state.workerId,
  list: state => state.list
}

const mutations = {
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
  },
  [type.SET_NEW_INDEX] (state, data) {
    state.newIndex = data
  },
  [type.ITEM_OFFSET] (state, data) {
    state.scroll = data
  },
  [type.COMPLAIN_PAGE_LIST] (state, data) {
    state.list = state.list.concat(data)
  },
  [type.ITEM_PAGE] (state, data) {
    state.page = data
  }
}

const actions = {
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
