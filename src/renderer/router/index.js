import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: () => import('../components/pages/Login')
    },
    {
      path: '/',
      name: 'landing-page',
      component: () => import('../components/Home')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
