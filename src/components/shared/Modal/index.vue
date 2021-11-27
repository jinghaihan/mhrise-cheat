<template>
  <a-modal :visible="visible" @cancel="$emit('close')">
    sample
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>
