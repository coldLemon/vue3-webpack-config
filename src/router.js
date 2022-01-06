import Home from '../src/pages/home/home.vue'
import { createRouter, createWebHistory } from 'vue-router'
  const routes = [
    {
      path:'/',
      name:'home',
      component: Home
    }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  // 路由权限
  router.beforeEach((to, from, next) => {
    if(to.path == '/login'){
      next()
      return
    }
    next()
  })
  export default router
  