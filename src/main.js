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
import * as filters from './utils/filters'

Vue.use(ConfirmPlugin)
Vue.use(require('vue-wechat-title'))
// 定义全局filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

sync(store, router)

Vue.prototype.$http = axios

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
