<template>
  <div class="container" ref="container">
    <!-- 表单 -->
    <div class="form-wrapper">
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" autocomplete="off">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="8" :sm="24">
            <a-form-item label="游戏版本">
              <a-select placeholder="请选择游戏版本"
                        v-model="params.version"
                        allowClear>
                <a-select-option v-for="opt in versionOptions" :key="opt.key" :value="opt.key">
                  {{opt.value}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="18" :lg="16" :sm="24" :style="{ textAlign: 'right' }">
            <a-form-item class="button">
              <a-checkbox v-model="selectAll" :indeterminate="isIndeterminate()" @change="onSelectAll">全选</a-checkbox>
              <a-button icon="shopping-cart" @click="onCart" :disabled="isCartDisabled()">加入购物车</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 卡片展示 -->
    <div class="card-wrapper">
      <a-row class="card-row" :gutter="[10, 10]">
        <a-col :xxl="1" :xl="2" :lg="2" :md="3" :sm="4" v-for="(item, index) in data" :key="index">
          <a-tooltip>
            <template slot="title">
              {{item.name}}：{{item.description}}
            </template>
            <a-card class="awards-card" hoverable>
              <img slot="cover" :src="item.img" class="image">
              <a-card-meta>
                <div slot="title" class="title">
                  <a-checkbox v-model="checkbox[item.group + '-' + item.id]" @change="onChange"></a-checkbox>
                </div>
              </a-card-meta>
            </a-card>
          </a-tooltip>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import pointer from '@/cheats/database/pointer.js'
import awards from '@/cheats/database/awards.js'
import generateCheat from '@/cheats/template/awards.js'

export default {
  name: 'awards',
  data () {
    return {
      params: { version: undefined },
      checkbox: {},
      indeterminate: false,
      selectAll: false,
      versionOptions: [],
      data: []
    }
  },
  created () {
    this.handleData()
    this.handleVersionOptions()
  },
  mounted () {
    let self = this
    self.observer = new ResizeObserver(function () {
      self.calculateImageWidth()
    })
    self.observer.observe(self.$refs.container)
  },
  beforeDestroy () {
    this.observer.disconnect(this.$refs.container)
  },
  methods: {
    onSelectAll (e) {
      let value = e.target.checked
      if (value || this.indeterminate) {
        // 全选
        this.changeChecked(true)
        this.selectAll = true
      } else {
        // 取消全选
        this.changeChecked(false)
        this.selectAll = false
      }
    },
    onCart () {
      this.data.forEach(item => {
        if (this.checkbox[item.group + '-' + item.id]) {
          generateCheat({
            version: this.params.version,
            data: item
          })
        }
      })
    },
    onChange () {
      this.$forceUpdate()
    },
    changeChecked (checked) {
      Object.keys(this.checkbox).forEach(key => {
        this.checkbox[key] = checked
      })
      this.$forceUpdate()
    },
    handleData () {
      awards.list.forEach((award, index) => {
        let img = this.renderImage(award)
        this.data.push({
          ...award,
          img: img
        })
        this.checkbox[award.group + '-' + award.id] = false
      })
      this.$nextTick(() => {
        this.calculateImageWidth()
      })
    },
    handleVersionOptions () {
      Object.keys(pointer.awards).forEach(version => {
        this.versionOptions.push({
          key: version,
          value: version
        })
      })
      this.params.version = this.versionOptions[0].key
    },
    isCartDisabled () {
      let flag = false
      let count = 0
      Object.keys(this.checkbox).forEach(key => {
        if (this.checkbox[key]) {
          count++
        }
      })
      if (!count) {
        flag = true
      }
      return flag
    },
    isIndeterminate () {
      let keys = Object.keys(this.checkbox)
      let count = 0
      keys.forEach(key => {
        if (this.checkbox[key]) {
          count++
        }
      })
      if (count === 0 || count === keys.length) {
        this.indeterminate = false
        return false
      } else {
        this.indeterminate = true
        return true
      }
    },
    renderImage (data) {
      let src
      try {
        const context = require.context('@/assets/awards/', true, /\.png$/)
        const imgName = `./${data.group}-${data.id}.png`
        src = context(imgName)
      } catch (error) {
        src = ''
      }
      
      return src
    },
    calculateImageWidth () {
      if (this.data && this.data.length) {
        let doms = $('.image')
        let width = $(doms[0]).width()
        let height = width
        // 设置image宽度
        doms.each((index, element) => {
          $(element).height(height)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    height: 100%;
    .form-wrapper{
      .button{
        .ant-btn{
          margin-left: 12px;
        }
      }
    }
    .card-wrapper{
      margin-top: 20px;
      height: calc(~"100% - 80px");
      .card-row{
        height: 100%;
        overflow-y: auto;
        .awards-card{
          ::v-deep.ant-card-body{
            padding: 0;
          }
          ::v-deep.ant-card-cover{
            background: #C9C1B6;
          }
          ::v-deep.ant-card-meta-title{
            white-space: normal;
          }
          .image{
            width: 100%;
            height: 0;
          }
          .title{
            padding: 8px 0;
            text-align: center;
          }
        }
      }
    }
  }
</style>
