<template>
  <div>
    <el-table :data="items" border style="width: 100%">
      <!-- <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
    <el-table-column prop="age" label="年龄" width="180"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column> -->
      <el-table-column
        align="center"
        v-for="column in tableColumns"
        :prop="column.prop"
        :key="column.prop"
        :label="column.label"
      >
        <!-- <template slot-scope="scope">
        <span>
          {{ scope.row }}
        </span>
      </template> -->
      </el-table-column>
    </el-table>
    <el-pagination
      :hide-on-single-page="true"
      :total="tablePager.total"
      :current-page="tablePager.current"
      layout="prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
import { getPagedQuartzJobList } from '@/apis/quartzjob.api'

export default {
  inject: ['appPageSize'],
  data() {
    return {
      tableColumns: [
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'userName',
          label: '姓名'
        },
        {
          prop: 'address',
          label: '地址'
        }
      ],
      tablePager: {
        total: 0,
        current: 1,
        pageSize: this.appPageSize
      },
      items: []
    }
  },
  mounted() {
    getPagedQuartzJobList(this.tablePager.current, this.tablePager.pageSize)
      .then((json) => {
        const data = json['data']
        this.items = [...data['items']]
        // this.tableColumns = [...json['columns']]
        this.tablePager = { ...this.tablePager, total: data['totalCount'] }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        // this.$emit('content_spinning', false)
      })
  }
}
</script>
