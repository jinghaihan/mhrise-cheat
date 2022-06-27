<template>
  <a-modal
    :visible="visible"
    @cancel="closeModal"
    @ok="onSubmit"
    :width="400"
    :maskClosable="false"
    title="全金冠"
  >
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" autocomplete="off">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="游戏版本" class="required">
            <a-select placeholder="请选择游戏版本"
                      v-model="params.version"
                      allowClear>
              <a-select-option v-for="opt in version" :key="opt.key" :value="opt.key">
                {{opt.value}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    version: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      params: {
        version: this.version[0].key
      }
    }
  },
  methods: {
    onSubmit () {
      try {
        Object.keys(this.params).forEach(key => {
          if (!this.params[key] && this.params[key] !== 0) {
            throw new Error('请完整填写配置')
          }
        })
        this.$emit('submit', this.params)
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
