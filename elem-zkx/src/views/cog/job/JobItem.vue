<template>
  <div>
    <a-form-model
      ref="form"
      :layout="formLayout.layoutType"
      :model="formModel"
      :rules="formRules"
      :label-col="formLayout.labelCol"
      :wrapper-col="formLayout.wrapperCol"
    >
      <a-row :gutter="35">
        <a-col :span="formLayout.itemSpan">
          <a-form-model-item
            ref="jobIdentity"
            label="任务标识"
            prop="jobIdentity"
          >
            <a-input v-model="formModel.jobIdentity" />
          </a-form-model-item>
        </a-col>
        <a-col :span="formLayout.itemSpan">
          <a-form-model-item ref="jobName" label="任务名称" prop="jobName">
            <a-input v-model="formModel.jobName" />
          </a-form-model-item>
        </a-col>
        <a-col :span="formLayout.itemSpan">
          <a-form-model-item ref="jobLabel" label="显示名称" prop="jobLabel">
            <a-input v-model="formModel.jobLabel" />
          </a-form-model-item>
        </a-col>
        <a-col :span="formLayout.itemSpan">
          <a-form-model-item ref="jobGroup" label="所属组" prop="jobGroup">
            <a-input v-model="formModel.jobGroup" />
          </a-form-model-item>
        </a-col>
        <a-col :span="formLayout.itemSpan">
          <a-form-model-item ref="jobClass" label="执行类" prop="jobClass">
            <a-select
              v-model="formModel.jobClass"
              :options="jobClasses"
              :showSearch="true"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="formLayout.itemSpan">
          <a-form-model-item
            ref="jobDescription"
            label="描述"
            prop="jobDescription"
          >
            <a-input v-model="formModel.jobDescription" />
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item
            class="btn-wrap btn-wrap-right"
            :wrapper-col="{ span: 24, offset: 0 }"
          >
            <a-button @click="onBack">
              {{ $t('buttons.cancel') }}
            </a-button>
            <a-button @click="onReset">
              {{ $t('buttons.reset') }}
            </a-button>
            <a-button type="primary" @click="onSubmit">
              {{ $t('buttons.save') }}
            </a-button>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import DialogFormMixins from '@/mixinus/dialog-form-mixins'
import { emprtyQuartzJob, QuartzJobModel } from '@/models/quartzjob.model'
import { getQuartzJobClass } from '@/apis/quartzjob.api'
import { AntSelectOptionModel } from '@/models/ant.model'

@Component
export default class JobItem extends Mixins(DialogFormMixins) {
  @Prop({
    default: () => emprtyQuartzJob
  })
  private dialogModel!: QuartzJobModel

  formModel: QuartzJobModel = this.dialogModel
  formRules = {
    jobIdentity: [
      {
        required: true,
        whitespace: true,
        message: '请输入任务标识',
        trigger: ['blur', 'change']
      },
      { max: 50, message: '分类名称最多30位', trigger: ['blur', 'change'] }
    ],
    jobName: [
      {
        required: true,
        message: '请输入任务名称',
        trigger: ['blur', 'change']
      }
    ],
    jobLabel: [
      {
        required: true,
        message: '请输入任务显示名称',
        trigger: ['blur', 'change']
      }
    ],
    jobGroup: [
      {
        required: true,
        message: '请输入任务组名',
        trigger: ['blur', 'change']
      }
    ],
    jobClass: [
      {
        required: true,
        message: '请选择任务执行类',
        trigger: ['blur', 'change']
      }
    ],
    jobDescription: [
      {
        max: 255,
        message: '备注最多255位',
        trigger: ['blur', 'change']
      }
    ]
  }

  private jobClasses: AntSelectOptionModel[] = []
  private loadQuartzJobClass() {
    getQuartzJobClass(null).then((json) => {
      this.jobClasses = [...json.items].map((_) => {
        return {
          label: _.name,
          value: _.name
        }
      })
    })
  }

  mounted() {
    this.loadQuartzJobClass()
  }
}
</script>
