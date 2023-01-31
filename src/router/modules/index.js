// 引入多个模块的规则
import departments from './departments'
import setting from './setting'
import employees from './employees'
// 动态路由
export const asyncRoutes = [
  departments,
  setting,
  employees
]
