<template>
  <Dialog :title="`${showText}权限点`" :show-dialog="showDialog" @close="close" @click-ok="commit">
    <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name" style="width:90%" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" style="width:90%" />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input v-model="formData.description" style="width:90%" />
      </el-form-item>
      <el-form-item label="开启">
        <el-switch
          v-model="formData.enVisible"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import { addPer, editPerInfo } from '@/api/permission'
export default {
  props: {
    showDialog: { type: Boolean, default: false } // 显示隐藏
  },
  data() {
    return {
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: 1, // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  methods: {
    // 关闭
    close() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.perForm.resetFields()
      this.$emit('update:showDialog', false)
    },
    // 提交
    commit() {
      this.$refs.perForm.validate(async isOk => {
        if (!isOk) return false
        try {
          if (this.formData.id) await editPerInfo(this.formData)
          else await addPer(this.formData)
          this.$message.success(this.formData.id ? '编辑成功' : '添加成功')
        } catch (error) {
          error
        } finally {
          this.$parent.getPerList()
          this.close()
        }
      })
    }
  }
}
</script>

<style>

</style>
