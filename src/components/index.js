import Dialog from './Dialog'
import Pagination from './Pagination'
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import UploadImg from './UploadImg'

const components = [Dialog, Pagination, PageTools, UploadExcel, UploadImg]
export default {
  install(Vue) {
    components.forEach((com) => Vue.component(com.name, com))
  }
}
