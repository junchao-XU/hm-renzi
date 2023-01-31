import Dialog from './Dialog'
import Pagination from './Pagination'
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'

const components = [Dialog, Pagination, PageTools, UploadExcel]
export default {
  install(Vue) {
    components.forEach((com) => Vue.component(com.name, com))
  }
}
