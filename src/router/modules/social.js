import Layout from '@/layout'
export default {
  path: '/social_securitys',
  component: Layout,
  children: [
    {
      path: '',
      name: 'social_securitys',
      meta: {
        title: '社保',
        icon: 'table'
      },
      component: () => import('@/views/social')
    },
    // 查看详情
    {
      path: 'detail/:id?',
      name: 'detail',
      hidden: true,
      meta: {
        title: '详情',
        icon: 'table'
      },
      component: () => import('@/views/social/detail.vue')
    },
    // 历史归档
    {
      path: 'historical',
      name: 'historicalArchiving',
      hidden: true,
      meta: {
        title: '历史归档',
        icon: 'table'
      },
      component: () => import('@/views/social/historical.vue')
    },
    // 当月报表
    {
      path: 'month/:yearMonth?',
      name: 'month',
      hidden: true,
      meta: {
        title: '当月报表',
        icon: 'table'
      },
      component: () => import('@/views/social/month.vue')
    }
  ]
}
