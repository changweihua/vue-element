import { Component, Inject, Vue } from 'vue-property-decorator'
import dict from '@/assets/dict.json'
import extend from '@/utils/extend'
import { AntdvTableColumn } from '@/models/api.result'
import { AntTablePaginationModel } from '@/models/ant.model'

@Component
export default class TableMixins extends Vue {
  protected dict = dict
  protected extend = extend

  @Inject({ from: 'appPageSize', default: 0 })
  protected appPageSize!: number

  protected searchFormLayout = {
    layoutType: 'inline',
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
    inputCol: 5,
    buttonCol: 8,
    gutter: 20
  }

  protected searchFormModel = {}

  protected searchFormRules = {}

  protected tableColumns: AntdvTableColumn[] = []
  protected tablePager = {
    total: 0,
    current: 1,
    pageSize: this.appPageSize
  }
  protected tablePagination = {
    total: 0,
    pageSize: 10, //每页中显示10条数据
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'], //每页中显示的数据
    showTotal: (total: number) => `共有 ${total} 条数据` //分页中显示总的数据
  }

  protected handlePagerChange(pagination: AntTablePaginationModel) {
    this.tablePager = pagination
    this.loadData()
  }

  protected loadData() {
    this.$emit('content_spinning', true)
    this.$emit('content_spinning', false)
  }

  public name = 'Zhangsan'
  public say(msg: string) {
    console.log(msg)
  }
}
