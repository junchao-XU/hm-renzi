import Dialog from './Dialog'
import Pagination from './Pagination'
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import UploadImg from './UploadImg'
import QrCode from './QrCode'

const components = [Dialog, Pagination, PageTools, UploadExcel, UploadImg, QrCode]
export default {
  install(Vue) {
    components.forEach((com) => Vue.component(com.name, com))
  }
}
