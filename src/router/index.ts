import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Container from '@/components/container/src/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: Container,
    children: [
      {
        path: 'home',
        meta: {
          icon: 'HomeFilled',
          name: '首页',
        },
        component: () => import('@/views/Home.vue')
      }, {
        path: 'chooseIcon',
        meta: {
          icon: 'Check',
          name: '图标选择器',
        },
        component: () => import('@/views/chooseIcon/index.vue')
      }, {
        path: 'chooseArea',
        meta: {
          icon: 'Location',
          name: '省市区选择',
        },
        component: () => import('@/views/chooseArea/index.vue')
      }, {
        path: 'trend',
        meta: {
          icon: 'Sort',
          name: '趋势标记',
        },
        component: () => import('@/views/trend/index.vue'),
      }, {
        path: 'notification',
        meta: {
          icon: 'Bell',
          name: '通知菜单',
        },
        component: () => import('@/views/notification/index.vue')
      }, {
        path: 'menu',
        meta: {
          icon: 'Menu',
          name: '导航菜单',
        },
        component: () => import('@/views/menu/index.vue')
      }, {
        path: 'progress',
        meta: {
          icon: 'DArrowRight',
          name: '进度条',
        },
        component: () => import('@/views/progress/index.vue')
      }, {
        path: 'chooseTime',
        meta: {
          icon: 'Timer',
          name: '时间选择',
        },
        component: () => import('@/views/chooseTime/index.vue')
      }, {
        path: 'chooseCity',
        meta: {
          icon: 'LocationFilled',
          name: '城市选择',
        },
        component: () => import('@/views/chooseCity/index.vue')
      }, {
        path: 'form',
        meta: {
          icon: 'Setting',
          name: '表单',
        },
        component: () => import('@/views/form/index.vue')
      }, {
        path: 'modelForm',
        meta: {
          icon: 'ChatDotSquare',
          name: '弹出框表单',
        },
        component: () => import('@/views/modelForm/index.vue')
      }, {
        path: 'table',
        meta: {
          icon: 'ShoppingBag',
          name: '表格',
        },
        component: () => import('@/views/table/index.vue')
      }, {
        path: 'calendar',
        meta: {
          icon: 'Calendar',
          name: '日历',
        },
        component: () => import('@/views/calendar/index.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router