import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ '../views/IndexView.vue')
  },
  {
    path: '/packages',
    name: 'Packages',
    component: () => import(/* webpackChunkName: "packages" */ '../views/PackagesView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
