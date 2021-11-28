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
          <a-col :xl="6" :lg="8" :sm="24">
            <a-form-item label="装备箱.No" >
              <a-input-number placeholder="请输入装备箱.No"
                              v-model="param.box"
                              :precision="0"
                              :min="1"
                              :max="2000"
                              allowClear
                              style="width: 100%"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="8" :sm="24">
            <a-form-item label="种类">
              <a-select placeholder="请选择种类"
                        v-model="param.type"
                        allowClear>
                <a-select-option v-for="opt in typeOptions" :key="opt.key" :value="opt.key">
                  {{opt.value}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="8" :sm="24">
            <a-form-item label="技能1" >
              <a-input-group compact>
                <a-select placeholder="请选择技能"
                          v-model="param.skill1"
                          show-search
                          :filter-option="filterOption"
                          style="width: 80%"
                          allowClear>
                    <a-select-option v-for="opt in skillOptions" :key="opt.key" :value="opt.key">
                      {{opt.value}}
                    </a-select-option>
                </a-select>
                <a-input-number placeholder="lv."
                                v-model="param.level1"
                                :precision="0"
                                :min="0"
                                :max="4"
                                style="width: 20%"
                                allowClear></a-input-number>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="8" :sm="24">
            <a-form-item label="技能2" >
              <a-input-group compact>
                <a-select placeholder="请选择技能"
                          v-model="param.skill2"
                          show-search
                          :filter-option="filterOption"
                          style="width: 80%"
                          allowClear>
                  <a-select-option v-for="opt in skillOptions" :key="opt.key" :value="opt.key">
                    {{opt.value}}
                  </a-select-option>
                </a-select>
              <a-input-number placeholder="lv."
                              v-model="param.level2"
                              :precision="0"
                              :min="0"
                              :max="4"
                              style="width: 20%"
                              allowClear></a-input-number>
              </a-input-group>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="8" :sm="24">
            <a-form-item label="插槽">
              <a-select placeholder="请选择插槽"
                        v-model="param.slot"
                        allowClear>
                <a-select-option v-for="opt in slotOptions" :key="opt.key" :value="opt.key">
                  {{opt.value}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="12" :lg="24" :sm="24" :style="{ textAlign: 'right' }">
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
        <a-button icon="cloud-download" @click="onDownload" :disabled="!data.length">下载全部</a-button>
        <a-button icon="rest" type="danger" @click="onClear" :disabled="!data.length">清空全部</a-button>
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
  </div>
</template>

<script>
import talisman from '@/cheat/database/talisman.js'

const columns = [
  {
    title: '装备箱.No',
    dataIndex: 'box',
    ellipsis: true,
    sorter: (a, b) => a.slot - b.slot,
    defaultSortOrder: 'ascend',
    align: 'center',
    width: 100
  },
  {
    title: '种类',
    dataIndex: 'type',
    ellipsis: true,
    sorter: false,
    align: 'center',
    width: 100
  },
  {
    title: '技能1',
    dataIndex: 'skill1',
    ellipsis: true,
    sorter: false,
    align: 'center',
    width: 120,
    customRender: (obj, rowData, index) => {
      return rowData.skill1 + 'Lv.' + rowData.level1
    }
  },
  {
    title: '技能2',
    dataIndex: 'skill2',
    ellipsis: true,
    sorter: false,
    align: 'center',
    width: 120,
    customRender: (obj, rowData, index) => {
      return rowData.skill2 + 'Lv.' + rowData.level2
    }
  },
  {
    title: '插槽',
    dataIndex: 'slot',
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
  name: 'talisman',
  data () {
    return {
      param: {
        version: undefined,
        box: 201,
        type: undefined,
        skill1: undefined,
        level1: undefined,
        skill2: undefined,
        level2: undefined,
        slot: undefined
      },
      versionOptions: [],
      typeOptions: [],
      skillOptions: [],
      slotOptions: [],
      data: [],
      columns
    }
  },
  created () {
    this.handleVersion()
    this.handleType()
    this.handleSkill()
    this.handleSlot()
  },
  methods: {
    /** 业务 */
    onAdd () {
      // 自增box.No
      this.param.box++
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
      let name = talisman.skill[row.skill1] + row.level1 + talisman.skill[row.skill2] + row.level2 + row.slot
      self.$confirm({
        title: `确定删除${name}配置数据?`,
        onOk () {
          self.data.splice(index, 1)
        }
      })
    },
    /** 工具 */
    handleVersion () {
      Object.keys(talisman.base).forEach(version => {
        this.versionOptions.push({
          key: version,
          value: version
        })
      })
    },
    handleType () {
      Object.keys(talisman.type).forEach(id => {
        this.typeOptions.push({
          key: id,
          value: talisman.type[id]
        })
      })
    },
    handleSkill () {
      Object.keys(talisman.skill).forEach(id => {
        this.skillOptions.push({
          key: id,
          value: talisman.skill[id]
        })
      })
    },
    handleSlot () {
      Object.keys(talisman.slot).forEach(value => {
        this.slotOptions.push({
          key: value,
          value: value
        })
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
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    height: 100%;
    .list-wrapper{
      .option-wrapper{
        width: 240px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
