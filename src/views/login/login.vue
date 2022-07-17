<template>
  <div class="container">
    <div class="login">
      <div class="background-container">
        <img class="logo" :src="require('@/assets/auth-bg.png')" />
      </div>
      <div class="form-container">
        <div class="title">
          <img class="logo" :src="require('@/assets/logo-sb.png')" />
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
                @keyup.enter.native="handleSubmit"
              >
                <a-icon slot="prefix" type="lock" class="form-prefix" theme="filled"/>
              </a-input-password>
            </a-form-item>
          </a-form>
          <div class="login-button-container" @click="handleSubmit">
            <div class="login-button-text">登录</div>
            <a-button class="login-button" shape="circle" size="large" icon="login"></a-button>
          </div>
          <div class="powered-container">
            Powered by {{copyright}}
          </div>
        </div>
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
      form: this.$form.createForm(this),
      copyright: window.custom.copyright
    }
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
    background: #192028;
  }
  .login{
    display: flex;
    align-items: center;
    .form-container{
      width: 350px;
      .title{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
        height: 100px;
        .logo{
          height: 100%;
        }
      }
      .form{
        .login-button-container{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .login-button-text{
            font-size: 18px;
            font-weight: 500;
            color: #2a8b9f;
            margin-right: 20px;
          }
          .login-button{
            background: #2a8b9f;
            border: 1px solid #2a8b9f;
            font-size: 24px;
            color: #fff;
            width: 64px;
            height: 64px;
          }
        }
        .powered-container{
          margin-top: 32px;
          color: #828991;
          display: flex;
          align-items: center;
          justify-content: center;
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
      }
    }
  }
</style>
