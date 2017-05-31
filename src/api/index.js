import axios from '../utils/diyaxios'

const HOST = process.env.NODE_ENV === 'production' ? 'http://weixin-dev.sanjiang.com/customerComplain' : 'http://weixin-dev.sanjiang.com/admin/customerComplain'

export function fetch (url) {
  return new Promise((resolve, reject) => {
    axios.get(HOST + url)
      .then(response => {
        resolve(response.data)
      })
  })
}

export function submit (url) {
  return new Promise((resolve, reject) => {
    axios.post(HOST + url)
      .then(response => {
        resolve(response.data)
      })
      .catch(function (error) {
        console.log(error)
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
export function resultSubmit (res) {
  console.log(res.shopName, res.id, res.result, res.shopId, res.turn)
  return submit(`/result/submit/1?result=${res.result}&complainId=${res.id}&shopName=${res.shopName}&shopId=${res.shopId}&turn=${res.turn}`)
}

// 关闭无效客诉
// export function closeComplain (id, result) {
//   return submit(`/result/submit/2`, res)
// }

