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
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
