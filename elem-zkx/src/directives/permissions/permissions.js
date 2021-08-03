import { PermissionModule } from '@/store/modules/permission'

const hasPermission = {
  inserted(el, binding, vnode) {
    const behaviorCodes = [
      ...(PermissionModule.behaviors.map((_) => _.behaviorCode) || [])
    ]
    if (!behaviorCodes.includes(binding.value)) {
      console.log(el.parentNode)
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
    }
  }
}

export default hasPermission
