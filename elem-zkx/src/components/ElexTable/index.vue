<template>
  <div style="padding: 10px;">
    <slot name="tools" />
    <!--Table-->
    <el-table
      ref="table"
      size="small"
      v-loading="tableLoading"
      :data="tableData"
      :key="tableKey"
      border
      stripe
      height="100px"
      v-tableHeight="{ bottomOffset: 55 }"
      highlight-current-row
      @selection-change="tableSelectionChange"
    >
      <el-table-column
        v-if="showCheck"
        align="center"
        type="selection"
        width="55"
      />
      <el-table-column
        v-for="thead in tableColumns"
        :key="thead.prop"
        :prop="thead.prop"
        :show-overflow-tooltip="true"
        :label="L(thead.label)"
        :width="thead.width"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="thead.isDate">
            {{ scope.row[thead.prop] | dateformat('YYYY-MM-DD') }}
          </span>
          <el-tag v-else-if="thead.isTag" type="primary" disable-transitions>
            {{
              thead.mappings
                ? (
                    thead.mappings.find((map) => {
                      return map['value'] === scope.row[thead.prop]
                    }) || { label: scope.row[thead.prop] }
                  ).label
                : scope.row[thead.prop]
            }}
          </el-tag>
          <el-button
            v-else-if="thead.isButton"
            type="text"
            @click="handleCellClick(thead, scope.row)"
          >
            {{ scope.row[thead.prop] }}
          </el-button>
          <span v-else>
            {{
              thead.mappings
                ? (
                    thead.mappings.find((map) => {
                      return map['value'] === scope.row[thead.prop]
                    }) || { label: scope.row[thead.prop] }
                  ).label
                : scope.row[thead.prop]
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableActions.length > 0"
        :label="L('Action')"
        :min-width="tableActions.length * 100"
        fixed="right"
        align="center"
      >
        <!-- <template slot-scope="scope"> -->
        <template slot-scope="scope">
          <el-button
            v-for="action in tableActions.filter((ac) => ac.authorized)"
            :key="action.name"
            :disabled="action.disabled && action.disabled(scope.row)"
            :icon="action.icon"
            :type="action.type || 'primary'"
            size="mini"
            @click="action.handler(scope.row)"
          >
            {{ L(action.name) }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--Pagination-->
    <div v-if="showPager && tableData.length > 0" class="pagination-container">
      <el-pagination
        :current-page="tablePager.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="tablePager.limit"
        :total="tablePager.total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
// import {
//   biddingConst
// } from '@/const/biddingConstants'

export default {
  name: 'ElexTable',
  props: {
    tableColumns: {
      type: Array,
      default: () => [],
      required: true
    },
    tableData: {
      type: Array,
      default: () => [],
      required: true
    },
    tableKey: {
      type: String,
      default: 'id'
    },
    tableQuery: {
      type: Object
    },
    tablePager: {
      type: Object,
      default: () => {
        return {
          page: 1,
          limit: 20,
          skipCount: 0,
          total: 0
        }
      }
    },
    tableActions: {
      type: Array,
      default: () => []
    },
    showPager: {
      type: Boolean,
      default: true
    },
    showCheck: {
      type: Boolean,
      default: false
    },
    tableLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      total: 100
    }
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.$emit('size-change', val)
    },
    handleCurrentChange(val) {
      this.$emit('current-change', val)
      this.$refs.table.bodyWrapper.scrollTop = 0
    },
    tableSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    handleCellClick(thead, row) {
      if (thead.eventName) {
        this.$emit(thead.eventName, row)
      }
    },
    L(val) {
      return val
    }
  }
}
</script>

<style lang="less" scoped>
.pagination-container {
  margin: 10px 0;
}
</style>
