import request from '@/utils/request'

// 获取-权限点列表
export const getPerList = () => request.get('/sys/permission')
// 修改权限点详情
export const editPerInfo = (data) => request.put(`/sys/permission/${data.id}`, data)
// 给角色分配权限
export const allocationPer = (data) => request.put('/sys/role/assignPrem', data)
