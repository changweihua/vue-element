<template>
  <div class="container-wrapper">
    <el-row>
      <el-col :span="24">
        <el-table
          height="100px"
          :header-row-class-name="'cks-table-header'"
          v-tableHeight="{ bottomOffset: 55 }"
          :data="items"
          border
          stripe
          size="small"
          style="width: 100%"
        >
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
      </el-col>
      <el-col :span="24">
        <el-pagination
          :hide-on-single-page="true"
          :total="tablePager.total"
          :current-page="tablePager.current"
          layout="prev, pager, next"
        ></el-pagination>
      </el-col>
    </el-row>
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
        pageSize: 20 //this.appPageSize
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

        try {
          const ev = document.createEvent('Event')
          ev.initEvent('resize', true, true)
          window.dispatchEvent(ev)
        } catch (e) {
          //
        }
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

<style scoped lang="less">
// .container-wrapper {
//   height: calc(100% - 160px);
// }
</style>
