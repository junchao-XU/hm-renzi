<template>
  <div>
    <el-upload
      :class="{'custom-upload' : fileComputed}"
      list-type="picture-card"
      action="#"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :limit="limitNum"
      :http-request="httpRequest"
      :percentage="percent"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 进度条 -->
    <el-progress v-if="showPercent" style="width: 180px" :percentage="percent" />
    <el-dialog title="图片预览" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDgooZ3HFxPemvxmOr7AnAHByc3DAyd2DP', // 识别ID
  SecretKey: '6xgEdnhNpHWXO3VoNp33pS3YNAsNceS1' // 密钥
})
export default {
  name: 'UploadImg',
  props: {
    limitNum: { type: Number, default: 1 }
  },
  data() {
    return {
      fileList: [],
      dialogImageUrl: '', // 图片地址
      dialogVisible: false,
      currentFileUid: '', // 当前上传的uid
      showPercent: false,
      percent: 0
    }
  },
  computed: {
    fileComputed() { // 添加图片是否显示
      return this.fileList.length >= this.limitNum
    }
  },
  methods: {
    // 放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 删除
    handleRemove(file, fileList) {
      this.fileList = [...fileList]
      this.showPercent = false
      this.$emit('removeImg', fileList)
    },
    // 上传
    httpRequest({ file }) {
      if (!file) return
      cos.putObject({
        Bucket: 'xujunchao-gege-1314635453',
        Region: 'ap-nanjing',
        Key: parseInt(Math.random() * 999999) + file.name,
        Body: file,
        onProgress: (params) => {
          this.percent = params.percent * 100
        }
      }, (err, data) => {
        if (!err && data.statusCode === 200) {
          this.$emit('onSuccess', 'http://' + data.Location)
        }
      })
    },
    // 改变
    handleChange(file, fileList) {
      this.fileList = [...fileList]
    },
    // 上传前
    beforeUpload(file) {
      // 格式
      const type = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp']
      if (!type.includes(file.type)) {
        this.$message.warning('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      // 大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.warning('图片大小不能超过5M')
        return false
      }
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
// .disabled{
//     ::v-deep {
//     .el-upload--picture-card{
//       display: none;
//       }
//     }
// }
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
