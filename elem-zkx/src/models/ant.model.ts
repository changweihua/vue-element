export interface AntCheckboxGroupModel {
  value: string
  label: string
}

export interface AntSelectOptionModel {
  value: string
  label: string
}

export interface AntdvTreeNodeScopedSlot {
  title: string
}

export interface AntTreeModel {
  title: string
  key: string
  children: AntTreeModel[]
  scopedSlots?: AntdvTreeNodeScopedSlot
}

export interface AntTreeCheckedModel {
  checked: string[]
  halfChecked: string[]
}

export interface AntMenuModel {
  name: string
  meta: AntMenuMetaModel
  path: string
  children?: AntMenuModel[]
}

export interface AntMenuMetaModel {
  title: string
  icon: string
  svg: boolean
  leaf: boolean
}

export interface AntTablePaginationModel {
  total: number
  current: number
  pageSize: number
  showTotal: (total: number) => string
}

export interface KeyValuePair<T1, T2> {
  key: T1
  value: T2[]
}

export interface AntTableOperationModel<T> {
  text: string
  record: T
  index: number
}

export type AnyFunction = (token: string) => void

export type RouterNextFunction = (params?: any) => void
