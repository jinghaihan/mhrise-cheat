import config from '@/../package.json'
import Vue from 'vue'
import { USER_NAME, ACCESS_SECURITY, ACCESS_TOKEN, NAVS, MENUS } from '@/store/mutation-types'
import { handleMenus, generateRoutes, filterMenus } from '@/utils/menu.js'
import { generatorRouter } from '@/router/index.js'
import menu from '@/mock/menu.js' 

const user = {
  namespaced: true,
  state: {
    username: '',
    security: '',
    token: '',
    navs: [],
    menus: [],
    routes: {}
  },
  getters: {
    GET_ROUTES (state) {
      return state.routes
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      Vue.ss.set(USER_NAME, user)
      state.username = user
    },
    SET_SECURITY: (state, security) => {
      Vue.ss.set(ACCESS_SECURITY, security)
      state.security = security
    },
    SET_TOKEN: (state, token) => {
      Vue.ss.set(ACCESS_TOKEN, token)
      state.token = token
    },
    SET_NAVS: (state, navs) => {
      Vue.ss.set(NAVS, navs)
      state.navs = navs
    },
    SET_MENUS: (state, menus) => {
      Vue.ss.set(MENUS, menus)
      state.menus = menus
    },
    SET_ROUTES: (state, routes) => {
      state.routes = routes
    }
  },
  actions: {
    // 登录
    Login ({ commit }, params) {
      
    },
    // 退出登录
    Logout ({ commit, state }) {
      
    },
    Security ({ commit }) {
      
    },
    // 获取菜单
    Navigation ({ commit, state, dispatch }) {
      // 过滤属于该微应用的菜单
      let data = filterMenus(menu, '/' + config.name + '/')
      // 自启动时进行动态路由处理
      dispatch('GenerateRoutes', generateRoutes(data)[config.name])
      let navs = []
      let menus = []
      if (window.custom.menuLayout === 'nav') {
        // 导航栏模式布局
        data.forEach((nav, index) => {
          navs.push({
            title: nav.title,
            icon: nav.icon ? nav.icon : 'table',
            path: nav.activeRule ? '/' + nav.target : '',
            key: index.toString(),
            menus: []
          })

          if (nav.children && nav.children.length) {
            // 如果存在子菜单
            navs[index].menus = handleMenus(nav.children)
          }
        })
        commit('SET_NAVS', navs)
      } else if (window.custom.menuLayout === 'menu') {
        // 侧边栏模式布局
        menus = handleMenus(data)
        commit('SET_MENUS', menus)
      }
    },
    // 动态路由
    GenerateRoutes ({ commit }, data) {
      generatorRouter(data).then(routes => {
        commit('SET_ROUTES', routes)
      })
    }
  }
}

export default user
