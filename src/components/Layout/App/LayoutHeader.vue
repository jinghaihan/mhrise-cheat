<template>
  <div class="header-container">
    <!-- logo区域 -->
    <div :class="`logo-container ${theme}-logo-container container`">
      <img :src="require('@/assets/logo.png')" />
    </div>
    <!-- 导航栏区域 -->
    <div class="nav-container container">
      <NAV></NAV>
    </div>
    <!-- 系统操作区域 -->
    <div class="action-container container">
      <ACTION></ACTION>
    </div>
  </div>
</template>

<script>
import NAV from '@comp/Nav/index.vue'
import ACTION from '@comp/Action/index.vue'

export default {
  components: { NAV, ACTION },
  data () {
    return {
      theme: window.custom.menuTheme,
      systemName: window.custom.systemName
    }
  }
}
</script>

<style lang="less" scoped>
  .header-container{
    height: 100%;
    display: flex;
    flex: 1 0 1;
    .container{
      height: 100%;
    }
    .logo-container{
      width: 260px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 20px;
      font-weight: bold;
      padding: 0 12px;
      >img{
        height: 100%;
      }
    }
    .dark-logo-container{
      // background: hsl(208, 26%, 23%);
      // color: #fff;
    }
    .light-logo-container{
      // background: #1890ff;
      // color: #fff;
    }
    .nav-container{
      width: calc(~"100% - 460px");
    }
    .action-container{
      width: 200px;
    }
  }
</style>
