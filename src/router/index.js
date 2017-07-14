import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/complain/detail/:id/:workerId',
      name: 'Detail',
      meta: {
        title: '客诉详情'
      },
      component: require('../view/ComplainDetail.vue')
    },
    {
      path: '/:workerId',
      name: 'DetailList',
      meta: {
        title: '客诉列表'
      },
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

router.beforeEach(function (to, from, next) {
  let toPath = to.fullPath
  let fromPath = from.fullPath
  console.log('store:' + store.getters.scroll)
  if (fromPath.indexOf('detail') > 0) {
    document.body.scrollTop = store.getters.scroll
  }
  console.log(toPath + ',' + fromPath)
  next()
})

export default router
