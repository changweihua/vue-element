import _ from 'lodash'
import elementResizeDetectorMaker from 'element-resize-detector'

// 设置表格高度
const doResize = _.debounce(async (el, binding, vnode) => {
  // 获取表格Dom对象
  const { componentInstance: $table } = await vnode
  // 获取调用传递过来的数据
  const { value } = binding
  // if (!$table.height) {
  //   throw new Error(`el-$table must set the height. Such as height='100px'`)
  // }
  // console.log($table, '$table$table$table$table')
  // 获取距底部距离（用于展示页码等信息）
  const bottomOffset = (value && value.bottomOffset) || 50
  if (!$table) return
  // 计算列表高度并设置
  const height =
    window.innerHeight - el.getBoundingClientRect().top - bottomOffset
  // $table.layout.setMaxHeight(height)
  $table.layout.setHeight(height)
  // $table.maxHeight = height
  $table.doLayout()
}, 100)

export default {
  // 初始化设置
  bind(el, binding, vnode) {
    const erd = elementResizeDetectorMaker()
    // 设置resize监听方法
    el.resizeListener = async () => {
      await doResize(el, binding, vnode)
      // _.debounce(
      //   async () => {
      //     await doResize(el, binding, vnode)
      //   },
      //   2000,
      //   {
      //     leading: true,
      //     trailing: false
      //   }
      // )
    }
    erd.listenTo(el, el.resizeListener)
    // 绑定监听方法到addResizeListener
    // addResizeListener(window.document.body, el.resizeListener)
  },
  // // 绑定默认高度
  async inserted(el, binding, vnode) {
    await doResize(el, binding, vnode)
    // _.debounce(
    //   async () => {
    //     await doResize(el, binding, vnode)
    //   },
    //   2000,
    //   {
    //     leading: true,
    //     trailing: false
    //   }
    // )
  },
  // // 销毁时设置
  unbind() {
    // 移除resize监听
    // removeResizeListener(el, el.resizeListener)
  }
}
