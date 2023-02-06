import request from '@/utils/request'

// 获取-员工-个人信息
export const getStaffInfo = (id) => request.get(`/employees/${id}/personalInfo`)
// 获取-员工-基本信息
export const getStaffBasic = (id) => request.get(`/sys/user/${id}`)
// 获取-员工列表
export const getStaffList = (params) => request.get('/sys/user', { params })
// 新增员工
export const addStaff = (data) => request.post('/sys/user', data)
// 删除员工
export const deleteStaff = (id) => request.delete(`/sys/user/${id}`)
// 分配-员工-角色
export const assignRole = (data) => request.put('/sys/user/assignRoles', data)
// 员工转正
export const RolePositive = (data) => request.put(`/employees/${data.userId}/positive`, data)
// 获取员工转正详细信息
export const getRolePositive = (id) => request.get(`/employees/${id}/positive`)
// 员工导入
export const importRole = (data) => request.post('/sys/user/batch', data)
// 修改员工基本信息
export const deitRoleInfo = (data) => request.put(`/sys/user/${data.id}`, data)
// 获取员工岗位信息
export const getJobsInfo = id => request.get(`/employees/${id}/jobs`)
// 获取员工简单列表
export const getRoleSimple = () => request.get('/sys/user/simple')
// 修改个人信息
export const editRoleDel = (data) => request.put(`/employees/${data.userId}/personalInfo`, data)
// 修改员工岗位信息
export const editJobsInfo = (data) => request.put(`/employees/${data.userId}/jobs`, data)
// 给角色分配权限
export const allocationPer = (data) => request.put('/sys/role/assignPrem', data)
