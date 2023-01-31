<template>
  <!-- 用了一个行列布局 -->
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown>
            <span> 操作<i class="el-icon-arrow-down" /> </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="addDep">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" @click.native="editDep">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" @click.native="removeDep">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { removeDepartment, getDepartmentsInfo } from '@/api/company'
export default {
  props: {
    treeNode: { type: Object, required: true }, // 部门得信息 | 头部得名称和负责人
    isRoot: { type: Boolean, default: true } // 控制添加和编辑按钮得显示与隐藏
  },
  methods: {
    // 添加
    addDep() {
      this.$emit('addDep', this.treeNode)
    },
    // 删除
    async removeDep() {
      try {
        await this.$confirm('确认删除次部门吗?')
        await removeDepartment(this.treeNode.id)
        this.$emit('updateDeps') // 手动刷新数据
        this.$message.success('删除成功')
      } catch (error) {
        error
      }
    },
    // 编辑
    editDep() {
      getDepartmentsInfo(this.treeNode.id).then((res) => {
        this.$emit('editDep', res)
      })
    }
  }
}
</script>
