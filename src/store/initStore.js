import Vue from 'vue'
import store from './index'
import config from './config'
import {
  USER_NAME,
  ACCESS_SECURITY,
  ACCESS_TOKEN,
  NAVS,
  MENUS,
  KEEPALIVE
} from './mutation-types'
const { user, micro } = config

export default function initStore () {
  // user
  store.commit('user/SET_USER', Vue.ss.get(USER_NAME, user.user))
  store.commit('user/SET_SECURITY', Vue.ss.get(ACCESS_SECURITY, user.security))
  store.commit('user/SET_TOKEN', Vue.ss.get(ACCESS_TOKEN, user.token))
  store.commit('user/SET_NAVS', Vue.ss.get(NAVS, user.navs))
  store.commit('user/SET_MENUS', Vue.ss.get(MENUS, user.menus))

  // micro
  store.commit('micro/SET_KEEPALIVE', Vue.ss.get(KEEPALIVE, micro.keepAlive))
}
