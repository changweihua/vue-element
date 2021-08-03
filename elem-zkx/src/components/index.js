import Vue from 'vue'

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1)
// }
// 找到components文件夹下以.vue命名的文件
const requireComponent = require.context('components', true, /.vue$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  // var cmpt = fileName.slice(fileName.lastIndexOf("/"))
  // 因为得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名
  // const componentName = capitalizeFirstLetter(cmpt.replace(/^.\//, "").replace(/.w+$/, ""))
  const componentName = (componentConfig.default || componentConfig).name
  Vue.component(componentName, componentConfig.default || componentConfig)
})

export default {}
