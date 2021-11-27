import config from '@/../package.json'

let systemName = config.name

export function setSharedComponent () {
  let sharedComponent = {}
  sharedComponent[systemName] = {}
  // 获取shared中入口文件注册的所有共享组件
  let components = require('@/components/shared/index.js')
  // 遍历注册
  Object.keys(components).forEach(name => {
    sharedComponent[systemName][name] = components[name]
  })
  sharedComponent = Object.assign(window.sharedComponent, sharedComponent)
  window.sharedComponent = _.cloneDeep(sharedComponent)
}
