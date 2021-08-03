export interface Pager<T> {
  items: T[]
  totalCount: number
  totalPages: number
}

export interface TableColumn {
  prop: string
  label: string
}

export interface TableAxisModel {
  prop: string
  label: string
}

export interface AntdvTableColumnScopedSlot {
  customRender: string
}

export interface AntdvTableColumn {
  title: string
  key: string
  dataIndex: string
  prop?: string
  label?: string
  isRowKey?: boolean
  align?: string
  ellipsis?: boolean
  scopedSlots?: AntdvTableColumnScopedSlot
  customRender?: any
}

export interface ApiSummaryPagerResult<TSummarty, T> {
  totalCount: number
  totalPages: number
  code: number
  items: T[]
  columns: AntdvTableColumn[]
  pager: Pager<T>
  pageSummary: TSummarty
}

export interface ApiPagerResult<T> {
  totalCount: number
  totalPages: number
  code: number
  items: T[]
  columns: AntdvTableColumn[]
  pager: Pager<T>
}

export interface ApiObjectResult<T> {
  code: number
  result: T
}

export interface ApiListResult<T> {
  code: number
  items: T[]
}

export interface ApiColumnListResult<T> {
  code: number
  columns: AntdvTableColumn[]
  items: T[]
}

export interface ApiResult {
  code: number
  result: object
}

export interface ApiGenericResult<T> {
  code: number
  result: T
}

export interface ApiTableResult<T> {
  code: number
  items: T[]
  xAxis: TableAxisModel[]
  subXAxis: TableAxisModel[]
  yAxis: TableAxisModel[]
  subYAxis: TableAxisModel[]
}
