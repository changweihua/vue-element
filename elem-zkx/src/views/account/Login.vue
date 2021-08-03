<template>
  <div class="login-container">
    <div class="login-form">
      <el-row class="login-form-row">
        <el-col class="form-left" :xs="0" :sm="0" :md="8">
          <vue-particles
            :color="particleColor"
            :particleOpacity="0.9"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="15"
            linesColor="#dedede"
            :linesWidth="2"
            :lineLinked="true"
            :lineOpacity="0.6"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="false"
            hoverMode="grab"
            :clickEffect="false"
            clickMode="push"
            style="height:100%;"
          ></vue-particles>
        </el-col>
        <el-col class="form-right" :xs="24" :sm="24" :md="16">
          <div class="login-form-header">
            <el-row>
              <el-col :span="6" :xs="0" :md="0" style="text-align:left;">
                <img style="height: 48px;" src="/logo_small.png" />
              </el-col>
              <el-col :span="2" :xs="0" :md="0" style="text-align:center;">
                &emsp;&emsp;&emsp;
              </el-col>
              <el-col style="text-align: right;" :span="16" :xs="0" :md="0">
                {{ appName }}
              </el-col>
            </el-row>
          </div>
          <div class="login-form-body" v-loading.fullscreen.lock="spinning">
            <el-divider orientation="left">
              <div class="el-space">
                <img class="app-logo" src="/logo_small.png" />
                <span class="animated infinite bounce delay-2s app-name">
                  {{ appName }}
                </span>
              </div>
            </el-divider>

            <transition
              name="slide-fade"
              :duration="{ enter: 1500, leave: 800 }"
            >
              <div
                v-if="showCode"
                class="login-form-code animated bounceInDown"
              >
                <vue-qr
                  class="bicode"
                  :logoSrc="`/logo.png`"
                  :logoBackgroundColor="'transparent'"
                  :logoScale="128"
                  :text="codeValue"
                  :margin="0"
                  :dotScale="1"
                ></vue-qr>
                <svg-icon
                  :icon-class="'close'"
                  @click="toggleQrCode(false)"
                  style="width:48px;height:48px;display: block;margin: 0 auto;"
                />
              </div>
              <div v-else>
                <el-form
                  :model="form"
                  :rules="rules"
                  ref="loginForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item prop="loginName">
                    <el-input placeholder="登录名" v-model="form.loginName">
                      <template slot="append">
                        <i class="el-icon-user" style="color:rgba(0,0,0,.25)" />
                      </template>
                    </el-input>
                  </el-form-item>

                  <el-form-item prop="loginPwd">
                    <el-input
                      type="password"
                      placeholder="密码"
                      v-model="form.loginPwd"
                    >
                      <template slot="append">
                        <i class="el-icon-key" style="color:rgba(0,0,0,.25)" />
                      </template>
                    </el-input>
                  </el-form-item>

                  <el-form-item prop="captchaCode">
                    <el-input placeholder="验证码" v-model="form.captchaCode">
                      <template slot="suffix">
                        <captcha-code
                          slot="addonAfter"
                          :value.sync="form.validCode"
                        ></captcha-code>
                      </template>
                    </el-input>
                  </el-form-item>

                  <el-form-item style="text-align:center">
                    <el-button @click="doLogin" type="primary" block>
                      登录
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </transition>
          </div>
          <div class="login-form-footer">
            <div class="copy-right" v-html="appCopyright"></div>
          </div>
          <div v-if="!showCode" class="login-form-qr">
            <svg-icon
              @click="toggleQrCode(true)"
              :icon-class="'qr-code'"
              style="width:48px;height:48px;"
            />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { PermissionModule } from '@/store/modules/permission'
// import { AccountModule, AccountInfo } from '@/store/modules/account'
// import { auth } from '@/apis/account.api'
import vueQr from 'vue-qr'
import CaptchaCode from '@/components/CaptchaCode/index.vue'

//引入marked
import marked from 'marked'
import { auth } from '@/apis/account.api'
import { AccountInfo, AccountModule } from '@/store/modules/account'
import { PermissionModule } from '@/store/modules/permission'
import { defaultRoutePath } from '@/router/permission'

@Component({
  components: {
    vueQr,
    CaptchaCode
  }
})
export default class Login extends Vue {
  private md = marked('#111')

  private form = {
    loginName: '',
    loginPwd: '',
    captchaCode: '',
    validCode: ''
  }

  private particleColor = process.env.VUE_APP_PRIMARY_COLOR
  private appName = process.env.VUE_APP_NAME
  private appCopyright = process.env.VUE_APP_COPYRIGHT

  private spinning = false

  private showCode = false
  private codeValue = `${process.env.VUE_APP_HOST}:${process.env.VUE_APP_PORT}`

  private rules = {
    loginName: [
      {
        required: true,
        message: '请输入用户名',
        trigger: ['blur', 'change']
      }
    ],
    loginPwd: [
      {
        required: true,
        message: '请输入密码',
        trigger: ['blur', 'change']
      }
    ]
  }

  private mounted() {
    this.enterKeyup()
  }
  private destroyed() {
    // 销毁enter事件
    this.enterKeyupDestroyed()
  }

  private toggleQrCode(flag: boolean) {
    this.showCode = flag
  }

  private enterKey(event: KeyboardEvent) {
    const componentName = this.$options.name
    if (componentName === 'Login') {
      const code = event.keyCode
        ? event.keyCode
        : event.which
        ? event.which
        : event.charCode
      if (code === 13) {
        // this.doLogin()
      }
    }
  }
  private enterKeyupDestroyed() {
    document.removeEventListener('keyup', this.enterKey)
  }
  private enterKeyup() {
    document.addEventListener('keyup', this.enterKey)
  }

  public $refs!: { loginForm: any }

  private doLogin() {
    const form = this.$refs.loginForm // as FormModel
    if (form) {
      form.validate((valid: boolean) => {
        if (valid) {
          this.spinning = true
          auth({
            username: this.form.loginName,
            password: this.form.loginPwd,
            captchaCode: this.form.captchaCode,
            // eslint-disable-next-line @typescript-eslint/camelcase
            client_id: 'client_id',
            // eslint-disable-next-line @typescript-eslint/camelcase
            client_secret: 'client_secret',
            // eslint-disable-next-line @typescript-eslint/camelcase
            grant_type: 'password'
          })
            .then(async (json) => {
              if (json.code === 0) {
                const accountInfo: AccountInfo = {
                  userName: 'ADG',
                  accessToken: json.accessToken,
                  refreshToken: json.refreshToken,
                  expiresAt: json.expiresAt,
                  refreshExpiresAt: json.refreshExpiresAt
                }

                // AccountModule.LoginAsync(accountInfo)
                //   .then(() => {
                //     return PermissionModule.GetPermissionAsync()
                //   })
                //   .then(() => {
                //     this.$router.push('/dashboard').catch((err) => {
                //       err
                //     })
                //   })
                // Promise.all([])
                await AccountModule.LoginAsync(accountInfo)
                await AccountModule.GetAccountProfileAsync()
                await PermissionModule.GetPermissionAsync()
                this.$router.push(defaultRoutePath).catch((err) => {
                  err
                })
              }
            })
            .catch((ex) => {
              console.log(ex)
              this.spinning = false
            })
            .finally(() => {
              // this.spinning = false
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
body,
body /deep/ #app {
  min-height: 100%;
}

.login-container {
  background: #252c37;
  background: url('/login/bg_02.png');
  background-size: 100% 100%;
  height: 100%;
  /*脱离文档流，为他添加个fixed属性*/
  position: fixed;
  width: 100%;
}

.form-left {
  height: 100%;
  // background: #2d3b4a;
  background: transparent;
  // background: url('../../assets/bg_dl.png');
  // background-size: 100% 100%;
  // height: 100%;
  /*脱离文档流，为他添加个fixed属性*/
  // position: fixed;
  // width: 100%;
}
.form-right {
  height: 100%;
  color: #fff;
  background: #fff;
  padding: 0 50px;
  position: relative;
}
.login-form {
  // background: url("../../public/images/bg_02.png");
  // background-size: 100% 100%;
  //   height: 62%;
  //   // /*脱离文档流，为他添加个fixed属性*/
  //   position: fixed;
  //   width: 58%;
  height: 100%;
  max-width: 1000px;
  max-height: 482px;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  overflow: auto;
  margin: auto;
  position: absolute;
  border-radius: 2px;
  filter: progid:DXImageTransform.Microsoft.Shadow(color=#141414,direction=120,strength=4);
  -moz-box-shadow: 2px 2px 10px #141414;
  -webkit-box-shadow: 2px 2px 10px #141414;
  box-shadow: 2px 2px 10px #141414;
}

.login-form-row {
  height: 100%;
}

.login-form-header {
  height: 68px;
  background: #fff;
  color: #000;
  font-size: 24px;
  text-align: center;
  line-height: 68px;
}

.login-form-body {
  height: calc(100% - 156px);
  .login-form-code {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // text-align: center;
    .bicode {
      margin-bottom: 20px;
    }
  }
}

.el-space {
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-enter-active {
  //类名：隐藏到显示过程所需要的时间
  animation: bounce-in 1.5s;
}
.fade-leave-active {
  //类名：显示到隐藏过程所需要的时间
  animation: bounce-in 0.8s reverse; //reverse表示和隐藏到显示动画相反
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.login-form-qr {
  position: absolute;
  top: 0;
  right: 0;
  width: 48px;
  height: 48px;
  transition: 1s all;
}

.login-form-footer {
  height: 64px;
  background: #fff;
  color: #000;
  font-size: 14px;
  text-align: center;
  line-height: 64px;
  vertical-align: middle;
}
/* to prevent the arrow overflow the popup container,
or the height is not enough when content is empty */
.numeric-input .ant-tooltip-inner {
  min-width: 32px;
  min-height: 37px;
}

.numeric-input .numeric-input-title {
  font-size: 14px;
}

.app-name {
  text-indent: 0.5em;
  font-size: 20px;
  font-weight: bold;
}
.app-logo {
  height: 26px;
  /* width: 32px; */
  display: inline-block;
  line-height: 26px;
  vertical-align: middle;
  // margin-top: -4px;
}

.ant-space.ant-space-vertical {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 576px) {
  .form-right {
    padding: 0 25px;
  }
  .login-form-qr {
    display: none;
  }
}

@media screen and (max-height: 376px) {
  .login-form-header {
    height: 28px;
    line-height: 28px;
  }
  .login-form-footer {
    height: 44px;
    line-height: 44px;
  }
  .login-form-body {
    height: calc(100% - 96px);
  }
  .login-form-qr {
    display: none;
  }
}
</style>
