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
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// router.beforeEach(function (to, from, next) {
//   let workerId = to.query.workerId
//   let fullPath = to.fullPath
//   if (fullPath.indexOf('detail') < 0 && (workerId === null || workerId === undefined || workerId.length !== 5)) {
//     window.alert('请输入正确的工号')
//   } else {
//     next()
//   }
// })

export default router
