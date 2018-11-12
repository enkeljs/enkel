import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      components: {
        HomeRouter: () => import('../components/pages/Login')
      }
    },
    {
      path: '/',
      name: 'home',
      components: {
        HomeRouter: () => import('../components/Home')
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
