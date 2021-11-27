<template>
  <div class="trigger-container" @click="handleClick">
    <a-icon :type="'double-' + direction"></a-icon>
  </div>
</template>

<script>
export default {
  data () {
    return {
      direction: 'left'
    }
  },
  methods: {
    handleClick () {
      if (this.direction === 'left') {
        this.direction = 'right'
      } else {
        this.direction = 'left'
      }
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="less" scoped>
  .trigger-container{
    width: 24px;
    height: 64px;
    box-shadow: 0px 3px 8px 0px rgba(185, 200, 210, 0.5);
    border-radius: 0px 5px 5px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
</style>
