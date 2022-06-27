<template>
  <div class="action-container">
    <a-icon class="action-icon"
            type="poweroff"
            title="退出登录"
            v-if="needToLogin"
            @click="logout">
    </a-icon>
    <shopping-cart></shopping-cart>
  </div>
</template>

<script>
import Vue from 'vue'
import shoppingCart from '@/components/ShoppingCart/index.vue'

export default {
  components: { shoppingCart },
  data () {
    return {
      needToLogin: window.custom.needToLogin
    }
  },
  methods: {
    logout () {
      let self = this
      self.$confirm({
        title: '确定退出登录?',
        onOk () {
          Vue.ss.set('loggedIn', false)
          self.$router.push('/login')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .action-container{
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0 8px;
    .action-icon{
      font-size: 22px;
      cursor: pointer;
      display: flex;
      height: 100%;
      align-items: center;
      padding: 0 12px;
    }
    .action-icon:hover{
      background: rgba(0,0,0,.025);
    }
  }
</style>
