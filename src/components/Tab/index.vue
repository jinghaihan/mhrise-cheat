<script>
export default {
  data () {
    return {
      activeTab: null,
      tabs: []
    }
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: function (route) {
        this.handleUpdate({
          title: route.meta.title,
          path: route.fullPath
        })
      }
    }
  },
  methods: {
    // 由导航栏/菜单导致的tab更新
    handleUpdate (data) {
      if (!this.tabs.filter(tab => tab.path === data.path).length) {
        this.tabs.push({
          title: data.title,
          path: data.path
        })
      }
      this.activeTab = data.path
    },
    // 点击tab页的路由跳转
    handleChange (path) {
      this.activeTab = path
      this.$router.push(path)
    },
    // 点击tab页右侧的关闭按钮
    handleClose (e, tab) {
      // 阻止事件冒泡
      if (e) e.stopPropagation()
      // 最后一个标签页，不允许关闭
      if (this.tabs.length > 1) {
        this.handleRemove(tab.path)
      }
    },
    // 关闭左侧标签页
    handleCloseLeft (currentIndex) {
      if (currentIndex > 0) {
        this.tabs.forEach((tab, index) => {
          if (index < currentIndex) {
            this.handleClose(null, tab)
          }
        })
      }
    },
    // 关闭右侧标签页
    handleCloseRight (currentIndex) {
      if (currentIndex < this.tabs.length - 1) {
        this.tabs.forEach((tab, index) => {
          if (index > currentIndex) {
            this.handleClose(null, tab)
          }
        })
      }
    },
    handleCloseOther (path) {
      if (this.tabs.length > 1) {
        this.tabs.forEach(tab => {
          if (tab.path !== path) {
            this.handleClose(null, tab)
          }
        })
      }
    },
    // 右键tab页的批量关闭
    handleMenuClose (type, index) {
      switch (type) {
        case 'self':
          this.handleClose(null, this.tabs[index])
          break
        case 'left':
          this.handleCloseLeft(index)
          break
        case 'right':
          this.handleCloseRight(index)
          break
        case 'other':
          this.handleCloseOther(this.tabs[index].path)
          break
        default:
          break
      }
    },
    handleRemove (path) {
      this.tabs = this.tabs.filter(tab => tab.path !== path)
      // 如果当前关闭的是当前激活的tab
      if (path === this.activeTab) {
        this.activeTab = this.tabs[this.tabs.length - 1].path
        this.handleChange(this.activeTab)
      }
    }
  },
  render () {
    let self = this

    const tabProps = {
      type: 'editable-card',
      hideAdd: true,
      activeKey: self.activeTab
    }
    const tabEvents = {
      change: self.handleChange
    }

    function renderTabs (tabs) {
      return tabs.map((tab, index) => {
        return (
          <a-tab-pane class="tab-pane" key={tab.path}>
            <div class="tab-card" slot="tab">
              {renderDropdown(tab, index)}
            </div>
          </a-tab-pane>
        )
      })
    }

    function renderDropdown (tab, index) {
      return (
        <a-dropdown trigger={['contextmenu']}>
          <div class="ant-dropdown-link" on={ { click: e => e.preventDefault() } }>
            <span class="title">{tab.title}</span>
            {renderIcon(tab)}
          </div>
          <a-menu slot="overlay" on={ { click: ({ item, key, keyPath }) => self.handleMenuClose(key, index) } }>
            <a-menu-item key="self">关闭当前页</a-menu-item>
            <a-menu-item key="left">关闭左侧</a-menu-item>
            <a-menu-item key="right">关闭右侧</a-menu-item>
            <a-menu-item key="other">关闭其他</a-menu-item>
          </a-menu>
        </a-dropdown>
      )
    }

    function renderIcon (tab) {
      if (self.tabs.length > 1) {
        return (
          <a-icon class="close"
            type="close"
            on={ { click: e => self.handleClose(e, tab) } } />
        )
      } else {
        return (
          <span></span>
        )
      }
    }

    return (
      <div class="tab-container">
        <a-tabs props={ tabProps } on={ tabEvents }>
          {renderTabs(self.tabs)}
        </a-tabs>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
  ::v-deep.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab{
    border: none;
    background: #F5F5F5;
    padding: 0;
  }
  ::v-deep.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active{
    background: #fff;
  }
  .tab-container{
    height: 100%;
    .tab-pane{
      height: 0;
    }
    .tab-card{
      .ant-dropdown-link{
        padding: 0 24px;
      }
      .close{
        cursor: pointer;
        color: #8B98A6;
        margin-left: 12px;
      }
    }
  }
</style>
