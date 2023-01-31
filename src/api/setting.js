import request from '@/utils/request'

// 获取-角色列表
export const getRoleList = (params) => request.get(`/sys/role`, { params })
// 新增-角色
export const addRole = (data) => request.post('/sys/role', data)
// 修改-角色详情
export const editRoleInfo = (data) => request.put(`/sys/role/${data.id}`, data)
// 获取-角色详情
export const getRoleInfo = (id) => request.get(`/sys/role/${id}`)
// 删除-角色
export const deleteRole = (id) => request.delete(`/sys/role/${id}`)
// 分配权限-角色
export const allocationRole = (data) => request.put('/sys/role/assignPrem', data)
