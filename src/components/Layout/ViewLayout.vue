<script>
export default {
  data () {
    return {
      keepAlive: []
    }
  },
  computed: {
    listenKeepAlive () {
      return this.$store.state.micro.keepAlive
    }
  },
  watch: {
    listenKeepAlive: {
      deep: true,
      immediate: true,
      handler (keepAlive) {
        this.handleKeepAlive(keepAlive)
      }
    }
  },
  methods: {
    handleKeepAlive (keepAlive) {
      let arr = []
      keepAlive.forEach(item => {
        let temp = item.split('/')
        arr.push(temp[temp.length - 1])
      })
      this.keepAlive = arr
    }
  },
  render () {
    let props = {
      include: this.keepAlive
    }

    return (
      <div class="container">
        <keep-alive props={ props }>
          <router-view></router-view>
        </keep-alive>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
  .container{
    height: 100%;
    padding: 10px;
  }
</style>
