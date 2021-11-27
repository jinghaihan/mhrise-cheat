<template>
  <div class="container">
    <div class="login">
      <div class="title">
        <img class="logo" :src="require('@/assets/logo.png')" />
        <h1 class="name">{{name}}</h1>
      </div>
      <div class="form">
        <a-form :form="form" autocomplete="off">
          <a-form-item>
            <a-input
              v-decorator="[
                'username',
                { rules: [{ required: true, message: '请输入用户名' }] },
              ]"
              size="large"
              placeholder="用户名"
            >
              <a-icon slot="prefix" type="contacts" class="form-prefix" theme="filled"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password
              v-decorator="[
                'password',
                { rules: [{ required: true, message: '请输入密码' }] },
              ]"
              size="large"
              placeholder="密码"
            >
              <a-icon slot="prefix" type="lock" class="form-prefix" theme="filled"/>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-row>
              <a-col :span="15">
                <a-input
                  v-decorator="[
                    'captcha',
                    { rules: [{ required: true, message: '请输入验证码' }] },
                  ]"
                  size="large"
                  type="captcha"
                  placeholder="验证码"
                >
                  <a-icon slot="prefix" type="safety-certificate" class="form-prefix" theme="filled"/>
                </a-input>
              </a-col>
              <a-col :span="8" :offset="1">
                <!-- 验证码 -->
                <div class="captcha" @click="renderCaptcha()">
                  <canvas id="captcha-canvas"></canvas>
                </div>
              </a-col>
            </a-row>
          </a-form-item>
        </a-form>
        <a-button class="login-button" type="primary" size="large" @click="handleSubmit">登录</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      // 系统名称
      name: window.custom.systemName.toUpperCase(),
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.renderCaptcha()
  },
  methods: {
    handleSubmit () {
      let self = this
      self.form.validateFields((err, values) => {
        if (err) return
        self.$store.dispatch('user/Navigation').then(() => {
          Vue.ss.set('loggedIn', true)
          self.$router.push('/')
        })
      })
    },
    // 渲染验证码
    renderCaptcha () {
      // 获取dom元素
      let captcha = document.getElementById('captcha-canvas')
      let show = []
      let width = $(captcha).width()
      let height = $(captcha).height()
      let context = captcha.getContext('2d')
      captcha.width = width
      captcha.height = height
      let codes = ['A', 'B', 'C', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
      let length = codes.length
      // 渲染文字内容
      for (let i = 0; i < 4; i++) {
        // 获取到随机的索引值
        let index = Math.floor(Math.random() * length)
        // 产生0~30之间的随机弧度
        let deg = (Math.random() * 30 * Math.PI) / 180
        // 得到随机内容
        let txt = codes[index]
        show[i] = txt.toLowerCase()
        // 文字在canvas上的x坐标
        let x = 10 + i * 20
        // 文字在canvas上的y坐标
        let y = 20 + Math.random() * 8
        context.font = 'bold 30px arial'
        context.translate(x, y)
        context.rotate(deg)
        context.fillStyle = (() => {
          let r = Math.floor(Math.random() * 256)
          let g = Math.floor(Math.random() * 256)
          let b = Math.floor(Math.random() * 256)
          return 'rgb(' + r + ',' + g + ',' + b + ')'
        })()
        context.fillText(txt, 0, 0)
        context.rotate(-deg)
        context.translate(-x, -y)
      }
      // 验证码上显示线条
      for (let i = 0; i < 5; i++) {
        context.strokeStyle = (() => {
          let r = Math.floor(Math.random() * 256)
          let g = Math.floor(Math.random() * 256)
          let b = Math.floor(Math.random() * 256)
          return 'rgb(' + r + ',' + g + ',' + b + ')'
        })()
        context.beginPath()
        context.moveTo(
          Math.random() * width,
          Math.random() * height
        )
        context.lineTo(
          Math.random() * width,
          Math.random() * height
        )
        context.stroke()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #243B55, #141E30);
  }
  .login{
    width: 380px;
    .title{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
      .logo{
        height: 50px;
        width: 50px;
      }
      .name{
        color: #fff;
      }
    }
    .form{
      .login-button{
        width: 100%;
      }
      ::v-deep.ant-input-prefix{
        margin-right: 16px;
      }
      ::v-deep.ant-input-affix-wrapper .ant-input:not(:first-child){
        padding-left: 40px;
      }
      .form-prefix{
        font-size: 20px;
        color: rgba(0,0,0,.25);
      }
      .captcha{
        height: 40px;
        width: 100%;
        #captcha-canvas{
          border-radius: 4px;
          height: 100%;
          width: 100%;
        }
      }
    }
  }
</style>
