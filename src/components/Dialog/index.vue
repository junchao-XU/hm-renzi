<template>
  <el-dialog
    :title="title"
    :visible="showDialog"
    :width="width"
    @close="handleCloseDialog"
    @open="$emit('open')"
  >
    <slot />

    <el-row v-if="btnShow" type="flex" justify="center" align="middle">
      <el-button size="small" @click="handleCloseDialog()">取 消</el-button>
      <el-button size="small" type="primary" @click="$emit('click-ok')">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    title: { type: String, default: '提示框' }, // 弹框信息
    showDialog: { type: Boolean, defaults: false }, // 控制显示与隐藏
    btnShow: { type: Boolean, default: true }, // 控制按钮显示隐藏
    width: { type: String, default: '50%' } // 宽
  },
  methods: {
    // 关闭弹框
    handleCloseDialog() {
      this.$emit('close')
    }
  }
}
</script>
