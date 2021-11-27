<template>
  <div class="sider-container">
    <MENU @full="handleFullScreen"></MENU>
  </div>
</template>

<script>
import MENU from '@comp/Menu/index.vue'
export default {
  components: { MENU },
  methods: {
    handleFullScreen (fullScreen) {
      this.$emit('full', fullScreen)
    }
  }
}
</script>

<style lang="less" scoped>
  .sider-container{
    max-height: 100%;
  }
</style>
