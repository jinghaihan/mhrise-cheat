<template>
  <a-modal
    :visible="visible"
    @cancel="closeModal"
    @ok="onSubmit"
    :width="600"
    title="随从技能"
  >
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }" autocomplete="off">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="技能1" class="required">
            <a-select placeholder="请选择技能1"
                      v-model="param.skill1"
                      show-search
                      :filter-option="filterOption"
                      allowClear>
              <a-select-option v-for="opt in skillOptions" :key="opt.key" :value="opt.key">
                {{opt.value}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="技能2" class="required">
            <a-select placeholder="请选择技能2"
                      v-model="param.skill2"
                      show-search
                      :filter-option="filterOption"
                      allowClear>
              <a-select-option v-for="opt in skillOptions" :key="opt.key" :value="opt.key">
                {{opt.value}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="技能3" class="required">
            <a-select placeholder="请选择技能3"
                      v-model="param.skill3"
                      show-search
                      :filter-option="filterOption"
                      allowClear>
              <a-select-option v-for="opt in skillOptions" :key="opt.key" :value="opt.key">
                {{opt.value}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="技能4" class="required">
            <a-select placeholder="请选择技能4"
                      v-model="param.skill4"
                      show-search
                      :filter-option="filterOption"
                      allowClear>
              <a-select-option v-for="opt in skillOptions" :key="opt.key" :value="opt.key">
                {{opt.value}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="技能5" class="required">
            <a-select placeholder="请选择技能5"
                      v-model="param.skill5"
                      show-search
                      :filter-option="filterOption"
                      allowClear>
              <a-select-option v-for="opt in skillOptions" :key="opt.key" :value="opt.key">
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
import buddy from '@/cheat/database/buddy.js'

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
      param: {
        skill1: undefined,
        skill2: undefined,
        skill3: undefined,
        skill4: undefined,
        skill5: undefined
      },
      skillOptions: []
    }
  },
  created () {
    this.handleSkill()

    // 回显
    let skills = this.data.data.skills
    if (skills && skills.length) {
      Object.keys(this.param).forEach((key, index) => {
        this.param[key] = skills[index]
      })
    }
  },
  methods: {
    onSubmit () {
      try {
        let arr = []
        Object.keys(this.param).forEach(key => {
          if (!this.param[key] && this.param[key] !== 0) {
            throw new Error('请完整填写配置')
          }
          arr.push(this.param[key])
        })
        if (arr.length !== [...new Set(arr)].length) {
          throw new Error('不允许存在重复随从技能')
        }
        this.$emit('submit', this.param)
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    closeModal () {
      this.$emit('close')
    },
    handleSkill () {
      let keys = Object.keys(buddy.skill).sort((a, b) => parseInt(a, 16) - parseInt(b, 16))
      keys.forEach(id => {
        if (!buddy.skill[id].includes('*')) {
          this.skillOptions.push({
            key: id,
            value: buddy.skill[id]
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
