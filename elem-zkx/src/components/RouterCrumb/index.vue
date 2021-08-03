<template>
  <div class="router-crumb">
    <el-breadcrumb separator-class="el-icon-d-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) in breadList"
        :key="index"
        :to="{ path: item.path }"
      >
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  naem: 'RouterCrumb',
  data() {
    return {
      breadList: [] // 路由集合
    }
  },
  watch: {
    //路由改变的时候监听
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    isHome(route) {
      //拿到首页
      return route.name === 'home'
    },

    getBreadcrumb() {
      const matched = this.$route.matched //拿到显示的路由路径
      console.log('matched', matched)
      //   if (!this.isHome(matched[0])) {
      //     //当前路由等于首页
      //     matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched)
      //   }

      this.breadList = matched
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assets/zks.less';

.router-crumb {
  pointer-events: none;

  /deep/.el-breadcrumb__item .el-breadcrumb__inner {
    color: gray;
  }

  /deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: @menu-active-text-color;
  }
}
</style>
