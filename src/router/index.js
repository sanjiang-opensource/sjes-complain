import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/Detail/:id',
      name: 'Detail',
      component: require('../view/ComplainDetail.vue')
    },
    {
      path: '/list/:workerId/:page/:size',
      name: 'DetailList',
      component: require('../view/ComplainList.vue')
    }
  ]
})

export default router
