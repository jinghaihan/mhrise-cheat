// 递归整理菜单结构
export function handleMenus (children, target) {
  let menus = []
  function recursiveMenus (children, arr, key) {
    children.forEach((child, index) => {
      arr.push({
        title: child.title,
        icon: child.icon ? child.icon : 'table',
        path: child.activeRule ? '/' + child.target : '',
        key: (key ? key + '-' + index : index).toString(),
        children: []
      })
      // 当存在次级菜单，继续递归处理
      if (child.children && child.children.length) {
        return recursiveMenus(child.children, arr[index].children, arr[index].key)
      }
    })
  }
  recursiveMenus(children, menus)
  return menus
}
// 计算各个微应用路由
export function generateRoutes (data) {
  let routes = {}
  function recursiveRoutes (data, map) {
    data.forEach((item, index) => {
      // 如果当前数据存在activeRule，则证明其为子应用的页面
      let key = item.activeRule.replace(/[/]/g, '')
      if (key) {
        if (!map[key]) map[key] = []
        map[key].push(item)
      }
      // 如果当前存在
      if (item.children && item.children.length) {
        return recursiveRoutes(item.children, map)
      }
    })
  }
  recursiveRoutes(data, routes)
  return routes
}
// 计算菜单openKeys
export function generateOpenKeys (key) {
  let openKeys = []
  let keys = key.split('-')
  for (let i = 0; i < keys.length; i++) {
    let temp = _.cloneDeep(keys)
    openKeys.push(temp.splice(0, i + 1).join('-'))
  }
  return openKeys
}
// 过滤当前系统的菜单数据
export function filterMenus (data, activeRule) {
  let menus = []

  // 过滤掉与activeRule不符的菜单选项
  function recursiveFilterRule (arr, stash) {
    arr.forEach(item => {
      if (item.activeRule === activeRule) {
        // activeRule为本系统的rule
        stash.push(_.cloneDeep(item))
        stash[stash.length - 1].children = []
      } else if (item.children && item.children.length) {
        // 如果存在children
        stash.push(_.cloneDeep(item))
        stash[stash.length - 1].children = []
      }
      // 当存在children时递归处理
      if (item.children && item.children.length) {
        return recursiveFilterRule(item.children, stash[stash.length - 1].children)
      }
    })
  }
  recursiveFilterRule(data, menus)

  // 过滤掉children为空且activeRule不符合的菜单
  function recursiveFilterEmpty (arr) {
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i]
      // 如果activeRule不相符，且children为空
      if (item.activeRule !== activeRule && !item.children.length) {
        arr.splice(i, 1)
        i--
      }
    }
  }
  recursiveFilterEmpty(menus)

  return menus
}
