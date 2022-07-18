<template>
  <div class="container" ref="container">
    <a-card>
      <template slot="extra">
        <a-button class="operation-button" type="danger" icon="rest" @click="onClear">重置</a-button>
        <a-button class="operation-button" icon="shopping-cart" @click="onCart">加入购物车</a-button>
      </template>
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" autocomplete="off">
        <a-row>
          <div class="title">
            <a-divider class="title-divider" type="vertical" />
            基本信息
          </div>
          <a-col :span="12">
            <a-form-item label="游戏版本" class="required">
              <a-select placeholder="请输入游戏版本"
                        v-model="params.version"
                        allowClear>
                <a-select-option v-for="opt in versionOptions" :key="opt.key" :value="opt.key">
                  {{opt.value}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="猎人等级">
              <a-input-number style="width: 100%" :min="9" :max="999" v-model="params.rank" placeholder="猎人等级"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="大师等级">
              <a-input-number style="width: 100%" :min="7" :max="999" v-model="params.masterRank" placeholder="大师等级"></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- 任务完成次数 -->
        <a-row>
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
        <a-row>
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
              <a-input-number :disabled="true" style="width: 100%" :min="0" :max="9999" v-model="params.praise" placeholder="获赞次数"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item>
              <template slot="label">
                <span>总讨伐数/总捕获数</span>
                <a-tooltip>
                  <template slot="title">
                    总狩猎数 = 总讨伐数 + 总捕获数
                  </template>
                  <a-icon type="question-circle" class="tip"></a-icon>
                </a-tooltip>
              </template>
              <a-row>
                <a-input-group compact>
                  <a-input-number style="width: 50%" :min="0" :max="99999" v-model="params.hunted" placeholder="总讨伐数完成次数" />
                  <a-input-number style="width: 50%" :min="0" :max="99999" v-model="params.captured" placeholder="总捕获数完成次数" />
                </a-input-group>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import pointer from '@/cheats/database/pointer.js'
import { generateStatsCheat } from '@/cheats/template/stats.js'

export default {
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
        masterRank: undefined,
        rank: undefined,
        // 总游戏时间
        time: undefined,
        // 获赞次数
        praise: undefined
      },
      versionOptions: []
    }
  },
  created () {
    this.handleVersionOptions()
  },
  methods: {
    handleVersionOptions () {
      Object.keys(pointer.usage).forEach(version => {
        this.versionOptions.push({
          key: version,
          value: version
        })
      })
      this.params.version = this.versionOptions[0].key
    },
    onCart () {
      if (!this.params.version) {
        this.$message.error('请选择游戏版本')
        return
      }

      if (!this.params.hunted && this.params.captured) {
        this.$message.error('请输入总讨伐数')
        return
      }

      if (this.params.hunted && !this.params.captured) {
        this.$message.error('请输入总捕获数')
        return
      }

      generateStatsCheat({
        version: this.params.version,
        data: this.params
      })
    },
    onClear () {
      this.params = {
        version: this.versionOptions[0].key
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    height: 100%;
  }
  .operation-button{
    margin-left: 12px;
  }
  .title{
    .title-divider{
      background: #1890ff;
      width: 2px;
    }
  }
  .tip{
    color: #1890ff;
    margin-top: 12px;
    margin-left: 4px;
  }
</style>
