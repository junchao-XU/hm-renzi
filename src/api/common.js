import request from '@/utils/request'

// 获取城市
export const getCityList = () => request.get('/sys/city')
