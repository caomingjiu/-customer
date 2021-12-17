import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('../views/layout.vue'),
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../views/index.vue'),
      },
      //人事模块
      {
        path: '/personpic',
        name: 'personPic',
        component: () => import('../views/person/personPic.vue'),
      },
      {
        path: '/persontable',
        name: 'personTable',
        component: () => import('../views/person/personTable.vue'),
      },
      {
        path: '/feedback',
        name: 'feedback',
        component: () => import('../views/person/feedback.vue'),
      },
      {
        path: '/performance',
        name: 'performance',
        component: () => import('../views/person/performance.vue'),
      },
      {
        path: '/customer',
        name: 'customer',
        component: () => import('../views/person/customer.vue'),
      },
      //系统模块
      {
        path: '/sysPeople',
        name: 'sysPeople',
        component: () => import('../views/system/sysPeople.vue'),
      },
      {
        path: '/sysRole',
        name: 'sysRole',
        component: () => import('../views/system/sysRole.vue'),
      },
      {
        path: '/logo',
        name: 'logo',
        component: () => import('../views/system/logo.vue'),
      },
      //部门模块
      {
        path: '/department',
        name: 'department',
        component: () => import('../views/department/department.vue'),
      },
      {
        path: '/position',
        name: 'position',
        component: () => import('../views/department/position.vue'),
      },
      //产业模块
      {
        path: '/product',
        name: 'product',
        component: () => import('../views/industry/product.vue'),
      },
      {
        path: '/plan',
        name: 'plan',
        component: () => import('../views/industry/plan.vue'),
      },
      {
        path: '/order',
        name: 'order',
        component: () => import('../views/industry/order.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
