<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card v-loading="loading" class="tree-card">
        <tree-tools class="header" :is-root="false" :tree-node="company" @addDep="addDep" />
        <el-tree :data="departs" default-expand-all :props="defaultProps">
          <template v-slot="{data}">
            <tree-tools :tree-node="data" @editDep="editDep" @updateDeps="getDepartments()" @addDep="addDep" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :origin-depts="originDepts" :tree-node="treeNode" @updateDeps="getDepartments()" />
  </div>
</template>

<script>
import { tranListToTreeData } from '@/utils'
import { getDepartments } from '@/api/company'
import AddDept from './components/add-dept.vue'
import TreeTools from './components/tree-tools.vue'
export default {
  components: { TreeTools, AddDept },
  data() {
    return {
      loading: false, // 加载中
      treeNode: {}, // 当前选中的节点
      departs: [], // 处理后的数据
      originDepts: [], // 未经处理的数据
      company: {}, // 头部得数据结构
      // 建立映射关系
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      showDialog: false // 控制编辑 | 添加窗口得显示与隐藏
    }
  },
  created() {
    // 获取部门列表
    this.getDepartments()
  },
  methods: {
    // 获取部门列表
    async getDepartments() {
      this.loading = true
      await getDepartments().then(({ depts, companyName }) => {
        this.company = { name: companyName, manager: '负责人' }
        this.originDepts = depts
        this.departs = tranListToTreeData(depts, '')
      }).finally(() => {
        this.loading = false
      })
    },
    // 添加子部门
    addDep(treeNode) {
      this.showDialog = true
      this.treeNode = treeNode
    },
    // 编辑子部门
    editDep(node) {
      this.$refs.addDept.formData = { ...node, children: '' }
      this.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px  140px;
  font-size:16px;
}
.header {
  margin-bottom: 8px;
}
.el-tree {
  ::v-deep {
    // 小三角的样式, 去掉默认的小三角的旋转效果
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    // 有子节点 且未展开 +
    .el-icon-caret-right:before {
      background: url('~@/assets/common/add-circle.png') no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 有子节点 且已展开 -
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
      background: url('~@/assets/common/minus-circle.png') no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 没有子节点
    .el-tree-node__expand-icon.is-leaf::before {
      background: url('~@/assets/common/user-filling.png') no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
  }
}
</style>
