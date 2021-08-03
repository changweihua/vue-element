export interface JwtAuthResultModel {
  code: number
  expires_in: number
  accessToken: string
  refreshToken: string
  expiresAt: number
  refreshExpiresAt: number
}

export interface AccountBehaviorPermissionModel {
  behaviors: AccountBehaviorModel[]
  permissions: AccountPermissionModel[]
}

export interface AccountPermissionModel {
  permissionId: string
  permissionName: string
  permissionCode: string
  permissionLabel: string
}

export interface AccountBehaviorModel {
  behaviorId: string
  behaviorName: string
  behaviorCode: string
  behaviorLabel: string
}

export interface AccountProfileModel {
  loginName: string
  userName: string
}
