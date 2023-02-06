<template>
  <div class="dashboard-container">
    <div v-loading="loading" class="app-container">
      <PageTools :show-before="true">
        <template v-slot:before>
          本月：社保在缴  公积金在缴  增员  减员  入职  离职
        </template>
        <template v-slot:after>
          <el-button type="danger" size="mini" @click="$router.push('/social_securitys/historical')">历史归档</el-button>
          <el-button type="primary" size="mini" @click="$router.push(`/social_securitys/month?yearMonth=${yearMonth}`)">{{ yearMonth }}报表</el-button>
        </template>
      </PageTools>
      <!-- 筛选组件 -->
      <SocialTool />
      <!-- 表格 -->
      <el-card class="hr-block">
        <el-table :data="list" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
          <el-table-column type="index" :index="sortIndex" width="50" label="序号" />
          <el-table-column prop="username" label="姓名" sortable />
          <el-table-column prop="mobile" label="手机" sortable />
          <el-table-column prop="workNumber" label="工号" sortable />
          <el-table-column prop="departmentName" label="部门" sortable width="180" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable />
          <el-table-column prop="leaveTime" label="离职时间" sortable />
          <el-table-column prop="participatingInTheCity" label="社保城市" width="180" />
          <el-table-column prop="providentFundCity" label="公积金城市" width="180" />
          <el-table-column prop="socialSecurityBase" label="社保基数" />
          <el-table-column prop="providentFundBase" label="公积金基数" />
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-button type="text" size="mini" @click="$router.push(`/social_securitys/detail/${row.id}`)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <Pagination :page-no="page.page" :page-size="page.pageSize" :total="page.total" @getPageNo="getPageNo" />
      </el-card>
    </div>
  </div>
</template>

<script>
import SocialTool from './components/social-tool.vue'
import { getSalarysList, getSettings } from '@/api/social'
export default {
  components: { SocialTool },
  data() {
    return {
      list: [], // 企业用户社保列表
      yearMonth: '', // 时间报表
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      selectParams: {}, // 当前选中的
      loading: false
    }
  },
  created() {
    this.getSettings()
    this.getSalarysList()
  },
  methods: {
    // 获取企业社保配置信息
    async getSettings() {
      this.loading = true
      const { dataMonth } = await getSettings()
      this.yearMonth = dataMonth
      this.loading = false
    },
    // 获取企业用户社保列表
    async getSalarysList() {
      this.loading = true
      const { rows, total } = await getSalarysList({ ...this.page, ...this.selectParams })
      this.list = rows
      this.page.total = total
      this.loading = false
    },
    // 根据名称筛选不同的表格
    changeSelectParams(selectParams) {
      this.selectParams.departmentChecks = selectParams.departmentChecks
      this.selectParams.providentFundChecks = selectParams.providentFundChecks
      this.selectParams.socialSecurityChecks = selectParams.socialSecurityChecks
      this.page.page = 1
      this.getSalarysList()
    },
    // 获取分页当前页
    getPageNo(page) {
      this.page.page = page
      this.getSalarysList()
    },
    // 自定义排序
    sortIndex(index) {
      const { page, pageSize } = this.page
      return index + 1 + (page - 1) * pageSize
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cont-bod-box {
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  margin-top: 15px;
  margin-bottom: 15px;
  border: 1px solid #ebeef5;
}
</style>
