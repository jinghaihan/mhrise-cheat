<template>
  <a-modal
    :visible="visible"
    @cancel="closeModal"
    @ok="onSubmit"
    :width="400"
    title="全道具"
  >
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" autocomplete="off">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="游戏版本" class="required">
            <a-select placeholder="请选择游戏版本"
                      v-model="param.version"
                      allowClear>
              <a-select-option v-for="opt in version" :key="opt.key" :value="opt.key">
                {{opt.value}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="数量" class="required">
            <a-input-number placeholder="请输入数量"
                              v-model="param.count"
                              :precision="0"
                              :min="1"
                              :max="9999"
                              allowClear
                              style="width: 100%"></a-input-number>
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
      param: {
        version: this.version[0].key
      }
    }
  },
  methods: {
    onSubmit () {
      try {
        Object.keys(this.param).forEach(key => {
          if (!this.param[key] && this.param[key] !== 0) {
            throw new Error('请完整填写配置')
          }
        })
        this.$emit('submit', this.param)
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
