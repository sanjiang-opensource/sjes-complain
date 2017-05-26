import axios from '../utils/diyaxios'

const HOST = process.env.NODE_ENV === 'production' ? 'http://srv3.sanjiang.info:9045/admin/customerComplain' : 'http://srv3.sanjiang.info:9045/admin/customerComplain'

export function fetch (url) {
  return new Promise((resolve, reject) => {
    axios.get(HOST + url)
      .then(response => {
        resolve(response.data)
      })
  })
}

// 根据工号分页显示
export function fetchSearchByWorkId (jobNum, page = 1, limit = 10) {
  return fetch(`/pageList?jobNum=${jobNum}&page=${page}&limit=${limit}`)
}

// 根据id获取客服详情
export function fetchItemById (id) {
  return fetch(`/result/wx/${id}`)
}

