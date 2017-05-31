import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/complain/detail/:id',
      name: 'Detail',
      component: require('../view/ComplainDetail.vue')
    },
    {
      path: '/:workerId',
      name: 'DetailList',
      component: require('../view/ComplainList.vue')
    }
  ]
})

export default router
