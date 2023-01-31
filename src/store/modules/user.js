import { getStaffBasic } from '@/api/employees'
import { getUserInfo, login } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

const state = {
  token: getToken() || '', // token
  userInfo: {} // 用户基本信息
}
const mutations = {
  // 设置token
  LOGIN_TOKEN(state, token) {
    state.token = token
    setToken(token)
  },
  // 清除token
  REMOVE_TOKEN(state) {
    state.token = ''
    removeToken()
  },
  // 设置用户信息
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除用户信息
  REMOVE_USER_INFO(state) {
    state.userInfo = {}
  }

}
const actions = {
  // 登录
  async login({ commit }, data) {
    await login(data).then((res) => {
      commit('LOGIN_TOKEN', res)
    })
  },
  // 获取用户基本信息
  async getUserInfo({ commit }) {
    await getUserInfo().then(async(res) => {
      await getStaffBasic(res.userId).then((data) => {
        commit('SET_USER_INFO', { ...res, ...data })
      })
    })
  },
  // 退出登录
  Login_Out({ commit }) {
    commit('REMOVE_TOKEN')
    commit('REMOVE_USER_INFO')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
