<template>
  <div class="container" ref="container">
    <!-- 表单 -->
    <div class="form-wrapper">
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" autocomplete="off">
        <a-row :gutter="24">
          <a-col :xl="8" :lg="8" :sm="24">
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
          <a-col :xl="16" :lg="16" :sm="24" :style="{ textAlign: 'right' }">
            <a-form-item class="button">
              <a-button type="primary" icon="plus-circle" @click="onStats">其他</a-button>
              <a-button type="danger" icon="rest" @click="onClear">重置</a-button>
              <a-button icon="shopping-cart" @click="onCart">加入购物车</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 卡片展示 -->
    <div class="card-wrapper">
      <a-card class="weapon-card" :title="type.value" v-for="(type, index) in typeOptions" :key="index">
        <a-row class="card-row" :gutter="[10, 10]">
          <a-col :xxl="1" :xl="2" :lg="2" :md="3" :sm="4" v-for="(item, index) in data" :key="index">
            <a-tooltip>
              <template slot="title">
                {{item.name}}
              </template>
              <a-card class="awards-card" hoverable>
                <img slot="cover" :src="item.img" class="image">
                <a-card-meta>
                  <div slot="title" class="count">
                    <a-input-number :min="0" :max="9999" v-model="count[type.key][item.id]" size="small" style="width: 90%"></a-input-number>
                  </div>
                </a-card-meta>
              </a-card>
            </a-tooltip>
          </a-col>
        </a-row>
      </a-card>
    </div>
    <stats-modal v-if="statsVisible" :visible="statsVisible" :versions="versionOptions" @close="onModalClose"></stats-modal>
  </div>
</template>

<script>
import pointer from '@/cheats/database/pointer.js'
import stats from '@/cheats/database/stats.js'
import { generateWeaponCheat } from '@/cheats/template/stats.js'
import statsModal from './statsModal.vue'

export default {
  name: 'stats',
  components: { statsModal },
  data () {
    return {
      params: {
        version: undefined,
        type: undefined
      },
      versionOptions: [],
      typeOptions: [],
      data: [],
      statsVisible: false,
      count: {
        '0180': {},
        '0188': {},
        '0190': {},
        '0198': {},
        '01B0': {},
        '01A0': {},
        '01A8': {},
        '01B8': {}
      }
    }
  },
  created () {
    this.handleData()
    this.handleVersionOptions()
    this.handleTypeOptions()
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
    onStats () {
      this.statsVisible = true
    },
    onClear () {
      this.count = {
        '0120': {},
        '0128': {},
        '0130': {},
        '0138': {}
      }
    },
    onCart () {
      generateWeaponCheat({
        version: this.params.version,
        data: this.count
      })
    },
    handleData () {
      stats.weaponList.forEach(item => {
        this.data.push({
          ...item,
          img: this.renderImage(item.id)
        })
      })
      this.$nextTick(() => {
        this.calculateImageWidth()
      })
    },
    handleVersionOptions () {
      Object.keys(pointer.stats).forEach(version => {
        this.versionOptions.push({
          key: version,
          value: version
        })
      })
      this.params.version = this.versionOptions[0].key
    },
    handleTypeOptions () {
      Object.keys(stats.weaponQuest).forEach(id => {
        this.typeOptions.push({
          key: id,
          value: stats.weaponQuest[id]
        })
      })
      // this.params.type = this.typeOptions[0].key
    },
    renderImage (name) {
      const context = require.context('@/assets/weapon/', true, /\.jpeg$/)
      const imgName = `./${name}.jpeg`
      const src = context(imgName)
      
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
    },
    onModalClose () {
      this.statsVisible = false
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
  }
  .card-wrapper{
    margin-top: 20px;
    height: calc(~"100% - 80px");
    overflow-y: auto;
    .weapon-card{
      margin-bottom: 20px;
    }
    .weapon-card:last-of-type{
      margin-bottom: 0;
    }
    .card-row{
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
        .count{
          padding: 8px 0;
          text-align: center;
        }
      }
    }
  }
</style>
