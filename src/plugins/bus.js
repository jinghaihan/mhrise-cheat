import Vue from 'vue'

const eventBus = (Vue) => {
  Vue.prototype.$bus = new Vue({
    methods: {
      on (event, ...args) {
        this.$on(event, ...args)
      },
      emit (event, callback) {
        this.$emit(event, callback)
      },
      off (event, callback) {
        this.$off(event, callback)
      }
    }
  })
}

Vue.use(eventBus)
