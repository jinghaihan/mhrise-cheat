<template>
  <a-modal
    :visible="visible"
    @cancel="closeModal"
    @ok="onSubmit"
    :width="600"
    :maskClosable="false"
    title="支援行动"
  >
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" autocomplete="off">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="技能1" class="required">
            <a-select placeholder="请选择技能1"
                      v-model="params.move1"
                      show-search
                      :filter-option="filterOption"
                      allowClear>
              <a-select-option v-for="opt in moveOptions" :key="opt.key" :value="opt.key">
                {{opt.value}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="技能2" class="required">
            <a-select placeholder="请选择技能2"
                      v-model="params.move2"
                      show-search
                      :filter-option="filterOption"
                      allowClear>
              <a-select-option v-for="opt in moveOptions" :key="opt.key" :value="opt.key">
                {{opt.value}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="技能3" class="required">
            <a-select placeholder="请选择技能3"
                      v-model="params.move3"
                      show-search
                      :filter-option="filterOption"
                      allowClear>
              <a-select-option v-for="opt in moveOptions" :key="opt.key" :value="opt.key">
                {{opt.value}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="技能4" class="required">
            <a-select placeholder="请选择技能4"
                      v-model="params.move4"
                      show-search
                      :filter-option="filterOption"
                      allowClear>
              <a-select-option v-for="opt in moveOptions" :key="opt.key" :value="opt.key">
                {{opt.value}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="技能5" class="required">
            <a-select placeholder="请选择技能5"
                      v-model="params.move5"
                      show-search
                      :filter-option="filterOption"
                      allowClear>
              <a-select-option v-for="opt in moveOptions" :key="opt.key" :value="opt.key">
                {{opt.value}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import buddy from '@/cheats/database/buddy.js'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      params: {
        move1: undefined,
        move2: undefined,
        move3: undefined,
        move4: undefined,
        move5: undefined
      },
      moveOptions: []
    }
  },
  created () {
    this.handleMove()

    // 回显
    let moves = this.data.data.moves
    if (moves && moves.length) {
      Object.keys(this.params).forEach((key, index) => {
        this.params[key] = moves[index]
      })
    }
  },
  methods: {
    onSubmit () {
      try {
        let arr = []
        Object.keys(this.params).forEach(key => {
          if (!this.params[key] && this.params[key] !== 0) {
            throw new Error('请完整填写配置')
          }
          arr.push(this.params[key])
        })
        if (arr.length !== [...new Set(arr)].length) {
          throw new Error('不允许存在重复支援行动')
        }
        this.$emit('submit', this.params)
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    closeModal () {
      this.$emit('close')
    },
    handleMove () {
      let keys = Object.keys(buddy.move).sort((a, b) => parseInt(a, 16) - parseInt(b, 16))
      keys.forEach(id => {
        if (!buddy.move[id].includes('*')) {
          this.moveOptions.push({
            key: id,
            value: buddy.move[id]
          })
        }
      })
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    }
  }
}
</script>

<style lang="less" scoped>

</style>
