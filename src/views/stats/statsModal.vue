<template>
  <a-modal
    :visible="visible"
    @cancel="closeModal"
    @ok="onSubmit"
    okText="加入购物车"
    :width="1100"
    :maskClosable="false"
    title="其他"
  >
    <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" autocomplete="off">
      <a-row :gutter="24">
        <div class="title">
          <a-divider class="title-divider" type="vertical" />
          基本信息
        </div>
        <a-col :span="12">
          <a-form-item label="游戏版本" class="required">
            <a-select placeholder="请输入游戏版本"
                      v-model="params.version"
                      allowClear>
              <a-select-option v-for="opt in versions" :key="opt.key" :value="opt.key">
                {{opt.value}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="猎人等级">
            <a-input-number style="width: 100%" :min="0" :max="999" v-model="params.rank" placeholder="猎人等级"></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- 任务完成次数 -->
      <a-row :gutter="24">
        <div class="title">
          <a-divider class="title-divider" type="vertical" />
          任务完成次数
        </div>
        <a-col :span="12">
          <a-form-item label="村庄任务">
            <a-input-number style="width: 100%" :min="0" :max="9999" v-model="params['A0']" placeholder="村庄任务完成次数"></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="集会所下位任务">
            <a-input-number style="width: 100%" :min="0" :max="9999" v-model="params['A4']" placeholder="集会所下位任务完成次数"></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="集会所上位任务">
            <a-input-number style="width: 100%" :min="0" :max="9999" v-model="params['A8']" placeholder="集会所上位任务完成次数"></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="百龙夜行">
            <a-input-number style="width: 100%" :min="0" :max="9999" v-model="params['AC']" placeholder="百龙夜行完成次数"></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="斗技大会任务">
            <a-input-number style="width: 100%" :min="0" :max="9999" v-model="params['B0']" placeholder="斗技大会任务完成次数"></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="集会所大师等级任务">
            <a-input-number style="width: 100%" :min="0" :max="9999" v-model="params['B4']" placeholder="集会所大师等级任务完成次数"></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="盟友任务：重要调查任务">
            <a-input-number style="width: 100%" :min="0" :max="9999" v-model="params['B8']" placeholder="盟友任务：重要调查任务完成次数"></a-input-number>
          </a-form-item>
        </a-col>
         <a-col :span="12">
          <a-form-item label="盟友任务：盟友同行任务">
            <a-input-number style="width: 100%" :min="0" :max="9999" v-model="params['BC']" placeholder="盟友任务：盟友同行任务完成次数"></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="怪异任务：★1～4">
            <a-input-number style="width: 100%" :min="0" :max="9999" v-model="params['C0']" placeholder="怪异任务：★1～4完成次数"></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- 猎人活动记录 -->
      <a-row :gutter="24">
        <div class="title">
          <a-divider class="title-divider" type="vertical" />
          猎人活动记录
        </div>
        <a-col :span="12">
          <a-form-item label="总游戏时间">
            <a-input-number style="width: 100%" :min="0" :max="9999" v-model="params.time" placeholder="总游戏时间"></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="获赞次数">
            <a-input-number style="width: 100%" :min="0" :max="9999" v-model="params.praise" placeholder="获赞次数"></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="总讨伐数">
            <a-input-number style="width: 100%" :min="0" :max="9999" v-model="params.hunted" placeholder="总讨伐数完成次数"></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="总捕获数">
            <a-input-number style="width: 100%" :min="0" :max="9999" v-model="params.captured" placeholder="总捕获数完成次数"></a-input-number>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { generateStatsCheat } from '@/cheats/template/stats.js'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    versions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      params: {
        version: undefined,
        // 任务完成次数
        'A0': undefined,
        'A4': undefined,
        'A8': undefined,
        'AC': undefined,
        'B0': undefined,
        'B4': undefined,
        'B8': undefined,
        'BC': undefined,
        'C0': undefined,
        // 猎人活动记录
        hunted: undefined,
        captured: undefined,
        // 等级
        rank: undefined,
        // 总游戏时间
        time: undefined,
        // 获赞次数
        praise: undefined
      }
    }
  },
  created () {
    this.params.version = this.versions[0].key
  },
  methods: {
    onSubmit () {
      if (!this.params.version) {
        this.$message.error('请选择游戏版本')
        return
      }

      generateStatsCheat({
        version: this.params.version,
        data: this.params
      })
      
      this.closeModal()
    },
    closeModal () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
  .title{
    .title-divider{
      background: #1890ff;
      width: 2px;
    }
  }
</style>
