import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { AccountProfileModel } from '@/models/account.model'
import { getAccountProfile } from '@/apis/account.api'

export interface AccountState {
  accessToken: string
  refreshToken: string
  userName: string
}

export interface AccountInfo {
  accessToken: string
  refreshToken: string
  userName: string
  expiresAt: number
  refreshExpiresAt: number
}

export interface TokenInfo {
  accessToken: string
  refreshToken: string
  expiresAt: number
  refreshExpiresAt: number
}

@Module({
  dynamic: true,
  store,
  name: 'account',
  namespaced: true,
  preserveState: window.localStorage.getItem('vuex') !== null
})
class Account extends VuexModule implements AccountState {
  public accessToken = ''
  public refreshToken = ''
  public userName = ''
  public expiresAt = 0
  public refreshExpiresAt = 0

  @Action({ rawError: true })
  public async LoginAsync(accountInfo: AccountInfo) {
    this.SET_ACCESS_TOKEN(accountInfo.accessToken)
    this.SET_REFRESH_TOKEN(accountInfo.refreshToken)
    this.SET_EXPIRESAT(accountInfo.expiresAt)
    this.SET_REFRESH_EXPIRESAT(accountInfo.refreshExpiresAt)
    return new Promise<void>((resolve) => {
      resolve()
    })
  }

  @Action({ rawError: true })
  public async GetAccountProfileAsync() {
    return new Promise<AccountProfileModel>((resolve, reject) => {
      return getAccountProfile()
        .then((json) => {
          this.SET_USERNAME(json.result.userName)
          resolve(json.result)
        })
        .catch((err) => {
          reject(err) // 全局错误提示
        })
    })
  }

  @Action({ rawError: true })
  public RefreshToken(tokenInfo: TokenInfo) {
    this.SET_ACCESS_TOKEN(tokenInfo.accessToken)
    this.SET_REFRESH_TOKEN(tokenInfo.refreshToken)
    this.SET_EXPIRESAT(tokenInfo.expiresAt)
    this.SET_REFRESH_EXPIRESAT(tokenInfo.refreshExpiresAt)
    return new Promise<void>((resolve) => {
      resolve()
    })
  }

  @Action({ rawError: true })
  public async LogoutAsync() {
    return new Promise<void>((resolve) => {
      this.SET_ACCESS_TOKEN('')
      this.SET_REFRESH_TOKEN('')
      this.SET_EXPIRESAT(0)
      this.SET_REFRESH_EXPIRESAT(0)
      this.SET_USERNAME('')
      resolve()
    })
  }

  @Mutation
  private SET_ACCESS_TOKEN(token: string) {
    this.accessToken = token
  }

  @Mutation
  private SET_REFRESH_TOKEN(token: string) {
    this.refreshToken = token
  }

  @Mutation
  private SET_EXPIRESAT(expires: number) {
    this.expiresAt = expires
  }

  @Mutation
  private SET_REFRESH_EXPIRESAT(expires: number) {
    this.refreshExpiresAt = expires
  }

  @Mutation
  private SET_USERNAME(userName: string) {
    this.userName = userName
  }
}
export const AccountModule = getModule(Account)
