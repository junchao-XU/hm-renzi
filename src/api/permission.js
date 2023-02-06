import request from '@/utils/request'

// 获取-权限点列表
export const getPerList = () => request.get('/sys/permission')
// 获取权限点详情
export const getPerDtl = (id) => request.get(`/sys/permission/${id}`)
// 修改权限点详情
export const editPerInfo = (data) => request.put(`/sys/permission/${data.id}`, data)
// 新增权限点
export const addPer = (data) => request.post('/sys/permission', data)
// 删除权限点
export const deletePer = (id) => request.delete(`/sys/permission/${id}`)
