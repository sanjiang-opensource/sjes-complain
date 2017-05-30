import axios from '../utils/diyaxios'

const HOST = process.env.NODE_ENV === 'production' ? 'http://weixin-dev.sanjiang.com/admin/customerComplain' : 'http://weixin-dev.sanjiang.com/admin/customerComplain'

class ResultData {
  constructor (shopName, shopId, id, turn, result) {
    this.shopId = shopId
    this.shopName = shopName
    this.id = id
    this.turn = turn
    this.result = result
  }
}

export function fetch (url) {
  return new Promise((resolve, reject) => {
    axios.get(HOST + url)
      .then(response => {
        resolve(response.data)
      })
  })
}

export function submit (url, result, id, shopId, shopName, turn) {
  return new Promise((resolve, reject) => {
    axios.post(HOST + url, {
      result: result,
      id: id,
      shopName: shopName,
      shopId: shopId,
      turn: turn
    })
      .then(response => {
        resolve(response.data)
      })
  })
}

// 根据工号分页显示
export function fetchSearchByWorkId (jobNum, page = 1, limit = 10) {
  return fetch(`/pageList?jobNum=${jobNum}&page=${page}&limit=${limit}`)
}

// 根据id获取客诉详情
export function fetchItemById (id) {
  return fetch(`/result/wx/${id}`)
}

// 根据shopName获取门店列表
export function fetchSearchByShopName (shopName, page = 1, limit = 20) {
  return fetch(`/listForComplain?shopName=${shopName}&page=${page}&limit=${limit}`)
}

// 提交处理结果
export function resultSubmit (shopName, id, result, shopId, turn) {
  return submit(`/result/submit/1`, shopName, id, result, shopId, turn)
}

// 关闭无效客诉
export function closeComplain (id, result) {
  var res = new ResultData()
  res.result = result
  res.id = id
  return submit(`/result/submit/2`, res)
}

