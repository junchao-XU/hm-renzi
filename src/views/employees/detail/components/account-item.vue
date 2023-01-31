<template>
  <div v-loading="AccShow">
    <!-- 放置表单 -->
    <el-form ref="FormRef" :rules="rules" :model="StaffBasic" label-width="120px" style="margin-left: 120px; margin-top:30px">
      <el-form-item prop="username" label="姓名:">
        <el-input v-model="StaffBasic.username" style="width:300px" />
      </el-form-item>
      <el-form-item prop="password" label="密码:">
        <el-input v-model="StaffBasic.password" style="width:300px" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update">更新</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { deitRoleInfo } from '@/api/employees'
export default {
  props: { AccShow: { type: Boolean, default: false }},
  data() {
    return {
      StaffBasic: {}, // 员工基本信息
      rules: {
        username: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
          { min: 6, max: 16, message: '长度为6-16位字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 更新提交
    update() {
      this.$refs.FormRef.validate(isOk => {
        if (!isOk) return false
        deitRoleInfo(this.StaffBasic).then(() => {
          this.$message.success('更新成功')
        }).finally(() => {
          this.$store.dispatch('user/getUserInfo') // 手动更新数据
        })
      })
    }
  }
}
</script>

<style>

</style>
