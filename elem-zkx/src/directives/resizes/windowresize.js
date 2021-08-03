// tslint:disable
// 实时监测窗口变化，返回当前元素的宽度和高度
// 调用方式 v-winresize="自定义接收函数"
const windowresize = {
  bind: (el, binding, vnode) => {
    // bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，不是本身，则返回
      // if (!el.contains(e.target)) {
      //   return false
      // }
      if (binding.expression) {
        //返回当前元素的宽度和高度
        binding.value(el.offsetWidth, el.offsetHeight)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueWindowsResize__ = documentHandler
    window.addEventListener('resize', documentHandler)
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('mouseup', el.__vueClickOutside__)
  },
  inserted: () => {
    // inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
  },
  update: () => {
    // update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
  },
  componentUpdated: () => {
    // componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
  },
  unbind: (el, binding) => {
    // unbind: 只调用一次， 指令与元素解绑时调用。
    window.removeEventListener('onresize', el.__vueWindowsResize__)
    delete el.__vueWindowsResize__
  }
}

export default windowresize
