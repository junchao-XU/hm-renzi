<template>
  <Dialog title="分配权限" :show-dialog="showDialog" @click-ok="commit" @close="close" @open="getPerList()">
    <el-tree
      ref="permTree"
      v-loading="loading"
      :data="PerList"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      highlight-current
      default-expand-all
      :check-strictly="true"
      :default-checked-keys="permIds"
    />
  </Dialog>
</template>

<script>
import { getPerList } from '@/api/permission'
import { tranListToTreeData } from '@/utils'
import { allocationRole } from '@/api/setting'
export default {
  props: {
    roleId: { type: String, require: true }, // 当前选中的ID
    permIds: { type: Array, default: () => [] }, // 权限点数组
    showDialog: { type: Boolean, default: false } // 显示隐藏
  },
  data() {
    return {
      loading: false,
      PerList: [], // 权限点数组
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    // 关闭
    close() {
      this.$emit('update:showDialog', false)
    },
    // 获取权限列表
    getPerList() {
      this.loading = true
      getPerList().then(res => {
        this.PerList = tranListToTreeData(res, '0')
      }).finally(() => {
        this.loading = false
      })
    },
    // 提交
    commit() {
      allocationRole({
        id: this.roleId,
        permIds: this.$refs.permTree.getCheckedKeys() // 树形组件里的根据 key 获取当前选中的id
      }).then(() => {
        this.$message.success('分配权限成功')
      }).finally(() => {
        this.$parent.getRoleList()
        this.close()
      })
    }
  }
}
</script>

<style>

</style>
