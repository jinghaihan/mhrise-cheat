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
              <a-form-item label="装备箱.No" >
                <a-input-number placeholder="请输入装备箱.No"
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
              <a-form-item label="类型">
                <a-select placeholder="请选择类型"
                          v-model="params.type"
                          allowClear>
                  <a-select-option v-for="opt in typeOptions" :key="opt.key" :value="opt.key">
                    {{opt.value}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="8" :lg="8" :sm="24">
              <a-form-item label="技能1" >
                <a-input-group compact>
                  <a-select placeholder="请选择技能"
                            v-model="params.skill1"
                            show-search
                            :filter-option="filterOption"
                            style="width: 75%"
                            allowClear>
                      <a-select-option v-for="opt in skillOptions" :key="opt.key" :value="opt.key">
                        {{opt.value}}
                      </a-select-option>
                  </a-select>
                  <a-input-number placeholder="Lv."
                                  v-model="params.level1"
                                  :precision="0"
                                  :min="0"
                                  :max="4"
                                  style="width: 25%"
                                  allowClear>
                  </a-input-number>
                </a-input-group>
              </a-form-item>
            </a-col>
            <a-col :xl="8" :lg="8" :sm="24">
              <a-form-item label="技能2" >
                <a-input-group compact>
                  <a-select placeholder="请选择技能"
                            v-model="params.skill2"
                            show-search
                            :filter-option="filterOption"
                            style="width: 75%"
                            allowClear>
                    <a-select-option v-for="opt in skillOptions" :key="opt.key" :value="opt.key">
                      {{opt.value}}
                    </a-select-option>
                  </a-select>
                <a-input-number placeholder="Lv."
                                v-model="params.level2"
                                :precision="0"
                                :min="0"
                                :max="4"
                                style="width: 25%"
                                allowClear>
                </a-input-number>
                </a-input-group>
              </a-form-item>
            </a-col>
            <a-col :xl="8" :lg="8" :sm="24">
              <a-form-item label="插槽">
                <a-select placeholder="请选择插槽"
                          v-model="params.slot"
                          allowClear>
                  <a-select-option v-for="opt in slotOptions" :key="opt.key" :value="opt.key">
                    {{opt.value}}
                  </a-select-option>
                </a-select>
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
        <a-button icon="shopping-cart" @click="onCart" :disabled="!data.length">加入购物车</a-button>
        <a-button icon="rest" type="danger" @click="onClear" :disabled="!data.length">清空全部</a-button>
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
  </div>
</template>

<script>
import pointer from '@/cheats/database/pointer.js'
import charm from '@/cheats/database/charm.js'
import generateCheat from '@/cheats/template/charm.js'

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
    title: '类型',
    dataIndex: 'type',
    ellipsis: true,
    sorter: false,
    align: 'center',
    width: 100,
    customRender: (obj, rowData, index) => {
      return charm.type[rowData.type]
    }
  },
  {
    title: '技能1',
    dataIndex: 'skill1',
    ellipsis: true,
    sorter: false,
    align: 'center',
    width: 120,
    customRender: (obj, rowData, index) => {
      return charm.skill[rowData.skill1] + '(Lv.' + rowData.level1 + ')'
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
      return charm.skill[rowData.skill2] + '(Lv.' + rowData.level2 + ')'
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
  name: 'charm',
  data () {
    return {
      params: {
        version: undefined,
        box: 201,
        type: '0D',
        skill1: undefined,
        level1: 0,
        skill2: undefined,
        level2: 0,
        slot: '4-1-1'
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
    this.handleVersionOptions()
    this.handleTypeOptions()
    this.handleSkillOptions()
    this.handleSlotOptions()
  },
  methods: {
    onAdd () {
      // 校验
      if (!this.validate(this.params)) return

      this.data.push({ ...this.params })
      // 按照箱子编号升序排序
      this.data = this.data.sort((a, b) => a.box - b.box)

      // 自增box.No
      this.params.box++
    },
    onCart () {
      this.data.forEach(row => {
        generateCheat({
          version: row.version,
          box: row.box,
          type: row.type,
          skill1: { skill: row.skill1, level: row.level1 },
          skill2: { skill: row.skill2, level: row.level2 },
          slot: { name: row.slot, codes: charm.slot[row.slot].split(',') }
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
      let name = charm.skill[row.skill1] + '(Lv.' + row.level1 + ') ' + charm.skill[row.skill2] + '(Lv.' + row.level2 + ') ' + 'Slot.' + row.slot
      self.$confirm({
        title: '确定删除配置数据?',
        content: `${name}`,
        onOk () {
          self.data.splice(index, 1)
        }
      })
    },
    handleVersionOptions () {
      Object.keys(pointer.charm).forEach(version => {
        this.versionOptions.push({
          key: version,
          value: version
        })
      })
      this.params.version = this.versionOptions[0].key
    },
    handleTypeOptions () {
      Object.keys(charm.type).forEach(id => {
        this.typeOptions.push({
          key: id,
          value: charm.type[id]
        })
      })
    },
    handleSkillOptions () {
      let keys = Object.keys(charm.skill).sort((a, b) => parseInt(a, 16) - parseInt(b, 16))
      keys.forEach(id => {
        this.skillOptions.push({
          key: id,
          value: charm.skill[id]
        })
      })
    },
    handleSlotOptions () {
      Object.keys(charm.slot).forEach(value => {
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
      Object.keys(this.params).forEach(key => {
        if (!this.params[key] && this.params[key] !== 0) {
          flag = true
        }
      })
      return flag
    },
    validate (value) {
      // 技能1不允许为スキル無し
      if (value.skill1 === '00') {
        this.$message.error(`技能1不允许为${charm.skill['00']}`)
        return false
      }
      // スキル無し等级只允许为0
      if (value.skill2 === '00' && value.level2 !== 0) {
        this.$message.error(`${charm.skill['00']}等级只允许为0`)
        return false
      }
      // 非スキル無し等级不允许为0
      if (value.skill1 !== '00' && value.level1 === 0) {
        this.$message.error(`${charm.skill[value.skill1]}等级不允许为0`)
        return false
      }
      if (value.skill2 !== '00' && value.level2 === 0) {
        this.$message.error(`${charm.skill[value.skill2]}等级不允许为0`)
        return false
      }
      // 技能1与技能2不能相同
      if (value.skill1 === value.skill2) {
        this.$message.error(`技能1与技能2不能相同`)
        return false
      }
      // 校验装备箱格子是否已经被使用
      try {
        this.data.forEach(row => {
          if (row.box === value.box) {
            throw new Error(`装备箱.No${value.box}已配置`)
          }
        })
      } catch (error) {
        this.$message.error(error.message)
        return false
      }
      return true
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
