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
  scrollY: 0,
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
  scrollY: state => state.scrollY,
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
    state.scrollY = 0
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
  [type.CACHE_LIST] (state, data) {
    state.list = data
  },
  [type.SCROLL_Y] (state, data) {
    state.scrollY = data
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
