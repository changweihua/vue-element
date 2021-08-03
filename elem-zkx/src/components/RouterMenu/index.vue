<template>
  <fragment>
    <template v-for="menu in menus">
      <el-menu-item
        v-if="!menu.children || menu.children.length == 0"
        :key="menu.name"
        :index="`${[root, menu.path].filter((_) => _ !== '').join('/')}`"
      >
        <i class="el-icon-eleme"></i>
        <span slot="title">{{ menu.title }}</span>
      </el-menu-item>

      <el-submenu v-else :index="`${root}/${menu.path}`" :key="menu.name">
        <template slot="title">
          <!-- <i :class="menu.icon"></i> -->
          <i class="el-icon-eleme"></i>
          <span slot="title">{{ menu.title }}</span>
        </template>
        <router-menu
          :root="`${[root, menu.path].filter((_) => _ !== '').join('/')}`"
          :menus="menu.children"
        />
      </el-submenu>
    </template>
  </fragment>
</template>

<script>
export default {
  props: ['menus', 'root'],
  name: 'RouterMenu'
}
</script>

<style scoped>
.el-menu--collapse span,
.el-menu--collapse i.el-submenu__icon-arrow {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>
