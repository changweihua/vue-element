<template>
  <div class="header-action">
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <span class="account-info">
          {{ userName || '系统用户' }}
        </span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus" command="logout">
          {{ $t('logout') }}
        </el-dropdown-item>
        <el-divider></el-divider>
        <el-dropdown-item icon="el-icon-circle-plus">
          MenuItem
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { PermissionModule } from '@/store/modules/permission'
import { AccountModule } from '@/store/modules/account'
import { resetRouter } from '@/router/permission'

export default {
  name: 'HeaderAction',
  computed: {
    userName() {
      return AccountModule.userName
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.doLogout()
          break
      }
    },
    doLogout() {
      this.$confirm('确认退出本次登录吗?', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: true,
        center: true,
        callback: async (action) => {
          console.log(action)
          if (action === 'confirm') {
            const cancelArr = window.axiosCancel
            cancelArr.forEach((ele) => {
              ele.cancel(`取消了 ${ele.url} 请求`) // 在失败函数中返回这里自定义的错误信息
            })
            await PermissionModule.ResetRoutesAsync()
            await AccountModule.LogoutAsync()
            window.isRouterGenerated = false
            resetRouter()
            this.$router.push('/login')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header-action {
  .account-info {
    cursor: pointer;
    padding-left: 20px;
    color: navy;
  }
}
</style>
