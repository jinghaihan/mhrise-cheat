import config from '@/../package.json'
import Vue from 'vue'
import Router from 'vue-router'
import defaultRoutes from './routes'
import { store } from '@/store'
import { AppLayout, ViewLayout } from '@/components/Layout'

Vue.use(Router)

function createRouter () {
  return new Router({
    mode: 'history',
    base: window.__POWERED_BY_QIANKUN__ ? '/' + config.name : process.env.BASE_URL,
    routes: defaultRoutes
  })
}
let router = null
// 初始化路由实例
export function initRouter () {
  router = createRouter()

  if (!window.__POWERED_BY_QIANKUN__) {
    router.beforeEach((to, from, next) => {
      // NProgress.start()
      let loggedIn = Vue.ss.get('loggedIn')
      if (loggedIn || !window.custom.loginPage) {
        handleBeforeEach(to, from, next)
      } else {
        if (to.name === 'login') {
          next()
        } else {
          next({ path: '/login' })
        }
        Vue.ss.set('loggedIn', false)
      }
    })
  }

  function handleBeforeEach (to, from, next) {
    let getters = store.getters['user/GET_ROUTES']
    // 判断当前是否已经处理过路由信息
    if (getters && Object.keys(getters).length > 0) {
      next()
      return
    }
    // 处理路由信息后进行跳转
    store.dispatch('user/Navigation')
    next()
  }
  
  return router
}
// routerConfig对象
let routes = {
  path: '/',
  name: '',
  meta: { title: '' },
  // 在微前端模式下采用ViewLayout自启动模式下采用完整的AppLayout
  component: window.__POWERED_BY_QIANKUN__ ? ViewLayout : AppLayout,
  children: []
}

// 动态路由表
const routerMap = {
  'home': () => import('@/views/home/home.vue')
}
// 动态路由处理
export function generatorRouter (data) {
  return new Promise((resolve, reject) => {
    data.forEach(route => {
      const currentRoute = {
        // 路由路径，target地址
        path: '/' + route.target,
        // 路由名称
        name: route.target,
        // 该组件对应的路由组件
        component: routerMap[route.target],
        meta: {
          title: route.title
        }
      }
      routes.children.push(currentRoute)
    })
    // 设置动态路由重定向路径
    routes.redirect = routes.children[0].path
    resolve(routes)
  })
}
