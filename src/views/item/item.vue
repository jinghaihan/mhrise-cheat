<template>
  <div class="container">
    <!-- 表单 -->
    <div class="card-wrapper">
      <a-card title="配置信息" size="small">
        <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" autocomplete="off">
          <a-row :gutter="24">
            <a-col :xl="8" :lg="8" :sm="24">
              <a-form-item label="游戏版本">
                <a-select placeholder="请选择游戏版本"
                          v-model="params.version"
                          allowClear
                          :disabled="!!data.length">
                  <a-select-option v-for="opt in versionOptions" :key="opt.key" :value="opt.key">
                    {{opt.value}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="8" :lg="8" :sm="24">
              <a-form-item label="道具箱.No" >
                <a-input-number placeholder="请输入道具箱.No"
                                v-model="params.box"
                                :precision="0"
                                :min="1"
                                :max="2000"
                                allowClear
                                style="width: 100%">
                </a-input-number>
              </a-form-item>
            </a-col>
            <a-col :xl="8" :lg="8" :sm="24">
              <a-form-item label="道具" >
                <a-select placeholder="请选择道具"
                          v-model="params.id"
                          show-search
                          :filter-option="filterOption"
                          allowClear>
                  <a-select-option v-for="opt in itemOptions" :key="opt.key" :value="opt.key">
                    {{opt.value}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="8" :lg="8" :sm="24">
              <a-form-item label="数量" >
                <a-input-number placeholder="请输入数量"
                                v-model="params.count"
                                :precision="0"
                                :min="0"
                                :max="9999"
                                allowClear
                                style="width: 100%">
                </a-input-number>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <template slot="extra">
          <a-button icon="plus-circle" type="link" @click="onAdd" :disabled="isAddDisabled()"></a-button>
        </template>
      </a-card>
    </div>
    <!-- 展示 -->
    <div class="list-wrapper">
      <!-- 操作 -->
      <div class="option-wrapper">
        <div class="left-wrapper">
          <a-button icon="shopping-cart" @click="onCart" :disabled="!data.length">加入购物车</a-button>
          <a-button icon="rest" type="danger" @click="onClear" :disabled="!data.length">清空全部</a-button>
        </div>
        <div class="right-wrapper">
          <a-button icon="number" @click="onRange">道具数量</a-button>
          <a-button icon="sync" type="primary" @click="onAll">全道具</a-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="table-wrapper">
        <a-table :data-source="data"
                 :columns="columns"
                 :row-key="(record, index) => index"
                 :pagination="false"
                 :scroll="{ y: 'calc(100vh - 550px)' }">
          <div slot="actions" slot-scope="record, text, index">
            <a-icon class="table-action" type="delete" title="删除" @click="onDelete(record, index)"></a-icon>
          </div>
        </a-table>
      </div>
    </div>
    <!-- 组件 -->
    <all-modal v-if="allVisible"
               :visible="allVisible"
               :version="versionOptions"
               @close="onModalClose"
               @submit="onDownloadAll"></all-modal>

    <range-modal v-if="rangeVisible"
                 :visible="rangeVisible"
                 :version="versionOptions"
                 :max="itemOptions.length"
                 @close="onModalClose"
                 @submit="onCartRange"></range-modal>
  </div>
</template>

<script>
import address from '@/cheats/database/address.js'
import item from '@/cheats/database/item.js'
import { generateItemCheat, generateRangeCheat } from '@/cheats/template/item.js'
import { downloadMultipleCheat } from '@/cheats/utils/download.js'
import allModal from './allModal.vue'
import rangeModal from './rangeModal.vue'

const columns = [
  {
    title: '道具ID',
    dataIndex: 'id',
    ellipsis: true,
    sorter: false,
    align: 'center',
    width: 100
  },
  {
    title: '道具名称',
    dataIndex: 'name',
    ellipsis: true,
    sorter: false,
    align: 'center',
    width: 120
  },
  {
    title: '道具箱.No',
    dataIndex: 'box',
    ellipsis: true,
    sorter: (a, b) => a.box - b.box,
    defaultSortOrder: 'ascend',
    align: 'center',
    width: 100
  },
  {
    title: '数量',
    dataIndex: 'count',
    ellipsis: true,
    sorter: false,
    align: 'center',
    width: 100
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'actions' },
    align: 'center',
    width: 140,
    fixed: 'right'
  }
]

export default {
  name: 'item',
  components: { allModal, rangeModal },
  data () {
    return {
      params: {
        version: undefined,
        box: 1,
        id: undefined,
        count: 9500
      },
      versionOptions: [],
      itemOptions: [],
      data: [],
      columns,
      allVisible: false,
      rangeVisible: false
    }
  },
  created () {
    this.handleVersionOptions()
    this.handleItemOptions()
  },
  methods: {
    onAdd () {
      // 校验
      if (!this.validate(this.params)) return
      
      this.data.push({
        ...this.params,
        name: item.list[this.params.id]
      })
      // 按照箱子编号升序排序
      this.data = this.data.sort((a, b) => a.box - b.box)

      // 自增box.No
      this.params.box++
      // 清空物品选择
      this.params.id = undefined
    },
    onCart () {
      this.data.forEach(row => {
        generateItemCheat({
          version: row.version,
          box: row.box,
          id: row.id,
          count: row.count,
          titled: true
        })
      })
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
        content: `${item.list[row.id]} x ${row.count}`,
        onOk () {
          self.data.splice(index, 1)
        }
      })
    },
    onRange () {
      this.rangeVisible = true
    },
    onCartRange (data) {
      let end = data.end.toString(16)
      if (end.length < 4) {
        let prefix = ''
        for (let i = 0; i < 4 - end.length; i++) {
          prefix += '0'
        }
        end = prefix + end
      }
      generateRangeCheat({
        version: data.version,
        start: data.start,
        end: end,
        count: data.count
      })
      // 关闭配置弹窗
      this.onModalClose()
    },
    onAll () {
      this.allVisible = true
    },
    async onDownloadAll (data) {
      let { exportSize } = item
      // 过滤获得选择版本全物品列表
      let illegalArr = this.findIllegalItem(data.version)
      let items = this.itemOptions.filter(item => !illegalArr.includes(item.key))
      // 拆分分组
      let groupMap = {}
      items.forEach((item, index) => {
        let group = Math.floor(index / exportSize.countOfGroup) + 1
        if (!groupMap[group]) groupMap[group] = ''

        groupMap[group] += generateItemCheat({
          version: data.version,
          box: index + 1,
          id: item.key,
          count: data.count
        })
        
        if ((index + 1) % exportSize.countOfGroup === 0 || index === items.length - 1) {
          let end = index + 1
          let start = end - exportSize.countOfGroup + 1
          groupMap[group] = `\n[Box.${start}-${end}]\n${groupMap[group]}`
        }
      })
      // 拆分文件
      let fileMap = {}
      Object.keys(groupMap).forEach((group, index) => {
        let file = Math.floor(index / exportSize.groupOfFile) + 1
        if (!fileMap[file]) fileMap[file] = ''
        fileMap[file] += groupMap[group]
      })
      // 整理为数组
      let codes = []
      Object.keys(fileMap).forEach(file => {
        codes.push(fileMap[file])
      })
      // 下载
      await downloadMultipleCheat(codes, data.version)
      // 关闭配置弹窗
      this.onModalClose()
    },
    handleVersionOptions () {
      Object.keys(address.item).forEach(version => {
        this.versionOptions.push({
          key: version,
          value: version
        })
      })
      this.params.version = this.versionOptions[0].key
    },
    handleItemOptions () {
      let keys = Object.keys(item.list).sort((a, b) => parseInt(a, 16) - parseInt(b, 16))
      keys.forEach(id => {
        if (!item.list[id].includes('*')) {
          this.itemOptions.push({
            key: id,
            value: item.list[id]
          })
        }
      })
      console.log(this.itemOptions, this.itemOptions.length)
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    isAddDisabled () {
      let flag = false
      // 表单未全部填写，添加按钮禁用
      Object.keys(this.params).forEach(key => {
        if (!this.params[key] && this.params[key] !== 0) {
          flag = true
        }
      })
      return flag
    },
    onModalClose () {
      this.allVisible = false
      this.rangeVisible = false
    },
    validate (value) {
      // 無し只允许为空
      if (value.id === '0000' && value.count !== 0) {
        this.$message.error(`${item.list['0000']}数量只允许为0`)
        return false
      }
      // 校验版本是否存在所选道具
      let illegalArr = this.findIllegalItem(value.version)
      if (illegalArr.includes(value.id)) {
        this.$message.error(`${value.version}不存在${item.list[value.id]}`)
        return false
      }
      // 校验当前配置中是否存在同种道具/道具箱格子已经被使用
      try {
        this.data.forEach(row => {
          if (row.id === value.id && value.id !== '0000') {
            throw new Error(`道具箱已存在${item.list[value.id]}`)
          }
          if (row.box === value.box) {
            throw new Error(`道具箱.No${value.box}已配置`)
          }
        })
      } catch (error) {
        this.$message.error(error.message)
        return false
      }
      return true
    },
    // 获取当前版本非法道具列表
    findIllegalItem (version) {
      let keys = Object.keys(item.versionAddList)
      let index
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === version) {
          index = i
        }
      }
      let illegalArr = []
      for (let i = 0; i < index; i++) {
        illegalArr = illegalArr.concat(item.versionAddList[keys[i]])
      }

      return illegalArr
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
        .right-wrapper{
          width: 226px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
</style>
