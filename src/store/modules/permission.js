import router, { constantRoutes } from '@/router'
import { asyncRoutes } from '@/router/modules'
const state = {
  routes: []
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = routes
  }
}
const actions = {
  filterRoutes({ commit }, roles) {
    // 筛选路由
    const routes = asyncRoutes.filter(item => {
      return roles.menus.includes(item.children[0].name)
    })
    // 添加路由
    router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
    commit('setRoutes', [...constantRoutes, ...routes])
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
