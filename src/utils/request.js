import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  config => {
    // 设置请求头
    if (store.getters.token) config.headers.Authorization = `Bearer ${store.getters.token}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  response => {
    const { success, message } = response.data
    if (!success) {
      Message.error(message)
      return Promise.reject(new Error(message))
    } else {
      return response.data.data
    }
  },
  error => {
    // token过期
    if (error.response && error.response.data && error.response.data.code === 10002) {
      store.dispatch('user/Login_Out')
      router.replace('/login')
      Message.error('请重新登录')
    } else {
      // 其他错误提示
      if (error.message === 'timeout of 5000ms exceeded') Message.error('网络有点慢哦!')
      else if (error.message === 'Network Error') Message.error('网络出问题了!')
      else Message.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default request
