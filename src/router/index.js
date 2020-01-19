import Vue from 'vue'
import Router from 'vue-router'
import Communication from '@/components/Communication'
import login from '@/components/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Communication',
      component: Communication
    },
    {
      path: '/login',
      name: login,
      component: login
    }
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ]
})
