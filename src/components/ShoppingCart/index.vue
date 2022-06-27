<template>
  <a-badge class="badge"
           :count="length"
           :offset="[-10, 25]">
    <a-icon class="action-icon"
            type="shopping-cart"
            title="购物车"
            @click="onClick">
    </a-icon>

    <a-drawer placement="right"
              :closable="false"
              :destroyOnClose="true"
              :visible="visible"
              :width="300"
              @close="onClose">
      <!-- 抽屉标题 -->
      <div class="title-container" slot="title">
        <div class="title">购物车</div>
        <div class="button">
          <a-button type="primary" size="small" icon="cloud-download" :disabled="!length" @click="onDownload">下载全部</a-button>
          <a-button type="danger" size="small" icon="delete" :disabled="!length" @click="onClear">清空</a-button>
        </div>
      </div>

      <!-- 抽屉内容 -->
      <div v-for="version in Object.keys(cheats)" :key="version">
        <a-divider>{{version}}</a-divider>
        <a-collapse :bordered="false" accordion>
          <template #expandIcon="props">
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel v-for="title in Object.keys(cheats[version])"
                            :key="title"
                            :style="collapseStyle">
              
              <div class="panel-title-container" slot="header">
                <div class="title">
                  <a-tooltip>
                    <template slot="title">{{title}}</template>
                    {{title}}
                  </a-tooltip>
                </div>
                <div class="button">
                  <a-icon theme="filled" type="close-circle" title="删除" @click="onDelete($event, title)"></a-icon>
                </div>
              </div>
              <pre>{{ cheats[version][title] }}</pre>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </a-drawer>
  </a-badge>
</template>

<script>
import { deleteCheat } from '@/cheats/utils/store.js'
import { downloadCheat } from '@/cheats/utils/download.js'

export default {
  data () {
    return {
      cheats: {},
      length: 0,
      visible: false,
      collapseStyle: 'background: #f7f7f7;border-radius: 4px;border: 0;'
    }
  },
  computed: {
    listenCheats () {
      return this.$store.state.user.cheats
    }
  },
  watch: {
    listenCheats: {
      immediate: true,
      deep: true,
      handler: function (value) {
        if (!value) return
        this.length = Object.keys(value).length
        this.cheats = this.handleData(value)
      }
    }
  },
  methods: {
    handleData (cheats) {
      let data = {}
      Object.keys(cheats).forEach(title => {
        let cheat = cheats[title]
        if (!data[cheat.version]) data[cheat.version] = {}
        if (!data[cheat.version][cheat.title]) data[cheat.version][cheat.title] = cheat.value
      })
      return data
    },
    onClick () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    onDownload () {
      Object.keys(this.cheats).forEach(version => {
        let template = ``
        Object.keys(this.cheats[version]).forEach(title => {
          template += `[${title}]\n`
          template += this.cheats[version][title] + '\n'
        })
        downloadCheat(template, version)
      })
    },
    onClear () {
      let titles = []
      Object.keys(this.cheats).forEach(version => {
        Object.keys(this.cheats[version]).forEach(title => {
          titles.push(title)
        })
      })
      deleteCheat(titles)
    },
    onDelete (e, title) {
      e.cancelBubble = true
      deleteCheat([title])
    }
  }
}
</script>

<style lang="less" scoped>
  .badge{
    display: inline-block;
    height: 100%;
    .action-icon{
      font-size: 22px;
      cursor: pointer;
      display: flex;
      height: 100%;
      align-items: center;
      padding: 0 12px;
    }
    .action-icon:hover{
      background: rgba(0,0,0,.025);
    }
  }
  .title-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .button{
      >button{
        margin-right: 4px;
      }
      >button:last-of-type{
        margin-right: 0;
      }
    }
  }
  .panel-title-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title{
      width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  /deep/.ant-drawer-body{
    max-height: calc(~"100vh - 60px");
    overflow-y: auto;
  }
</style>
