<template>
  <div @click="onClick">
    Hello World
    <demo-modal v-if="visible" :visible="visible" @close="visible = false"></demo-modal>
  </div>
</template>

<script>
import demoModal from '../Modal/index.vue'

export default {
  components: { demoModal },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    onClick () {
      this.visible = true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
