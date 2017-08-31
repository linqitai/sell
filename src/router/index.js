import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    {
      path: '/Goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/Ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/Seller',
      name: 'Seller',
      component: Seller
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})
