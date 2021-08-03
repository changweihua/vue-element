import { RouteConfig } from 'vue-router'
import { constantRoutes } from '@/router/constantRouter'
import { asyncRoutes } from '@/router/asyncRouter'
import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import {
  AccountBehaviorModel,
  AccountBehaviorPermissionModel,
  AccountPermissionModel
} from '@/models/account.model'
import { getPermissionList } from '@/apis/account.api'
// import { validate as uuidValidate } from 'uuid'
// uuidValidate('not a UUID')

export interface PermissionState {
  routers: RouteConfig[]
  dynamicRouters: RouteConfig[]
  permissions: AccountPermissionModel[]
  behaviors: AccountBehaviorModel[]
  isRouterGenerated: boolean
}

export const filterRouter = (
  routers: RouteConfig[],
  behaviorCodes: string[]
) => {
  const accessedRouters: RouteConfig[] = []
  routers.forEach((router) => {
    const { path, component, meta, children, name, redirect } = router
    // if (router.meta) {
    //   // 默认图标处理
    //   router.meta.icon = router.meta.icon ? router.meta.icon : 'component'
    // }
    const nRouter = {
      path: path,
      component: component,
      name: name,
      children:
        children && children.length > 0
          ? filterRouter(children, behaviorCodes)
          : [],
      meta: meta,
      redirect: redirect
    }
    if (
      nRouter.meta.code === '0' ||
      behaviorCodes.includes(nRouter.meta.code)
    ) {
      accessedRouters.push(nRouter)
    }
  })
  return accessedRouters
}

@Module({
  dynamic: true,
  store,
  name: 'permission',
  namespaced: true,
  preserveState: window.localStorage.getItem('vuex') !== null
})
class Permission extends VuexModule implements PermissionState {
  public routers: RouteConfig[] = constantRoutes
  public dynamicRouters: RouteConfig[] = []
  public permissions: AccountPermissionModel[] = []
  public behaviors: AccountBehaviorModel[] = []
  public isRouterGenerated = false

  @Action
  public async ResetRoutesAsync() {
    return new Promise<void>((resolve) => {
      this.SET_ROUTERS([])
      this.SET_ROUTER_GENERTATED(false)
      resolve()
    })
  }

  @Action({ rawError: true })
  public async GetPermissionAsync() {
    return new Promise<AccountBehaviorPermissionModel>((resolve, reject) => {
      return getPermissionList()
        .then((json) => {
          this.SET_PERMISSIONS(json.result.permissions)
          this.SET_BEHAVIORS(json.result.behaviors)
          resolve(json.result)
        })
        .catch((err) => {
          reject(err) // 全局错误提示
        })
    })
  }

  @Mutation
  private SET_PERMISSIONS(accountPermissions: AccountPermissionModel[]) {
    this.permissions = accountPermissions
  }

  @Mutation
  private SET_BEHAVIORS(accountBehaviors: AccountBehaviorModel[]) {
    this.behaviors = accountBehaviors
  }

  @Action({ rawError: true })
  public GenerateRoutes() {
    const behaviorCodes = this.behaviors.map((_) => _.behaviorCode)
    return new Promise<void>((resolve) => {
      const accessedRouters = filterRouter(asyncRoutes, behaviorCodes)
      this.SET_ROUTERS(accessedRouters)
      this.SET_ROUTER_GENERTATED(true)
      // let routes: RouteConfig[] = []
      // routes = asyncRoutes.filter(
      //   (r) => r.meta.code === '0' || behaviorCodes.includes(r.meta.code)
      // )
      // this.SET_ROUTERS(routes)
      resolve()
    })
  }

  @Mutation
  private SET_ROUTERS(routes: RouteConfig[]) {
    this.dynamicRouters = routes
    // 和已经存在的路由表拼接
    this.routers = constantRoutes.concat(routes)
  }

  @Mutation
  private SET_ROUTER_GENERTATED(flag: boolean) {
    this.isRouterGenerated = flag
  }
}
export const PermissionModule = getModule(Permission)
