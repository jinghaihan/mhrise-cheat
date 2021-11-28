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
            <a-form-item label="类型">
              <a-select placeholder="请选择类型"
                        v-model="param.type"
                        allowClear>
                <a-select-option v-for="opt in typeOptions" :key="opt.key" :value="opt.key">
                  {{opt.value}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="8" :sm="24">
            <a-form-item label="栏位.No" >
              <a-input-number placeholder="请输入栏位.No"
                              v-model="param.box"
                              :precision="0"
                              :min="1"
                              :max="35"
                              allowClear
                              style="width: 100%"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="8" :sm="24">
            <a-form-item label="等级">
              <a-select placeholder="请选择等级"
                        v-model="param.level"
                        allowClear>
                <a-select-option v-for="opt in levelOptions" :key="opt.key" :value="opt.key">
                  {{opt.value}}
                </a-select-option>
              </a-select>
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
          <span slot="customTitle">
            <a-tooltip>
              <template slot="title">艾露猫专属</template>
              <a-icon type="question-circle" style="color: #1890ff" /> 支援行动
            </a-tooltip>
          </span>
          <div slot="actions" slot-scope="record, text, index">
            <a-icon class="table-action" type="fire" title="随从技能" v-if="isSkill(record)" @click="onSkill(record, index)"></a-icon>
            <a-icon class="table-action" type="thunderbolt" title="支援行动" v-if="isMove(record)" @click="onMove(record, index)"></a-icon>
            <a-icon class="table-action" type="delete" title="删除" @click="onDelete(record, index)"></a-icon>
          </div>
        </a-table>
      </div>
    </div>
    <!-- 组件 -->
    <skill-modal v-if="skillVisible"
                 :visible="skillVisible"
                 :data="currentRow"
                 @close="onModalClose"
                 @submit="onSkillSubmit"></skill-modal>

    <move-modal v-if="moveVisible"
                :visible="moveVisible"
                :data="currentRow"
                @close="onModalClose"
                @submit="onMoveSubmit"></move-modal>
  </div>
</template>

<script>
import buddy from '@/cheat/database/buddy.js'
import { generateLevelCheat, generateSkillCheat, generateMoveCheat } from '@/cheat/template/buddy.js'
import skillModal from './skillModal.vue'
import moveModal from './moveModal.vue'

const columns = [
  {
    title: '类型',
    dataIndex: 'type',
    ellipsis: true,
    sorter: false,
    align: 'center',
    width: 100,
    customRender: (obj, rowData, index) => {
      return buddy.type[rowData.type]
    }
  },
  {
    title: '栏位.No',
    dataIndex: 'box',
    ellipsis: true,
    sorter: (a, b) => a.slot - b.slot,
    defaultSortOrder: 'ascend',
    align: 'center',
    width: 100
  },
  {
    title: '等级',
    dataIndex: 'level',
    ellipsis: true,
    sorter: false,
    align: 'center',
    width: 100,
    customRender: (obj, rowData, index) => {
      return buddy.level[rowData.level]
    }
  },
  {
    title: '随从技能',
    dataIndex: 'skills',
    ellipsis: true,
    sorter: false,
    align: 'center',
    width: 180,
    customRender: (obj, rowData, index) => {
      let string = ''
      if (rowData.skills && rowData.skills.length) {
        string = rowData.skills.map(skill => {
          return buddy.skill[skill]
        }).join(',')
      } else {
        string = '-'
      }
      return string
    }
  },
  {
    // title: '支援行动',
    dataIndex: 'moves',
    ellipsis: true,
    sorter: false,
    align: 'center',
    width: 180,
    slots: { title: 'customTitle' },
    customRender: (obj, rowData, index) => {
      let string = ''
      if (rowData.type !== '20') {
        string = '-'
      } else {
        if (rowData.moves && rowData.moves.length) {
          string = rowData.moves.map(move => {
            return buddy.move[move]
          }).join(',')
        } else {
          string = '-'
        }
      }
      return string
    }
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
  name: 'buddy',
  components: { skillModal, moveModal },
  data () {
    return {
      param: {
        version: undefined,
        type: undefined,
        box: 1,
        level: undefined
      },
      versionOptions: [],
      typeOptions: [],
      levelOptions: [],
      data: [],
      columns,
      skillVisible: false,
      moveVisible: false,
      currentRow: {}
    }
  },
  created () {
    this.handleVersion()
    this.handleType()
    this.handleLevel()
  },
  methods: {
    /** 业务 */
    onAdd () {
      // 校验
      if (!this.validate(this.param)) return

      this.data.push({
        skills: [],
        moves: [],
        ...this.param
      })
      // 按照栏位编号升序排序, 排序同栏位，艾露猫靠前
      this.data = this.data.sort((a, b) => this.sortList(a, b))
    },
    onDownload () {
      let code = ''
      this.data.forEach(row => {
        // 生成随从经验金手指
        code += generateLevelCheat(row.version, row.type, this.calculateBox(row.box), row.level, true)
        // 生成随从技能金手指
        if (row.skills && row.skills.length) {
          code += generateSkillCheat(row.version, row.type, this.calculateBox(row.box), row.skills, true)
        }
        // 生成支援技能金手指
        if (row.moves && row.moves.length) {
          code += generateMoveCheat(row.version, row.type, this.calculateBox(row.box), row.moves, true)
        }
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
    onSkill (row, index) {
      this.currentRow = {
        index: index,
        data: _.cloneDeep(row)
      }
      this.skillVisible = true
    },
    onSkillSubmit (data) {
      this.data[this.currentRow.index].skills = Object.keys(data).map(skill => {
        return data[skill]
      })
      this.onModalClose()
    },
    onMove (row, index) {
      this.currentRow = {
        index: index,
        data: _.cloneDeep(row)
      }
      this.moveVisible = true
    },
    onMoveSubmit (data) {
      this.data[this.currentRow.index].moves = Object.keys(data).map(move => {
        return data[move]
      })
      this.onModalClose()
    },
    onDelete (row, index) {
      let self = this
      self.$confirm({
        title: '确定删除配置数据?',
        content: `Box.${row.box} ${buddy.type[row.type]}`,
        onOk () {
          self.data.splice(index, 1)
        }
      })
    },
    /** 工具 */
    handleVersion () {
      Object.keys(buddy.base).forEach(version => {
        this.versionOptions.push({
          key: version,
          value: version
        })
      })
      this.param.version = this.versionOptions[0].key
    },
    handleType () {
      Object.keys(buddy.type).forEach(id => {
        this.typeOptions.push({
          key: id,
          value: buddy.type[id]
        })
      })
    },
    handleLevel () {
      Object.keys(buddy.level).forEach(id => {
        this.levelOptions.push({
          key: id,
          value: buddy.level[id]
        })
      })
      this.param.level = this.levelOptions[0].key
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
      this.currentRow = {}
      this.skillVisible = false
      this.moveVisible = false
    },
    isSkill (row) {
      return true
    },
    isMove (row) {
      if (row.type === '20') {
        return true
      }
      return false
    },
    sortList (a, b) {
      if (a.box === b.box) {
        return parseInt(a.type, 16) - parseInt(b.type, 16)
      } else {
        return a.box - b.box
      }
    },
    validate (value) {
      // 校验栏位格子是否已经被使用
      try {
        this.data.forEach(row => {
          if (row.box === value.box && row.type === value.type) {
            throw new Error(`${buddy.type[row.type]}栏位.No${value.box}已配置`)
          }
        })
      } catch (error) {
        this.$message.error(error.message)
        return false
      }
      return true
    },
    // 计算栏位16进制地址
    calculateBox (box) {
      let num = parseInt(buddy.box.start, 16)
      let count = box - 1
      for (let i = 0; i < count; i++) {
        num += buddy.box.step
      }
      num = num.toString(16)

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
        width: 240px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
