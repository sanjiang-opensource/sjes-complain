import axios from 'axios'
// 超时时间
axios.defaults.timeout = 5000

axios.interceptors.response.use((res) => {
  if (res.status === 404) {
    console.log('页面为找到')
  }
  return res
}, (error) => {
  return Promise.reject(error)
})

export default axios
