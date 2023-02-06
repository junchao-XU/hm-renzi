// 引入多个模块的规则
import departments from './departments'
import settings from './settings'
import employees from './employees'
import permissions from './permissions'
import social_securitys from './social'
// 动态路由
export const asyncRoutes = [
  departments,
  settings,
  employees,
  permissions,
  social_securitys
]
