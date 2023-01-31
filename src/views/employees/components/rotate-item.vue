<template>
  <Dialog title="转正" :show-dialog="showDialog" @close="closeAdjust" @click-ok="commit">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <img
          v-imagerror="require('@/assets/common/bigUserHeader.png')"
          style="border-radius: 50%; width: 100px; height: 100px"
          :src="row.staffPhoto"
        >
        <div class="box">
          <div class="name">{{ row.username }}</div>
          <div>
            <span class="sp">
              手机
              <i>{{ row.mobile }}</i>
            </span>
            <span>
              部门
              <i>{{ row.departmentName }}</i>
            </span>
          </div>
          <div>
            <span>
              入职时间
              <i>{{ row.timeOfEntry }}</i>
            </span>
          </div>
        </div>
      </div>
      <el-form
        ref="depForm"
        label-position="right"
        label-width="100px"
        :model="formData"
        :rules="rules"
      >
        <el-form-item label="转正时间: " prop="dateOfCorrection">
          <el-date-picker
            v-model="formData.dateOfCorrection"
            style="width: 50%"
            placeholder="请选择日期"
          />
        </el-form-item>
        <el-form-item label="转正评价: ">
          <el-input
            v-model="formData.correctionEvaluation"
            type="textarea"
            placeholder="请输入转正评价"
            style="width: 70%"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </Dialog>
</template>

<script>
import { RolePositive } from '@/api/employees.js'
export default {
  name: 'RotateItem',
  props: {
    showDialog: { type: Boolean, default: false }
  },
  data() {
    return {
      row: {},
      formData: {
        correctionEvaluation: '',
        createTime: '',
        dateOfCorrection: '',
        enclosure: '',
        estatus: '',
        userId: ''
      },
      rules: {
        dateOfCorrection: [{ required: true, message: '请输入转正日期', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 关闭弹窗
    closeAdjust() {
      this.formData = {
        correctionEvaluation: '',
        createTime: '',
        dateOfCorrection: '',
        enclosure: '',
        estatus: '',
        userId: ''
      }
      this.$refs.depForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    // 确认提交
    commit() {
      this.$refs.depForm.validate(isOk => {
        if (!isOk) return false
        RolePositive(this.formData).then((res) => {
          this.$message.success('转正成功!')
        }).finally(() => {
          this.$parent.getStaffList() // 刷新数据
          this.closeAdjust()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  border: 0 solid #000;
}
.clearfix {
  padding: 2px 20px;
  position: relative;
}
.box {
  height: 70px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: 10px;
  left: 160px;
  .name {
    color: #606266;
    font-weight: 700;
  }
  .sp {
    margin-right: 20px;
  }
  span {
    color: #999;
  }
  i {
    color: #000;
    font-style: normal;
  }
}
</style>
