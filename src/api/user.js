import request from '@/utils/request'

// 登录
export const login = (data) => request.post('/sys/login', data)

// 获取-用户基本资料
export const getUserInfo = () => request.post('/sys/profile')

