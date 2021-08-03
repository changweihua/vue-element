const clickoutsideContext = '@@clickoutsideContext'

const outsideClick = {
  bind(el, binding, vnode) {
    const documentHandler = (e) => {
      if (vnode.context && !el.contains(e.target)) {
        vnode.context[el[clickoutsideContext].methodName]()
      }
    }

    el[clickoutsideContext] = {
      documentHandler,
      methodName: binding.expression,
      arg: binding.arg || 'click'
    }
    document.addEventListener(el[clickoutsideContext].arg, documentHandler)
  },

  update(el, binding) {
    el[clickoutsideContext].methodName = binding.expression
  },

  unbind(el) {
    document.removeEventListener(
      el[clickoutsideContext].arg,
      el[clickoutsideContext].documentHandler
    )
  },

  install(Vue) {
    Vue.directive('outsideClick', {
      bind: this.bind,
      unbind: this.unbind
    })
  }
}

export default outsideClick
