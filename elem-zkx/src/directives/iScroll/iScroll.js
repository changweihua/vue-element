export default {
  inserted(el, binding) {
    const domHeight = el.clientHeight
    let distance = Number(binding.arg)
    if (Number.isNaN(distance)) distance = 0
    const { immediate } = binding.modifiers
    const cb = binding.value

    // if (el.scrollHeight === 0) {
    //   console.log(`scollheigt == ${el.scrollHeight}, 请检查overflow属性`)
    // }

    const handleScroll = () => {
      if (el.scrollHeight - el.scrollTop - distance <= domHeight) {
        cb()
      }
    }
    el['ifsScope'] = { handleScroll }

    el.addEventListener('scroll', handleScroll)

    if (immediate) {
      const observer = new MutationObserver(handleScroll)
      observer.observe(el, { childList: true, subtree: true })
      handleScroll()
    }
  },
  unbind(el) {
    const { handleScroll } = el['ifsScope']
    el.removeEventListener('scroll', handleScroll)
  }
}
