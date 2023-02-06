import request from '@/utils/request'

// 获取企业社保配置信息
export const getSettings = () => request.get('/social_securitys/settings')
// 获取企业用户社保列表
export const getSalarysList = (data) => request.post('/social_securitys/list', data)
// 查询社保历史归档列表
export const getHistoryList = (year) => request.get(`/social_securitys/historys/${year}/list`)
// 根据城市id查询参保城市的参保项目
export const getPaymentItemList = (id) => request.get(`/social_securitys/payment_item/${id}`)
// 根据用户id查询用户的社保数据
export const getContent = (id) => request.get(`/social_securitys/${id}`)
// 保存或更新用户社保数据
export const saveContent = (data) => request.put(`/social_securitys/${data.userId}`, data)
// 查询社保历史归档列表
export const getArchivingList = (data) => request.get(`/social_securitys/historys/${data.year}/list`)
// 查询月份数据报表
export const getArchivingCont = (params) => request.get(`/social_securitys/historys/${params.month}`, { params })
// 社保数据归档
export const getArchivingArchive = (data) => request.post(`/social_securitys/historys/${data.yearMonth}/archive`, data)
// 设置企业社保配置信息
export const newReport = (data) => request.put(`/social_securitys/historys/${data.yearMonth}/newReport`, data)
