<template>
  <div class="copyright">
    Copyright
    <a-icon class="icon" type="copyright"></a-icon>
    <span>{{copyright}}</span>
  </div>
</template>

<script>
export default {
  props: {
    copyright: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  .copyright{
    display: flex;
    justify-content: center;
    align-items: center;
    .icon{
      display: inline-block;
      margin: 2px 8px 0 4px;
    }
  }
</style>
