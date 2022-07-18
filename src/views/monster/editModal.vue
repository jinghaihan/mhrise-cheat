<template>
  <a-modal
    :visible="visible"
    @cancel="closeModal"
    @ok="onSubmit"
    :width="480"
    :maskClosable="false"
    title="狩猎记录"
  >
    <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" autocomplete="off">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item >
            <template slot="label">
              <span>狩猎数/捕获数</span>
              <a-tooltip>
                <template slot="title">
                  狩猎数 = 讨伐数 + 捕获数
                </template>
                <a-icon type="question-circle" class="tip"></a-icon>
              </a-tooltip>
            </template>
            <a-input-group compact>
              <a-input-number placeholder="狩猎数"
                              v-model="params.hunted"
                              :precision="0"
                              :min="0"
                              :max="9999"
                              style="width: 40%"
                              allowClear>
              </a-input-number>
              <a-input-number placeholder="捕获数"
                              v-model="params.captured"
                              :precision="0"
                              :min="0"
                              :max="9999"
                              :disabled="data.data.type === 'Apex' || data.data.type === 'Elder Dragon'"
                              style="width: 40%"
                              allowClear>
              </a-input-number>
            </a-input-group>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="怪异讨伐数">
            <a-input-number placeholder="怪异讨伐数"
                            v-model="params.anomaly"
                            :precision="0"
                            :min="0"
                            :max="9999"
                            style="width: 80%"
                            allowClear>
            </a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="金冠" >
            <a-col :span="10">
              <a-checkbox v-model="params.longest" :disabled="!data.data.longest">
                最大
              </a-checkbox>
            </a-col>
            <a-col :span="10">
              <a-checkbox v-model="params.shortest" :disabled="!data.data.shortest">
                最小
              </a-checkbox>
            </a-col>
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
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      params: {
        hunted: undefined,
        captured: undefined,
        anomaly: undefined,
        longest: undefined,
        shortest: undefined
      },
      icon: {
        longest: require('@/assets/icon/longest.png'),
        shortest: require('@/assets/icon/shortest.png')
      }
    }
  },
  created () {
    // 回显
    this.params = _.cloneDeep(this.data.data.params)
  },
  methods: {
    onSubmit () {
      if (this.params.hunted < this.params.captured) {
        if (!this.params.hunted && this.params.hunted !== 0) {
          this.$message.error('捕获数不允许大于狩猎数')
          return
        }
      }
      this.$emit('submit', this.params)
    },
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
  .tip{
    color: #1890ff;
    margin-top: 12px;
    margin-left: 4px;
  }
</style>
