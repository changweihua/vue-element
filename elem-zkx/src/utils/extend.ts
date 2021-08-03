// tslint:disable
const extend = function(this: any, ...args: any[]) {
  let options, name, src, srcType, copy, copyIsArray, clone

  let target = args[0] || {}

  let i = 1
  const length = args.length

  let deep = false

  if (typeof target === 'boolean') {
    deep = target
    target = args[i] || {}
    i++
  }
  if (typeof target !== 'object' && typeof target !== 'function') {
    target = {}
  }
  if (i === length) {
    target = this
    i--
  }
  for (; i < length; i++) {
    if ((options = args[i]) !== null) {
      for (name in options) {
        src = target[name]
        copy = options[name]
        if (target === copy) {
          continue
        }
        srcType = Array.isArray(src) ? 'array' : typeof src
        if (deep && copy && (Array.isArray(copy) || typeof copy === 'object')) {
          copyIsArray = Array.isArray(copy)
          if (copyIsArray) {
            copyIsArray = false
            clone = src && srcType === 'array' ? src : []
          } else {
            clone = src && srcType === 'object' ? src : {}
          }
          target[name] = extend(deep, clone, copy)
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }
  return target
}

export default extend
