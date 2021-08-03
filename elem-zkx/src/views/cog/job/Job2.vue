<template>
  <div>
    <ElexTable
      :table-columns="tableColumns"
      :table-pager="tablePager"
      :table-actions="tableActions"
      :table-data="jobList"
      :table-query="tableQuery"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <el-row :gutter="10" slot="tools" class="btn-wrap">
        <el-form size="small" :model="tableQuery">
          <el-col :span="8">
            <el-form-item>
              <el-input
                v-model="tableQuery.keyword"
                placeholder="关键字"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="handleSearchClick"
              >
                查询
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </ElexTable>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import ElexTable from '@/components/ElexTable/index.vue'

export default {
  components: {
    ElexTable
  },
  data() {
    return {
      formInline: {
        keyword: ''
      },
      tablePager: {
        page: 1,
        limit: 10,
        skipCount: 0,
        total: 0
      },
      tableQuery: {
        keyword: ''
      },
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
      tableActions: [
        {
          name: 'Edit',
          icon: 'el-icon-edit',
          handler: (row) => {
            this.handleEditClick(row)
          },
          authorized: true,
          disabled: (row) => {
            return false
          }
        },
        {
          name: 'Assign',
          icon: 'el-icon-edit',
          handler: (row) => {
            this.handleAssignClick(row)
          },
          authorized: true,
          disabled: (row) => {
            return false
          }
        }
      ],
      searchModel: {
        keyword: ''
      }
    }
  },
  mounted() {
    const query = Object.assign({}, this.tableQuery, this.tablePager)
    console.log(JSON.stringify(query))
    this.fetchList(query)
  },
  watch: {
    pager: function(newVal) {
      this.tablePager.total = newVal.totalCount
    }
  },
  computed: {
    ...mapState({
      jobList: (state) => state.cog.jobList,
      pager: (state) => state.cog.jobPager
    })
  },
  methods: {
    ...mapActions(['fetchList']),
    // GetJobListAsync: CogModule.GetJobListAsync,

    handleCreateClick() {
      this.$router.push({
        name: 'roleCreate'
      })
    },
    handleEditClick(row) {
      this.$router.push({
        name: 'roleEdit',
        params: {
          id: row.roleId
        }
      })
    },
    handleAssignClick(row) {
      console.log(row)
      this.$router.push({
        name: 'roleAssign',
        params: {
          id: row.roleId
        }
      })
    },
    handleSizeChange(val) {
      this.tablePager.limit = val
      this.tablePager.skipCount =
        (this.tablePager.page - 1) * this.tablePager.maxResultCount
      const query = Object.assign({}, this.tableQuery, this.tablePager)
      this.fetchList(query)
    },
    handleCurrentChange(val) {
      this.tablePager.page = val
      this.tablePager.skipCount =
        (this.tablePager.page - 1) * this.tablePager.maxResultCount
      const query = Object.assign({}, this.tableQuery, this.tablePager)
      this.fetchList(query)
    },
    handleSearchClick() {
      this.tablePager.page = 1
      this.tablePager.skipCount =
        (this.tablePager.page - 1) * this.tablePager.maxResultCount
      const query = Object.assign({}, this.tableQuery, this.tablePager)
      this.fetchList(query)
    }
  }
}
</script>

<style lang="less" scoped></style>
