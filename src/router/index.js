import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/shopList',
      name: 'ShopList',
      component: require('../view/ChooseShop.vue')
    },
    {
      path: '/image',
      name: 'Image',
      component: require('../view/DetailImage.vue')
    },
    {
      path: '/detail/:id',
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
