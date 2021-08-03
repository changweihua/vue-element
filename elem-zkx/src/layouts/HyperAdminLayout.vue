<template>
  <div class="app-layout" v-wresize="winResize">
    <el-container class="app-main">
      <el-header class="app-header">
        <el-row type="flex">
          <el-col class="app-header-left" :span="8">
            <span class="header-title" :title="`${appShortName}`">
              {{ appName }}
            </span>
          </el-col>
          <el-col class="app-header-right" :offset="8" :span="8">
            <HeaderAction />
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <el-aside :class="{ asideCollapse: isCollapse }">
          <div class="menu-toggle">
            <i
              @click="toggleMenuCollapse"
              :class="
                isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'
              "
            />
          </div>
          <el-menu
            class="el-menu-vertical"
            :unique-opened="true"
            mode="vertical"
            :default-active="$route.path"
            text-color="#fff"
            router
            :collapse="isCollapse"
            @select="handleSelect"
            @open="handleOpen"
            @close="handleClose"
          >
            <RouterMenu :menus="sysMenus" :root="``" />
          </el-menu>
          <Sidebar v-if="false" :menuList="sysMenus" />
        </el-aside>
        <el-container>
          <el-main>
            <el-row>
              <el-col :span="24">
                <RouterCrumb />
              </el-col>
              <el-col :span="24">
                <transition
                  enter-active-class="animated fadeIn"
                  leave-active-class="animated fadeOut"
                >
                  <router-view
                    class="router-content"
                    @content_spinning="toggleContentSpinning"
                  />
                </transition>
              </el-col>
            </el-row>
          </el-main>
          <!-- <el-footer class="app-footer">Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import RouterMenu from '@/components/RouterMenu/index.vue'
import RouterCrumb from '@/components/RouterCrumb/index.vue'
import HeaderAction from '@/components/HeaderAction/index.vue'
import Sidebar from '@/components/SideBar/index.vue'
import { PermissionModule } from '@/store/modules/permission'
import { AccountModule } from '@/store/modules/account'
import { asyncRoutes } from '@/router/asyncRouter'

export default {
  name: 'HyperAdminLayout',
  provide() {
    return {
      app: this,
      appPageSize: parseInt(process.env.VUE_APP_PAGER_PAGESIZE)
    }
  },
  components: { RouterMenu, RouterCrumb, HeaderAction, Sidebar },
  data() {
    return {
      messages: [],
      subMenus: [],
      current: [],
      contentSpinning: false,
      contentSpinningCount: 0,
      pageCrumb: '',
      appName: process.env.VUE_APP_NAME,
      appShortName: process.env.VUE_APP_SHORT_NAME,
      appCopyright: process.env.VUE_APP_COPYRIGHT,
      currentLocale: localStorage.getItem('locale'),
      currentTheme: localStorage.getItem('theme'),
      isCollapse: false,
      levelList: [],
      sysMenus: asyncRoutes
        .filter((r) => !r.meta.hidden)
        .map((r) => this.formatMenu(r))
    }
  },
  watch: {
    $route: {
      handler() {
        if (this.$route.matched) {
          this.current = this.$route.matched.map((m) => m.name)
          const route = this.$route.matched[0]
          console.log(route)
          // if (route) {
          //   this.pageCrumb = this.$route.matched[
          //     this.$route.matched.length - 1
          //   ].meta.title
          //   this.onHeaderMenuItemClick({ key: route.name })
          // }
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    userName() {
      return AccountModule.userName
    }
  },
  methods: {
    toggleMenuCollapse() {
      this.isCollapse = !this.isCollapse
    },
    formatMenu(menu) {
      const isBranch =
        menu.children && menu.children.filter((r) => !r.meta.hidden).length > 0

      if (!isBranch) {
        return {
          name: menu.name,
          title: menu.meta.title,
          icon: menu.meta.icon || 'user',
          path: menu.path,
          svg: !!menu.meta.svg,
          leaf: !!menu.meta.leaf
        }
      }

      return {
        name: menu.name,
        title: menu.meta.title,
        icon: menu.meta.icon || 'user',
        path: menu.path,
        svg: !!menu.meta.svg,
        leaf: !!menu.meta.leaf,
        children: menu.children
          .filter((r) => !r.meta.hidden)
          .map((__) => this.formatMenu(__))
      }
    },
    onMessageClick() {
      // console.log(item)
      // readMessage(item.id, UserModule.userId).then((json) => {
      //   console.log(json)
      // })
    },
    onHeaderMenuItemClick({ key }) {
      let menus = []
      const topMenu = PermissionModule.routers.find((r) => r.name === key)
      if (topMenu && topMenu.children) {
        menus = topMenu.children.map((r) => {
          return {
            name: r.name,
            title: r.meta.title,
            icon: r.meta.icon,
            path: r.path,
            svg: !!r.meta.svg,
            children: r.children
              ? r.children.map((rr) => {
                  return {
                    name: rr.name,
                    title: rr.meta.title,
                    icon: rr.meta.icon,
                    path: rr.path,
                    svg: !!rr.meta.svg
                  }
                })
              : []
          }
        })
      }
      this.subMenus = menus
    },
    selectLang(lang) {
      this.currentLocale = lang
      this.$emit('lang_changed', lang)
    },
    changeTheme(themeColor) {
      this.currentTheme = themeColor
      this.$emit('theme_changed', themeColor)
    },
    toggleContentSpinning(spinning) {
      // 显示 Loading
      if (spinning) {
        this.contentSpinningCount++
        if (!this.contentSpinning) {
          this.contentSpinning = true
        }
      } else {
        //关闭
        if (this.contentSpinningCount > 0) {
          this.contentSpinningCount--
        }
        if (this.contentSpinningCount === 0) {
          this.contentSpinning = false
        }
      }
    },
    winResize() {
      if (this.$refs.app_affix) {
        this.$refs.app_affix.updatePosition()
      }
    },
    handleOpen(key, keyPath) {
      console.log(key)
      console.log(keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      // this.$router.push({
      //   name: key
      // })
    }
  }
}
</script>

<style lang="less">
@header-height: 60px;
@background-color: #3b5998;
@header-background-color: #fff;
@header-shadow-color: #3b5998;
@header-title-color: #3b5998;
@aside-background-color: #3b5998;
@menu-hover-background-color: #2f477a;
@menu-active-text-color: #26aafe;
@color: #fff;

.app-layout {
  height: 100%;
  width: 100%;

  .app-main {
    height: 100vh;
    min-width: 800px;
    min-height: 600px;
    overflow: hidden;
    aside {
      overflow: visible;
      height: 100%;
      background-color: @background-color;
      color: @color;
    }
    .app-header {
      z-index: 1;
      height: 46px !important;
      line-height: 46px !important;
      width: 100%;
      background-color: @header-background-color;
      box-shadow: 1px 3px 3px @header-shadow-color;
      padding: 0;
      color: @color;
      overflow: hidden;

      .el-dropdown {
        cursor: pointer;
        float: right;
      }

      .app-header-left {
        padding-left: 50px;
        text-align: left;
        .header-title {
          vertical-align: middle;
          font-size: 20px;
          color: @header-title-color;
          display: inline-block;
          overflow: hidden;
        }
      }

      .app-header-center {
        text-align: center;
      }

      .app-header-right {
        text-align: right;
        padding-right: 50px;
      }
    }

    .app-footer {
      text-align: center;
      background-color: @background-color;
      color: @color;
      line-height: 50px;
    }
  }
}

.el-aside {
  width: 200px !important;
  transition: all 0.5s;

  .menu-toggle {
    display: block;
    text-align: center;
    margin: 15px 0;
    cursor: pointer;
  }
}

.asideCollapse {
  width: 64px !important;
  transition: all 0.5s;
}

.el-menu,
.el-submenu {
  background: @aside-background-color;
  color: #fff;

  // .el-menu-item.is-active {
  //   background: red !important;
  // }
  // .el-submenu__title.is-active {
  //   background: red !important;
  // }
}

.el-submenu [class^='el-icon-'] {
  color: #fff;
}

//父级的类名

.el-submenu__title:hover {
  background-color: @menu-hover-background-color !important;
}

//子级的类名

// .el-menu-item {
//   border-left: @menu-active-text-color solid 3px;
// }

.el-menu-item:hover {
  background-color: @menu-hover-background-color !important;
}

.el-menu-item.is-active {
  border-left: @menu-active-text-color solid 3px;
  background-color: @menu-hover-background-color !important;
  color: @menu-active-text-color;
  span {
    color: @menu-active-text-color !important;
  }
}

.el-menu-vertical {
  border-right: none;
  // width: 64px;
}
.el-menu-vertical:not(.el-menu--collapse) {
  // width: 200px;
  min-height: 400px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-container {
  height: 100%;
}
</style>
