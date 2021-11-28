<template>
  <div class="container">
    <!-- 表单 -->
    <div class="form-wrapper">
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" autocomplete="off">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="8" :sm="24">
            <a-form-item label="游戏版本">
              <a-select placeholder="请选择游戏版本"
                        v-model="param.version"
                        allowClear
                        :disabled="!!data.length">
                <a-select-option v-for="opt in versionOptions" :key="opt.key" :value="opt.key">
                  {{opt.value}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="14" :lg="12" :sm="24">
            <a-form-item label="怪物">
              <a-select placeholder="请选择怪物"
                        v-model="param.monster"
                        allowClear
                        show-search
                        :filter-option="filterOption">
                <a-select-option v-for="opt in monsterOptions" :key="opt.key" :value="opt.key">
                  {{opt.value}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="4" :lg="4" :sm="24" :style="{ textAlign: 'right' }">
            <a-form-item class="button">
              <a-button icon="plus-circle" type="primary" @click="onAdd" :disabled="isAddDisabled()">添加</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 展示 -->
    <div class="list-wrapper">
      <!-- 操作 -->
      <div class="option-wrapper">
        <div class="left-wrapper">
          <a-button icon="cloud-download" @click="onDownload" :disabled="!data.length">下载全部</a-button>
          <a-button icon="rest" type="danger" @click="onClear" :disabled="!data.length">清空全部</a-button>
        </div>
        <div class="right-wrapper">
          <a-button icon="sync" type="primary" @click="onCrown">全金冠</a-button>
        </div>
      </div>
      <!-- 卡片 -->
      <div class="card-wrapper">
        <a-card hoverable class="monster-card" v-for="(item, index) in data" :key="index">
          <img
            slot="cover"
            :src="renderImage(item.id)"
          />
          <a-card-meta :title="item.name">
            <template slot="description">
              {{item.japaneseName}}
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import huntingLog from '@/cheat/database/huntingLog.js'

const columns = []

export default {
  name: 'huntingLog',
  data () {
    return {
      param: {
        version: undefined,
        monster: undefined
      },
      versionOptions: [],
      monsterOptions: [],
      data: [],
      columns,
      selectAll: false
    }
  },
  created () {
    this.handleVersion()
    this.handleMonster()
  },
  methods: {
    /** 业务 */
    onAdd () {
      let data = this.monsterOptions.filter(item => item.id === this.param.monster)[0]
      this.data.push({
        ...this.param,
        ...data
      })
      // 按照箱子编号升序排序
      this.data = this.data.sort((a, b) => a.index - b.index)

      console.log(this.data)

      this.param.monster = undefined
    },
    onDownload () {

    },
    onClear () {
      let self = this
      self.$confirm({
        title: '确定清空全部配置数据?',
        onOk () {
          self.data = []
        }
      })
    },
    onDelete (row, index) {
      let self = this
      self.$confirm({
        title: '确定删除配置数据?',
        content: `${row.name}`,
        onOk () {
          self.data.splice(index, 1)
        }
      })
    },
    onCrown () {
      
    },
    /** 工具 */
    handleVersion () {
      Object.keys(huntingLog.base).forEach(version => {
        this.versionOptions.push({
          key: version,
          value: version
        })
      })
      this.param.version = this.versionOptions[0].key
    },
    handleMonster () {
      huntingLog.monster.forEach(item => {
        this.monsterOptions.push({
          key: item.id,
          value: item.name,
          ...item
        })
      })
    },
    isAddDisabled () {
      let flag = false
      // 表单未全部填写，添加按钮禁用
      Object.keys(this.param).forEach(key => {
        if (!this.param[key] && this.param[key] !== 0) {
          flag = true
        }
      })
      return flag
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
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
    .list-wrapper{
      .option-wrapper{
        display: flex;
        justify-content: space-between;
        .left-wrapper{
          width: 240px;
          display: flex;
          justify-content: space-between;
        }
      }
      .card-wrapper{
        margin-top: 20px;
        .monster-card{
          width: 240px;
          >img{
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  }
</style>
