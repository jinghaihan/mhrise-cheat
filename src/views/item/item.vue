<template>
  <div class="container">
    <!-- 表单 -->
    <div class="form-wrapper">
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" autocomplete="off">
        <a-row :gutter="24">
          <a-col :xl="5" :lg="8" :sm="24">
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
            <a-form-item label="道具箱.No" >
              <a-input-number placeholder="请输入道具箱.No"
                              v-model="param.box"
                              :precision="0"
                              :min="1"
                              :max="2000"
                              allowClear
                              style="width: 100%"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="8" :sm="24">
            <a-form-item label="道具" >
              <a-select placeholder="请选择道具"
                        v-model="param.id"
                        show-search
                        :filter-option="filterOption"
                        allowClear>
                <a-select-option v-for="opt in itemOptions" :key="opt.key" :value="opt.key">
                  {{opt.value}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="8" :sm="24">
            <a-form-item label="数量" >
              <a-input-number placeholder="请输入数量"
                              v-model="param.count"
                              :precision="0"
                              :min="0"
                              :max="9999"
                              allowClear
                              style="width: 100%"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :xl="2" :lg="16" :sm="24" :style="{ textAlign: 'right' }">
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
          <a-button icon="sync" type="primary" @click="onAll">全道具</a-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="table-wrapper">
        <a-table :data-source="data"
                 :columns="columns"
                 :row-key="(record, index) => index"
                 :pagination="false"
                  :scroll="{ y: 400 }">
          <div slot="actions" slot-scope="record, index">
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
  </div>
</template>

<script>
import item from '@/cheat/database/item.js'
import generateCheat from '@/cheat/template/item.js'
import { downloadCheat, downloadMultipleCheat } from '@/cheat/utils/download.js'
import allModal from './allModal.vue'

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
  components: { allModal },
  data () {
    return {
      param: {
        version: undefined,
        box: 1,
        id: undefined,
        count: 5000
      },
      versionOptions: [],
      itemOptions: [],
      data: [],
      columns,
      allVisible: false
    }
  },
  created () {
    this.handleVersion()
    this.hanldeItem()
  },
  methods: {
    /** 业务 */
    onAdd () {
      // 校验
      if (!this.validate(this.param)) return
      
      this.data.push({
        ...this.param,
        name: item.list[this.param.id]
      })
      // 自增box.No
      this.param.box++
      // 清空物品选择
      this.param.id = undefined
    },
    onDownload () {
      let code = ''
      // 按照箱子编号升序排序
      let data = this.data.sort((a, b) => a.box - b.box)
      data.forEach(row => {
        code += generateCheat(row.version, this.calculateBox(row.box), row.id, row.count, true)
      })
      downloadCheat(code, data[0].version)
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
        groupMap[group] += generateCheat(data.version, this.calculateBox(index + 1), item.key, data.count)
        
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
    /** 工具 */
    handleVersion () {
      Object.keys(item.base).forEach(version => {
        this.versionOptions.push({
          key: version,
          value: version
        })
      })
    },
    hanldeItem () {
      Object.keys(item.list).forEach(id => {
        if (!item.list[id].includes('*')) {
          this.itemOptions.push({
            key: id,
            value: item.list[id]
          })
        }
      })
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
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
    onModalClose () {
      this.allVisible = false
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
      let keys = Object.keys(item.additionalList)
      let index
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === version) {
          index = i
        }
      }
      let illegalArr = []
      for (let i = 0; i < index; i++) {
        illegalArr = illegalArr.concat(item.additionalList[keys[i]])
      }

      return illegalArr
    },
    // 计算箱子16进制地址
    calculateBox (box) {
      let num = parseInt(item.box.start, 16)
      let count = box - 1
      for (let i = 0; i < count; i++) {
        num += item.box.step
      }
      num = num.toString(16)
      if (num.length < 4) {
        let differ = 4 - num.length
        let prefix = ''
        for (let i = 0; i < differ; i++) {
          prefix += '0'
        }
        num = prefix + num
      }

      return num
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
    }
  }
</style>
