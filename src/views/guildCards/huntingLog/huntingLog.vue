<template>
  <div class="container">
    
  </div>
</template>

<script>
import huntingLog from '@/cheat/database/huntingLog.js'

export default {
  name: 'huntingLog',
  data () {
    return {
      keys: []
    }
  },
  created () {
    console.log(huntingLog)
  },
  methods: {
    renderImage (name) {
      const context = require.context('@/assets/monster/', true, /\.png$/)
      const imgName = `./${name}.png`
      const src = context(imgName) 
      return src
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    height: 100%;
  }
</style>
