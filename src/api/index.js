import axios from '../utils/diyaxios'

const HOST = process.env.NODE_ENV === 'production' ? 'http://weixin-dev.sanjiang.com/admin/customerComplain' : 'http://weixin-dev.sanjiang.com/admin/customerComplain'

export function fetch (url) {
  return new Promise((resolve, reject) => {
    axios.get(HOST + url)
      .then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
  })
}

export function submit (url) {
  return new Promise((resolve, reject) => {
    axios.post(HOST + url)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 根据工号分页显示
export function fetchSearchByWorkId (res, page = 1, limit = 10) {
  return fetch(`/wx/pageList?jobNum=${res.jobNum}&page=${page}&limit=${limit}&receiveDept=${res.receiveDept}`)
}

// 根据id获取客诉详情
export function fetchItemById (res) {
  return fetch(`/result/wx/${res.id}/${res.workerId}`)
}

// 根据shopName获取门店列表
export function fetchSearchByShopName (shopName, page = 1, limit = 20) {
  return fetch(`/listForComplain?shopName=${shopName}&page=${page}&limit=${limit}`)
}

// 提交处理结果
export function resultSubmit (res) {
  return submit(`/result/submit/1?result=${res.result}&complainId=${res.id}&shopName=${res.shopName}&shopId=${res.shopId}&turn=${res.turn}`)
}

// 关闭无效客诉
export function closeComplain (res) {
  return submit(`/result/submit/2?result=${res.result}&complainId=${res.id}`)
}

