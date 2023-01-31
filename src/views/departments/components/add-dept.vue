<template>
  <Dialog :title="formData.id ? '编辑部门':'添加部门'" :show-dialog="showDialog" @close="close" @click-ok="commit" @open="getDepartmentPerson">
    <el-form ref="depForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择">
          <el-option v-for="item in employeesList" :key="item.id" :value="item.username" :label="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import { addDepartment, editDepartment, getDepartmentPerson } from '@/api/company'
export default {
  props: {
    showDialog: { type: Boolean, default: false }, // 控制编辑 | 添加窗口得显示与隐藏
    originDepts: { type: Array }, // 用于比对用户添加得部门是否重复
    treeNode: { type: Object, required: true } // 当前选中的节点
  },
  data() {
    const checkNameRepeat = (rule, value, callback) => {
      let flag = false
      if (this.formData.id) {
        flag = this.originDepts
          .filter((item) => item.pid === this.formData.pid && item.id !== this.formData.id)
          .some((item) => item.name === value)
      } else {
        flag = this.treeNode.children?.some((item) => item.name === value)
      }
      flag ? callback(new Error('部门名称重复')) : callback()
    }
    const checkCodeRepeat = (rule, value, callback) => {
      const flag = this.originDepts.some(
        (item) => item.code === value && item.id !== this.formData.id
      )
      flag ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      // 数据结构
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 校验规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: 'blur' }
        ]
      },
      employeesList: [] // 部门负责人列表
    }
  },
  methods: {
    // 关闭弹窗
    close() {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$refs.depForm.resetFields() // 重置表单校验规则
      this.$emit('update:showDialog', false)
    },
    // 确定提交
    commit() {
      this.$refs.depForm.validate(async isOk => {
        if (!isOk) return false
        if (this.formData.id) await editDepartment(this.formData) // 编辑
        else await addDepartment({ ...this.formData, pid: this.treeNode.id || '' }) // 添加
        this.$emit('updateDeps') // 手动刷新数据
        this.$message.success(this.formData.id ? '编辑成功' : '添加成功')
        this.close()
      })
    },
    // 获取部门负责人
    getDepartmentPerson() {
      getDepartmentPerson().then((res) => {
        this.employeesList = res
      })
    }
  }
}
</script>

<style>

</style>
