<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs @tab-click="handleClick">
          <el-tab-pane label="登录账户设置">
            <account-item ref="Account" :acc-show="AccShow" @StaffBasic="getStaffBasic" />
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <details-item ref="Details" :del-show="DelShow" @StaffBasic="getStaffBasic" @StaffInfo="getStaffInfo" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <jobs-item ref="Jobs" :jobs-show="JobsShow" @JobsInfo="getJobsInfo" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import EmployeeEnum from '@/constant/employees.js'
const { hireType } = EmployeeEnum
import { getJobsInfo, getRoleSimple, getStaffBasic, getStaffInfo } from '@/api/employees'
import { AccountItem, DetailsItem, JobsItem } from './components'
export default {
  components: { AccountItem, DetailsItem, JobsItem },
  data() {
    return {
      AccShow: true, // 登录设置界面
      DelShow: true, // 个人详情页面
      JobsShow: true, // 岗位信息页面
      userId: this.$route.params.id
    }
  },
  async created() {
    await this.getStaffBasic() // 基本信息
  },
  methods: {
    // 获取员工基本信息
    async getStaffBasic() {
      const res = await getStaffBasic(this.userId)
      const { Account, Details } = this.$refs // 解构ref
      Account.StaffBasic = res // 处理登录账户设置数据
      const formOfEmployment = hireType.find(item => item.id === Number(this.$route.query.emp))?.value || '未知' // 添加聘用形式字段
      Details.userInfo = { ...res, formOfEmployment } // 处理个人详情数据
      this.AccShow = false
    },
    // 获取员工个人信息
    async getStaffInfo() {
      const res = await getStaffInfo(this.userId)
      this.$refs.Details.formData = res
    },
    // 获取员工岗位信息
    async getJobsInfo() {
      const res = await getJobsInfo(this.userId)
      this.$refs.Jobs.formData = res
    },
    // 获取员工简单列表
    async getRoleSimple() {
      const res = await getRoleSimple()
      this.$refs.Jobs.depts = res
    },
    // 切换tab栏 发送不同请求
    async handleClick(tab) {
      const index = tab.index
      const { DelShow, JobsShow } = this
      if (index === '1' && DelShow) {
        await this.getStaffInfo()
        this.DelShow = false
      } else if (index === '2' && JobsShow) {
        await this.getJobsInfo()
        await this.getRoleSimple()
        this.JobsShow = false
      }
    }
  }
}
</script>

<style>

</style>
