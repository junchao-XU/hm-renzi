<template>
  <div class="dashboard-container">
    <div v-loading="loading" class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="addRole"
              >
                新增角色
              </el-button>
            </el-row>
            <!-- 表格 -->
            <el-table :data="rows" border="" style="width: 100%">
              <el-table-column label="序号" width="120">
                <template slot-scope="scope">
                  {{ (pag.page - 1) * pag.pagesize + (scope.$index + 1) }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="名称" width="240" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <template v-slot="{row}">
                  <el-button size="small" type="success" @click="allocation(row)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <Pagination :page-no="pag.page" :page-size="pag.pagesize" :total="pag.total" @getPageNo="getPageNo" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <company-item />
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 添加 | 编辑弹窗 -->
      <role-item ref="RoleRef" :show-dialog.sync="showDialog" />
      <!-- 添加 | 编辑弹窗 -->

      <!-- 权限管理 -->
      <authority-item :role-id="roleId" :perm-ids.sync="permIds" :show-dialog.sync="showAuthority" />
    </div>
  </div>
</template>

<script>
import { CompanyItem, RoleItem, AuthorityItem } from './components'
import { deleteRole, getRoleInfo, getRoleList } from '@/api/setting'
export default {
  components: { CompanyItem, RoleItem, AuthorityItem },
  data() {
    return {
      roleId: '', // 当前选中的ID
      permIds: [], // 权限点数组
      loading: false,
      showAuthority: false, // 权限
      showDialog: false, // 新增 | 编辑
      rows: [],
      pag: {
        page: 1, // 当前页
        pagesize: 10, // 每页数量
        total: 0 // 总条数
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取-角色列表
    getRoleList() {
      this.loading = true
      getRoleList(this.pag).then(({ rows, total }) => {
        this.rows = rows
        this.pag.total = total
      }).finally(() => {
        this.loading = false
      })
    },
    // 新增
    addRole() {
      this.showDialog = true
    },
    // 编辑
    editRole(row) {
      getRoleInfo(row.id).then(res => {
        this.$refs.RoleRef.formData = res
        this.showDialog = true
      })
    },
    // 删除
    deleteRole(id) {
      this.$confirm('确认删除此角色吗?').then(() => {
        deleteRole(id).then(() => {
          this.$message.success('删除成功')
          this.getRoleList()
        })
      })
    },
    // 分配
    allocation(row) {
      this.roleId = row.id
      getRoleInfo(row.id).then(({ permIds }) => {
        this.permIds = permIds
        this.showAuthority = true
      })
    },
    // 根据当前页发请求
    getPageNo(page) {
      this.pag.page = page
      this.getRoleList(this.pag)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table th,
::v-deep .el-table td {
  text-align: center !important;
}
.block {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
