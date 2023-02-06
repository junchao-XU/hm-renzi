import { getStaffBasic } from '@/api/employees'
import { getUserInfo, login } from '@/api/user'
import { resetRouter } from '@/router'
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
    let roles = {}
    await getUserInfo().then(async(res) => {
      roles = res
      await getStaffBasic(res.userId).then((data) => {
        commit('SET_USER_INFO', { ...res, ...data })
      })
    })
    return roles
  },
  // 退出登录
  Login_Out({ commit, rootState }) {
    commit('REMOVE_TOKEN')
    commit('REMOVE_USER_INFO')
    // 重置路由
    resetRouter()
    // 子模块调用子模块的action 可以 将 commit的第三个参数 设置成  { root: true } 就表示当前的context不是子模块了 而是父模块
    commit('permission/setRoutes', [], { root: true })
    // 清空vuex ==> permission 里的 routes  第二种方法
    // rootState.permission.routes = []
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
