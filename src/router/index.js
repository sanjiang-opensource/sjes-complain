import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/complain/detail/:id/:workerId',
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

router.beforeEach(function (to, from, next) {
  let workerId = to.query.workerId
  if (workerId === undefined || workerId === null || workerId.length !== 5) {
    window.alert('错误的工号！')
  } else {
    next()
  }
})

export default router
