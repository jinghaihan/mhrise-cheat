<template>
  <a-modal
    :visible="visible"
    @cancel="closeModal"
    @ok="onSubmit"
    :width="450"
    :maskClosable="false"
    title="狩猎记录"
  >
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" autocomplete="off">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item >
            <template slot="label">
              <span>数量</span>
              <a-tooltip>
                <template slot="title">
                  狩猎数 = 讨伐数 + 捕获数
                </template>
                <a-icon type="question-circle" class="tip"></a-icon>
              </a-tooltip>
            </template>
            <a-input-group compact>
              <a-input-number placeholder="狩猎数"
                              v-model="param.hunted"
                              :precision="0"
                              :min="0"
                              :max="9999"
                              style="width: 35%"
                              allowClear></a-input-number>
              <a-input-number placeholder="捕获数"
                              v-model="param.captured"
                              :precision="0"
                              :min="0"
                              :max="9999"
                              style="width: 35%"
                              allowClear></a-input-number>
            </a-input-group>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="金冠" >
            <a-col :span="10">
              <a-checkbox v-model="param.longest">
                <img :src="icon.longest" class="longest checkbox-image">最大
              </a-checkbox>
            </a-col>
            <a-col :span="10">
              <a-checkbox v-model="param.shortest">
                <img :src="icon.shortest" class="shortest checkbox-image">最小
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
      param: {
        hunted: undefined,
        captured: undefined,
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
    this.param = _.cloneDeep(this.data.data.param)
  },
  methods: {
    onSubmit () {
      if (this.param.hunted < this.param.captured) {
        if (!this.param.hunted && this.param.hunted !== 0) {
          this.$message.error('捕获数不允许大于狩猎数')
          return
        }
      }
      this.$emit('submit', this.param)
    },
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
  .checkbox-image{
    height: 20px;
  }
  .longest{
    margin: 0px 1px 4px 0;
  }
  .shortest{
    transform: scale(1.15);
    margin: 0 1px 6px 1px;
  }
  .tip{
    color: #1890ff;
    margin-top: 12px;
    margin-left: 4px;
  }
</style>
