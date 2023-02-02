<template>
  <div class="dashboard-container">
    <div v-loading="loading" class="app-container">
      <page-tools :show-before="true">
        <span slot="before"> 当前共有{{ pag.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="deriveStaff">导出</el-button>
          <el-button size="small" type="primary" @click="addStaff">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="rows" border>
          <el-table-column type="index" :index="slotIndex" label="序号" sortable="" />
          <el-table-column prop="username" label="姓名" sortable="" />
          <el-table-column label="头像" sortable="" />
          <el-table-column prop="mobile" label="手机号" sortable="" />
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column prop="formOfEmployment" :formatter="formatEmployment" label="聘用形式" sortable="" />
          <el-table-column prop="departmentName" label="部门" sortable="" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable="">
            <template v-slot="{row}">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small" @click="examine(row)">查看</el-button>
              <el-button type="text" size="small" @click="rotate(row)">转正</el-button>
              <el-button type="text" size="small" @click="transfer(row)">调岗</el-button>
              <el-button type="text" size="small" @click="dimission(row)">离职</el-button>
              <el-button type="text" size="small" @click="Role(row)">角色</el-button>
              <el-button type="text" size="small" @click="deleteStaff(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <Pagination :page-no="pag.page" :page-size="pag.size" :total="pag.total" @getPageNo="getPageNo" />
        </el-row>
      </el-card>
    </div>
    <!-- 添加窗口 -->
    <add-item :show-dialog.sync="AddShow" />

    <!-- 角色窗口 -->
    <role-item :employee-id="employeeId" :show-dialog.sync="RoleShow" />

    <!-- 转正窗口 -->
    <rotate-item ref="RotateItem" :show-dialog.sync="RotateShow" />
  </div>
</template>

<script>
import { AddItem, RoleItem, RotateItem } from './components'
import EmployeeEnum from '@/constant/employees'
const { exportExcelMapPath, hireType } = EmployeeEnum
import { deleteStaff, getRolePositive, getStaffBasic, getStaffList } from '@/api/employees'
import { filterTime } from '@/filters'
export default {
  components: { AddItem, RoleItem, RotateItem },
  data() {
    return {
      RotateShow: false, // 转正显示隐藏
      RoleShow: false, // 角色显示隐藏
      AddShow: false, // 添加显示隐藏
      loading: false,
      employeeId: '', // 当前选中的ID
      rows: [], // 员工数据
      pag: {
        page: 1, // 当前页
        size: 10, // 当前页数据
        total: 0 // 总数据
      }
    }
  },
  created() {
    this.getStaffList()
  },
  methods: {
    // 获取员工列表
    getStaffList() {
      this.loading = true
      getStaffList(this.pag).then(({ rows, total }) => {
        this.rows = rows
        this.pag.total = total
      }).finally(() => {
        this.loading = false
      })
    },
    // 获取当前页
    getPageNo(page) {
      this.pag.page = page
      this.getStaffList()
    },
    // 聘用形式
    formatEmployment(row, column, cellValue, index) {
      return hireType.find(item => item.id === cellValue)?.value || '未知'
    },
    // 自定义序号
    slotIndex(index) {
      const { page, size } = this.pag
      return index + 1 + (page - 1) * size
    },
    /**
     * @操作
     */
    // 添加
    addStaff() {
      this.AddShow = true
    },
    // 删除
    deleteStaff(row) {
      this.$confirm('确定删除吗?').then(() => {
        deleteStaff(row.id).then(() => {
          this.$message.success('删除成功')
        }).finally(() => {
          this.getStaffList()
        })
      })
    },
    // 角色
    Role(row) {
      this.RoleShow = true
      this.employeeId = row.id
    },
    // 离职
    dimission() {},
    // 调岗
    transfer() {},
    // 转正
    async rotate(row) {
      try {
        const formData = await getRolePositive(row.id) // 获取用户转正信息
        const ros = await getStaffBasic(row.id) // 获取用户基本信息
        this.$refs.RotateItem.row = ros
        this.$refs.RotateItem.formData = formData
        this.RotateShow = true
      } catch (error) {
        error
      }
    },
    // 查看
    examine(row) {
      this.$router.push(
        {
          path: `/employees/detail/${row.id}`,
          query: {
            emp: row.formOfEmployment
          }
        }
      )
    },
    // 员工导出
    async deriveStaff() {
      const excel = await import('@/vendor/Export2Excel.js')
      const { rows } = await getStaffList({ page: 1, size: this.pag.total }) // 拿到所有数据
      const headers = Object.keys(exportExcelMapPath) // 拿到表头 | 聘用形式
      // 对数据进行处理
      const dataArr = rows.map(obj => {
        return headers.map(item => {
          const val = obj[exportExcelMapPath[item]] // 拿到所有的值 ==> 字符串形式
          if (item === '聘用形式') {
            return hireType.find(t => t.id === Number(val))?.value || '未知'
          }
          if (item === '入职日期' || item === '转正日期') {
            return filterTime(val, 'YYYY年MM月DD日')
          }
          return val || ''
        })
      })
      excel.export_json_to_excel({
        header: headers, // 表头 必填
        data: dataArr, // 具体数据 必填
        filename: '员工统计表', // 非必填
        autoWidth: true, // 非必填 => 表格宽度自适应
        bookType: 'xlsx' // 非必填
      })
    }
  }
}
</script>

<style>

</style>
