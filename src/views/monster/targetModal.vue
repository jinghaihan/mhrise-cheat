<template>
  <a-modal
    :visible="visible"
    @cancel="closeModal"
    @ok="onSubmit"
    :width="400"
    :maskClosable="false"
    title="目标体型"
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
        <a-col :span="24">
          <a-form-item label="目标对象" class="required">
            <a-input-number placeholder="请输入目标对象"
                      v-model="params.target"
                      :min="1"
                      :max="3"
                      allowClear
                      style="width: 100%">
            </a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="体型倍率" class="required">
            <a-select placeholder="请选择体型倍率"
                      v-model="params.size"
                      allowClear>
              <a-select-option v-for="opt in sizeOptions" :key="opt" :value="opt">
                {{opt}}倍
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>

const sizeOptions = [ '0.88', '0.9', '0.95', '1.0', '1.16', '1.19', '1.25' ]
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
        version: this.version[0].key,
        target: 1,
        size: undefined
      },
      sizeOptions
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
