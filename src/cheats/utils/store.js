import _ from 'lodash'
import store from '@/store/index.js'

export function setCheat (data) {
  let cheats = store.state.user.cheats || {}
  cheats[data.title] = data
  
  store.commit('user/SET_CHEATS', _.cloneDeep(cheats))
}

export function deleteCheat (titles) {
  let cheats = store.state.user.cheats || {}
  titles.forEach(title => {
    delete cheats[title]
  })

  store.commit('user/SET_CHEATS', _.cloneDeep(cheats))
}
