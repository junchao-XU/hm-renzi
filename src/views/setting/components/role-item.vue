<template>
  <Dialog :title="formData.id ? '编辑' : '添加'" :show-dialog="showDialog" @close="close" @click-ok="commit">
    <el-form ref="ruleForm" :model="formData" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="name" label="角色名称">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item prop="description" label="角色描述">
        <el-input v-model="formData.description" />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import { addRole, editRoleInfo } from '@/api/setting'
export default {
  props: {
    showDialog: { type: Boolean, defaults: false } // 显示隐藏
  },
  data() {
    return {
      formData: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 关闭
    close() {
      this.formData = {
        name: '',
        description: ''
      }
      this.$refs.ruleForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    // 确定提交
    commit() {
      this.$refs.ruleForm.validate(async isOk => {
        if (!isOk) return false
        if (this.formData.id) await editRoleInfo(this.formData) // 编辑
        else await addRole(this.formData) // 添加
        this.$message.success(this.formData.id ? '编辑成功' : '添加成功')
        this.$parent.getRoleList() // 手动刷新数据
        this.close() // 关闭弹窗
      })
    }
  }
}
</script>

<style>

</style>
