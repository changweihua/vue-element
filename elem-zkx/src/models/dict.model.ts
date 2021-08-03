export interface DictTypeModel {
  id: string
  name: string
  code: string
  remark: string
}

export const emptyDictType: DictTypeModel = {
  id: '',
  name: '',
  code: '',
  remark: ''
}

export interface DictTypeListModel {
  id: string
  name: string
  code: string
  remark: string
}

export interface DictDataModel {
  id: string
  name: string
  value: string
  remark: string
  typeId: string
  valueType: number
}

export const emptyDictData: DictDataModel = {
  id: '',
  name: '',
  value: '',
  remark: '',
  typeId: '',
  valueType: 0
}

export interface DictDataListModel {
  id: string
  name: string
  value: string
  typeId: string
  remark: string
  valueType: number
}
