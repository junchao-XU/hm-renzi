import request from '@/utils/request'

// 获取-部门列表
export const getDepartments = () => request.get('/company/department')
// 获取-部门负责人列表
export const getDepartmentPerson = () => request.get('/sys/user/simple')
// 新增-部门
export const addDepartment = (data) => request.post('/company/department', data)
// 修改-部门详情
export const editDepartment = (data) => request.put(`/company/department/${data.id}`, data)
// 删除-部门详情
export const removeDepartment = (id) => request.delete(`/company/department/${id}`)
// 获取-部门详情
export const getDepartmentsInfo = (id) => request.get(`/company/department/${id}`)
