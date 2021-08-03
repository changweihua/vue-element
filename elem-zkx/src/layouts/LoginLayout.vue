<template>
  <div id="dashboarder" class="outer-container">
    <div class="inner-container">
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginLayout'
}
</script>

<style lang="less">
html,
body {
  height: 100%;

  /deep/ #app {
    height: 100%;

    .outer-container {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
    .inner-container {
      position: absolute;
      left: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      width: 100%;
      height: 100%;
    }

    /* for Chrome */
    .inner-container::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
