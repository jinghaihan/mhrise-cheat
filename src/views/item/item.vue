<template>
  <div class="container">
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
                              v-model="param.slot"
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

    <div class="list-wrapper">
      <div class="option-wrapper">
        <div class="left-wrapper">
          <a-button icon="cloud-download" @click="onDownload" :disabled="!data.length">下载全部</a-button>
          <a-button icon="rest" type="danger" @click="onClear" :disabled="!data.length">清空全部</a-button>
        </div>
        <div class="right-wrapper">
          <a-button icon="sync" type="primary">全道具</a-button>
        </div>
      </div>
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
  </div>
</template>

<script>
import { item, addItem, base, slot } from '@/cheat/database/item.js'
import { generateCheat } from '@/cheat/template/item.js'

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
    dataIndex: 'slot',
    ellipsis: true,
    sorter: (a, b) => a.slot - b.slot,
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
  data () {
    return {
      param: {
        version: undefined,
        slot: undefined,
        id: undefined,
        count: undefined
      },
      versionOptions: [],
      itemOptions: [],
      data: [],
      columns
    }
  },
  created () {
    this.handleVersion()
    this.hanldeItem()
  },
  methods: {
    /** 业务 */
    onAdd () {
      if (!this.validate(this.param)) return
      
      this.data.push({
        ...this.param,
        name: item[this.param.id]
      })
    },
    onDownload () {
      let code = ''
      let data = this.data.sort((a, b) => a.slot - b.slot)
      data.forEach(row => {
        code += generateCheat(row.version, this.calculateSlot(row.slot), row.id, row.count)
      })
      console.log(code)
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
        title: `确定删除${item[row.id]}配置数据?`,
        onOk () {
          self.data.splice(index, 1)
        }
      })
    },
    /** 工具 */
    handleVersion () {
      Object.keys(base).forEach(version => {
        this.versionOptions.push({
          key: version,
          value: version
        })
      })
    },
    hanldeItem () {
      Object.keys(item).forEach(id => {
        if (!item[id].includes('*')) {
          this.itemOptions.push({
            key: id,
            value: item[id]
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
      Object.keys(this.param).forEach(key => {
        if (!this.param[key] && this.param[key] !== 0) {
          flag = true
        }
      })
      return flag
    },
    validate (value) {
      if (value.id === '0000' && value.count !== 0) {
        this.$message.error(`${item['0000']}数量只允许为0`)
        return false
      }
      let illegalArr = this.findIllegalItem(value.version)
      if (illegalArr.includes(value.id)) {
        this.$message.error(`${value.version}不存在${item[value.id]}`)
        return false
      }
      try {
        this.data.forEach(row => {
          if (row.id === value.id && value.id !== '0000') {
            throw new Error(`道具箱已存在${item[value.id]}`)
          }
          if (row.slot === value.slot) {
            throw new Error(`道具箱.No${value.slot}已配置`)
          }
        })
      } catch (error) {
        this.$message.error(error.message)
        return false
      }
      return true
    },
    findIllegalItem (version) {
      let keys = Object.keys(addItem)
      let index
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === version) {
          index = i
        }
      }
      let illegalArr = []
      for (let i = 0; i < index; i++) {
        illegalArr = illegalArr.concat(addItem[keys[i]])
      }

      return illegalArr
    },
    calculateSlot (box) {
      let base = parseInt(slot.start, 16)
      let count = box - 1
      for (let i = 0; i < count; i++) {
        base += slot.step
      }
      base = base.toString(16)
      if (base.length < 4) {
        let differ = 4 - base.length
        let prefix = ''
        for (let i = 0; i < differ; i++) {
          prefix += '0'
        }
        base = prefix + base
      }

      return base
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    height: 100%;
    .form-wrapper{
      padding: 8px;
      background: #fff;
      ::v-deep.ant-form-item{
        margin-bottom: 0;
      }
      .button{
        ::v-deep.ant-form-item-control-wrapper{
          width: 100%;
        }
      }
    }
    .list-wrapper{
      margin-top: 20px;
      padding: 8px;
      background: #fff;
      .option-wrapper{
        display: flex;
        justify-content: space-between;
        .left-wrapper{
          width: 240px;
          display: flex;
          justify-content: space-between;
        }
      }
      .table-wrapper{
        margin-top: 20px;
      }
    }
  }
</style>
