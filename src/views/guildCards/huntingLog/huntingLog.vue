<template>
  <div class="container" ref="container">
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
          <a-col :xl="6" :lg="8" :sm="24">
            <a-form-item label="怪物">
              <a-select placeholder="请选择怪物"
                        v-model="param.monster"
                        allowClear
                        show-search
                        mode="multiple"
                        :maxTagCount="0"
                        @change="onSelect"
                        :filter-option="filterOption">
                <div slot="dropdownRender" slot-scope="menu" class="select-multiple-menu">
                  <a-checkbox
                    class="all"
                    v-model="selectAll"
                    :indeterminate="param.monster.length > 0 && param.monster.length < monsterOptions.length"
                    @change="onSelectAll">全选
                  </a-checkbox>
                  <a-divider class="divider" />
                  <v-nodes :vnodes="menu" />
                </div>
                <a-select-option v-for="opt in monsterOptions" :key="opt.key" :value="opt.key">
                  {{opt.value}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="12" :lg="8" :sm="24" :style="{ textAlign: 'right' }">
            <a-form-item class="button">
              <a-button icon="crown" type="primary" @click="onCrown">全金冠</a-button>
              <a-button icon="cloud-download" @click="onDownload" :disabled="!data.length">下载全部</a-button>
              <a-button icon="rest" type="danger" @click="onClear" :disabled="!data.length">清空全部</a-button>
              <a-button icon="plus-circle" type="primary" @click="onAdd" :disabled="isAddDisabled()">添加</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 卡片展示 -->
    <div class="card-wrapper">
      <a-row class="card-row" :gutter="[10, 10]">
        <a-col :xxl="2" :xl="3" :lg="4" :md="6" :sm="8" v-for="(item, index) in data" :key="index">
          <a-card class="monster-card" hoverable>
            <img slot="cover" :src="renderImage(item.id)" class="image">
            <a-card-meta>
              <div slot="title" class="title" :title="item.name">
                <a-icon theme="filled"
                        :type="item.status === 'edited' ? 'check-circle' : 'minus-circle'"
                        :class="item.status === 'edited' ? 'edited status-icon' : 'unedited status-icon'">
                </a-icon>
                {{item.name}}
              </div>
            </a-card-meta>
            <template slot="actions" class="ant-card-actions">
              <a-icon type="edit" @click="onEdit(item, index)"/>
              <a-icon type="delete" @click="onDelete(item, index)"/>
            </template>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <edit-modal v-if="editVisible"
                :visible="editVisible"
                :data="currentData"
                @submit="onEditSubmit"
                @close="onModalClose"></edit-modal>
  </div>
</template>

<script>
import huntingLog from '@/cheat/database/huntingLog.js'
import editModal from './editModal.vue'

export default {
  name: 'huntingLog',
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    },
    editModal
  },
  data () {
    return {
      param: {
        version: undefined,
        monster: []
      },
      versionOptions: [],
      monsterOptions: [],
      data: [],
      selectAll: false,
      editVisible: false,
      currentData: {}
    }
  },
  created () {
    this.handleVersion()
    this.handleMonster()
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
    /** 业务 */
    onAdd () {
      let data = this.param.monster.map(id => {
        return {
          ...this.param,
          ...this.monsterOptions.filter(item => item.id === id)[0],
          param: {
            longest: undefined,
            shortest: undefined,
            hunted: undefined,
            captured: undefined
          },
          status: 'unedited',
          ...this.data.filter(item => item.id === id)[0]
        }
      })
      // 按照箱子编号升序排序
      data = data.sort((a, b) => a.index - b.index)
      this.data = _.cloneDeep(data)
      this.$nextTick(() => {
        this.calculateImageWidth()
      })
    },
    onSelect (value) {
      if (value.length === this.monsterOptions.length) {
        this.selectAll = true
      } else {
        this.selectAll = false
      }
    },
    onSelectAll (e) {
      let value = []
      if (e.target.checked) {
        // 全选
        this.monsterOptions.forEach(item => {
          value.push(item.id)
        })
      }
      this.param.monster = value
      this.selectAll = e.target.checked
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
    onEdit (data, index) {
      this.currentData = {
        index: index,
        data: _.cloneDeep(data)
      }
      this.editVisible = true
    },
    onEditSubmit (data) {
      let flag = false
      Object.keys(data).forEach(key => {
        this.data[this.currentData.index].param[key] = data[key]
        if (data[key] || data[key] === 0) {
          flag = true
          this.data[this.currentData.index].status = 'edited'
        }
        return data[key]
      })
      if (!flag) {
        this.data[this.currentData.index].status = 'unedited'
      }
      this.onModalClose()
    },
    onDelete (data, index) {
      let self = this
      self.$confirm({
        title: '确定删除配置数据?',
        content: `${data.name} x ${data.japaneseName}`,
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
        if (Array.isArray(this.param[key]) && !this.param[key].length) {
          flag = true
        }
      })
      return flag
    },
    onModalClose () {
      this.currentData = {}
      this.editVisible = false
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
        .monster-card{
          ::v-deep.ant-card-body{
            padding: 0;
          }
          .image{
            width: 100%;
            height: 0;
          }
          .title{
            padding: 12px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            .status-icon{
              font-size: 12px;
              margin-right: 4px;
            }
            .edited{
              color: #52c41a;
            }
            .unedited{
              color: rgba(0, 0, 0, 0.25);
            }
          }
        }
      }
    }
  }
</style>
