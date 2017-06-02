// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import axios from './utils/diyaxios'
import {sync} from 'vuex-router-sync'
import store from './store'
import router from './router'
import {ConfirmPlugin} from 'vux'

Vue.use(ConfirmPlugin)

sync(store, router)

Vue.prototype.$http = axios

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.filter('statusName', function (value) {
  let status = ''
  if (value === 1) {
    status = '待处理'
  } else if (value === 2) {
    status = '已完成'
  } else {
    status = '已关闭'
  }
  return status
})
Vue.filter('statusColor', function (value) {
  let color = 'gray'
  if (value === 1) {
    color = 'red'
  } else if (value === 2) {
    color = 'green'
  } else {
    color = 'gray'
  }
  return color
})
Vue.filter('timeToString', function (value) {
  if (value !== '') {
    return value[0] + '-' + value[1] + '-' + value[2] + ' ' + value[3] + ':' + value[4] + ':' + (value[5] === undefined ? '00' : value[5])
  }
  return ''
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
