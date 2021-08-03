import { Component, Vue } from 'vue-property-decorator'
import dict from '@/assets/dict.json'

@Component
export default class DialogFormMixins extends Vue {
  protected dict = dict
  protected formSpinning = false

  protected formLayout = {
    layoutType: 'horizontal',
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
    itemSpan: 12
  }

  protected formModel = {}

  protected formRules = {}

  protected onBack() {
    this.$modal.confirm({
      title: '操作提示',
      content: '确认放弃保存!',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk: () => {
        this.$emit('dialog-cancel')
      }
    })
  }

  protected onSubmit() {
    // const form = this.$refs.form as FormModel
    // if (form) {
    //   form.validate((valid) => {
    //     if (valid) {
    //       this.$modal.confirm({
    //         title: '操作提示',
    //         content: '确认提交修改!',
    //         okText: '是',
    //         okType: 'danger',
    //         cancelText: '否',
    //         onOk: () => {
    //           this.$emit('dialog-submit', this.formModel)
    //         }
    //       })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // }
  }

  protected onReset() {
    // const form = this.$refs.form as FormModel
    // console.log(form)
    // if (form) {
    //   this.$modal.confirm({
    //     title: '操作提示',
    //     content: '确认重置表单信息!',
    //     okText: '是',
    //     okType: 'danger',
    //     cancelText: '否',
    //     onOk: () => {
    //       form.resetFields()
    //     }
    //   })
    // }
  }
}
