<template>
  <Dialog title="新增员工" :show-dialog="showDialog" @close="close" @click-ok="commit">
    <el-form ref="depForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="username" label="姓名">
        <el-input v-model="formData.username" style="width: 80%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item prop="timeOfEntry" label="入职时间">
        <el-date-picker v-model="formData.timeOfEntry" type="date" placeholder="请选择日期" style="width: 80%;" />
      </el-form-item>
      <el-form-item prop="formOfEmployment" label="聘用形式">
        <el-select v-model="formData.formOfEmployment" placeholder="请选择" style="width: 80%;">
          <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="workNumber" label="工号">
        <el-input v-model="formData.workNumber" style="width: 80%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item prop="mobile" label="手机号">
        <el-input v-model="formData.mobile" style="width: 80%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="departmentName" label="部门">
        <el-select ref="deptSelect" v-model="formData.departmentName" placeholder="请选择部门" style="width: 80%;" @focus="getDepartments">
          <el-option style="padding: 0" value="" class="treeOption">
            <el-tree
              default-expand-all
              :data="depts"
              :props="defaultProps"
              @node-click="nodeClick"
            />
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="correctionTime" label="转正时间">
        <el-date-picker v-model="formData.correctionTime" type="date" placeholder="请选择日期" style="width: 80%;" />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import EmployeeEnum from '@/constant/employees'
import { addStaff } from '@/api/employees'
import { getDepartments } from '@/api/company'
import { tranListToTreeData } from '@/utils'
export default {
  props: {
    showDialog: { type: Boolean, default: false } // 显示隐藏
  },
  data() {
    return {
      EmployeeEnum,
      rules: {
        username: [
          { required: true, message: '请输入员工名字', trigger: 'blur' },
          { min: 1, max: 4, message: '长度为1-4个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确格式', trigger: 'blur' }
        ],
        formOfEmployment: [{ required: true, message: '请输入聘用形式', trigger: 'blur' }],
        workNumber: [{ required: true, message: '请输入员工工号', trigger: 'blur' }],
        departmentName: [{ required: true, message: '请输入部门名字', trigger: 'blur' }],
        timeOfEntry: [{ required: true, message: '请输入入职日期', trigger: 'blur' }],
        correctionTime: [{ required: true, message: '请输入转正日期', trigger: 'blur' }]
      },
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      depts: [], // 部门列表
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  methods: {
    // 关闭
    close() {
      this.forData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.depForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    // 提交
    commit() {
      this.$refs.depForm.validate(async isOk => {
        if (!isOk) return false
        addStaff(this.formData).then(() => {
          this.$message.success('添加成功')
        }).finally(() => {
          this.$parent.getStaffList() // 刷新数据
          this.close()
        })
      })
    },
    // 获取员工部门
    getDepartments() {
      getDepartments().then(({ depts }) => {
        this.depts = tranListToTreeData(depts, '')
      })
    },
    // 选中节点
    nodeClick(data) {
      if (data.children) return this.$message.error('不能加入此部门')
      this.formData.departmentName = data.name // 将数据更换成选中的
      this.$refs.deptSelect.blur() // 失去焦点
    }
  }
}
</script>

<style lang="scss" scoped>
.treeOption {
  overflow-y: auto;
  height: 200px;
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
