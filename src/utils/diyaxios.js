import axios from 'axios'
import router from 'vue-router'

const http = axios.create({
  // 超时时间
  timeout: 5000
})

http.interceptors.response.use((res) => {
  if (res.status === 404) {
    console.log('页面为找到')
  }
  return res
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        // store.commit(types.LOGOUT);
        router.replace({
          path: 'login',
          query: {redirect: router.currentRoute.fullPath}
        })
    }
  }
  return Promise.reject(error)
})

export default http
