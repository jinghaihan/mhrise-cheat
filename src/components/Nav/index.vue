<script>
export default {
  data () {
    return {
      navs: [],
      selectedKeys: []
    }
  },
  computed: {
    listenNavs () {
      return this.$store.state.user.navs
    }
  },
  watch: {
    listenNavs: {
      deep: true,
      immediate: true,
      handler: function (navs) {
        this.navs = _.cloneDeep(navs)
      }
    },
    $route: {
      deep: true,
      immediate: true,
      handler: function (route) {
        this.handleAcitve(route)
      }
    }
  },
  methods: {
    // 导航栏点击事件
    handleClick (nav) {
      this.$store.commit('user/SET_MENUS', nav.menus)
      this.selectedKeys = [nav.key]
      // 不存在子菜单/且当前路由地址与导航栏地址不同
      if ((!nav.menus || !nav.menus.length) && (this.$route.fullPath !== nav.path)) {
        this.$router.push(nav.path)
      }
    },
    // 处理导航栏选中状态
    handleAcitve (route) {
      let self = this
      self.navs.forEach(nav => {
        if (nav.menus && nav.menus.length) {
          // 存在子菜单
          let findCurrentMenu = function (menus) {
            menus.forEach(menu => {
              if (route.fullPath === menu.path) {
                self.handleUpdate(nav)
              } else {
                if (menu.children && menu.children.length) {
                  return findCurrentMenu(menu.children)
                }
              }
            })
          }
          findCurrentMenu(nav.menus)
        } else {
          // 不存在子菜单
          if (route.fullPath === nav.path) {
            self.handleUpdate(nav)
          }
        }
      })
    },
    // 更新侧边栏菜单数据
    handleUpdate (nav) {
      this.selectedKeys = [nav.key]
      this.$store.commit('user/SET_MENUS', nav.menus)
    }
  },
  render () {
    let self = this
    
    const navProps = {
      mode: 'horizontal',
      theme: 'light',
      selectedKeys: self.selectedKeys
    }

    function renderNavs (navs) {
      return navs.map(nav => {
        return (
          <a-menu-item key={ nav.key } on={ { click: () => self.handleClick(nav) } }>
            { nav.icon && <a-icon type={ nav.icon } /> }
            <span>{ nav.title }</span>
          </a-menu-item>
        )
      })
    }

    return (
      <a-menu props={ navProps }>
        {renderNavs(self.navs)}
      </a-menu>
    )
  }
}
</script>

<style lang="less" scoped>
  ::v-deep.ant-menu-horizontal{
    border: none;
    height: 100%;
    line-height: 75px;
    font-size: 16px;
  }
</style>
