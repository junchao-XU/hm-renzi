<template>
  <div class="dashboard-container">
    <div v-loading="loading" class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click.native="addPre('0')"><i class="el-icon-edit" /> 添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table highlight-current-row :data="PerList" row-key="id" @expand-change="handleExpandChange">
        <el-table-column align="" label="菜单名称" prop="name">
          <template v-slot="{row}">
            <i :class="{'el-icon-document':!row.children}" />  {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column align="" label="权限标识" prop="code" />
        <el-table-column align="" label="描述" prop="description" />
        <el-table-column align="" label="操作">
          <template v-slot="{row}">
            <el-button v-if="row.type === 1" type="text" @click="addPre(row.id)">添加权限点</el-button>
            <el-button type="text" @click="editPre(row.id)">编辑</el-button>
            <el-button type="text" @click="deltePre(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加弹窗 -->
    <AddItem ref="AddItem" :show-dialog.sync="AddShow" />
  </div>
</template>

<script>
import AddItem from './components/add-item.vue'
import { deletePer, getPerDtl, getPerList } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
export default {
  components: { AddItem },
  data() {
    return {
      loading: false,
      PerList: [], // 权限列表
      // IdShow: '', // 当前选中的id
      // classShow: false, // 控制icon显示
      AddShow: false, // 添加弹窗
      NowPid: '' // 当前pid
    }
  },
  created() {
    this.getPerList()
  },
  methods: {
    // 获取权限列表
    async getPerList() {
      this.loading = true
      const res = await getPerList()
      this.PerList = Object.freeze(tranListToTreeData(res, '0'))
      this.loading = false
    },
    // 控制icon
    handleExpandChange(tab) {
      this.IdShow = tab.id
      this.classShow = !this.classShow
    },
    // 添加权限
    addPre(pid) {
      if (pid === '0') {
        this.$refs.AddItem.formData.type = 1
      } else {
        this.$refs.AddItem.formData.type = 2
      }
      this.$refs.AddItem.formData.pid = pid
      this.AddShow = true
    },
    // 编辑权限
    editPre(id) {
      this.loading = true
      getPerDtl(id).then(res => {
        this.$refs.AddItem.formData = res
        this.AddShow = true
      }).finally(() => {
        this.loading = false
      })
    },
    // 删除
    deltePre(id) {
      this.$confirm('确认删除吗?').then(() => {
        deletePer(id).then(() => {
          this.$message.success('删除成功')
          this.getPerList()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table{
  .el-icon-document{
     font-size: 16px;
     padding: 3px;
  }
::v-deep{
   .el-table__expand-icon{
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
     .el-table__expand-icon .el-icon-arrow-right:before{
        content: "\e78a";
        font-size: 16px;
    }
    .el-table__expand-icon--expanded .el-icon-arrow-right:before{
        content: "\e784";
        font-size: 16px;
    }
}
}
</style>
