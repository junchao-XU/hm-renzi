<template>
  <Dialog width="20%" title="二维码" :show-dialog="showDialog" :btn-show="false" @open="showQrCode" @close="close">
    <el-row type="flex" justify="center">
      <canvas ref="myCanvas" />
    </el-row>
  </Dialog>
</template>

<script>
import QrCode from 'qrcode'
export default {
  name: 'QrCode',
  props: {
    showDialog: { type: Boolean, default: false }
  },
  data() {
    return {
      url: ''
    }
  },
  methods: {
    close() {
      this.$emit('update:showDialog', false)
    },
    showQrCode() {
      this.$nextTick(() => {
        QrCode.toCanvas(this.$refs.myCanvas, this.url) // 将地址转化成二维码
      })
    }
  }
}
</script>

<style>

</style>
