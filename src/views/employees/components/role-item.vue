<template>
  <Dialog title="分配角色" :show-dialog="showDialog" @close="close" @click-ok="commit" @open="open">
    <el-checkbox-group v-model="checkList" v-loading="loading">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
  </Dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { assignRole, getStaffBasic } from '@/api/employees'
export default {
  props: {
    showDialog: { type: Boolean, default: false }, // 显示与隐藏
    employeeId: { type: String, required: true } // 当前选中的ID
  },
  data() {
    return {
      loading: false,
      checkList: [], // 当前员工的角色
      list: [] // 所有的角色
    }
  },
  methods: {
    // 打开弹窗时触发
    async open() {
      this.loading = true
      try {
        await this.getRoleList()
        await this.getCheckList()
      } catch (error) {
        error
      } finally {
        this.loading = false
      }
    },
    // 关闭
    close() {
      this.list = []
      this.checkList = []
      this.$emit('update:showDialog', false)
    },
    // 提交
    commit() {
      if (!this.checkList.length) return this.$message.warning('请选择角色')
      assignRole({
        id: this.employeeId,
        roleIds: this.checkList
      }).then(() => {
        this.$message.success('分配权限成功')
      }).finally(() => {
        this.$parent.getStaffList() // 刷新数据
        this.close()
      })
    },
    // 获取角色列表
    async getRoleList() {
      await getRoleList().then(({ rows }) => {
        this.list = rows
        console.log(rows)
      })
    },
    // 获取员工角色id数组
    async getCheckList() {
      await getStaffBasic(this.employeeId).then(({ roleIds }) => {
        this.checkList = roleIds || []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox-group{
  margin-bottom: 20px;
}
</style>
