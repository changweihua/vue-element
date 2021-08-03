export interface PermissionListModel {
  id: string
  hierarchalCode: string
  permissionCode: string
  permissionLabel: string
  permissionName: string
  createdTime: string
  children?: PermissionListModel[]
  requestMethod: number
}
