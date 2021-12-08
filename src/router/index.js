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
        path: '/genderPic',
        name: 'genderPic',
        component: () => import('../views/person/genderPic.vue'),
      },
      {
        path: '/studentTable',
        name: 'studentTable',
        component: () => import('../views/person/studentTable.vue'),
      },
      {
        path: '/teacherTable',
        name: 'teacherTable',
        component: () => import('../views/person/teacherTable.vue'),
      },
      {
        path: '/classTable',
        name: 'classTable',
        component: () => import('../views/classroom/classTable.vue'),
      },
      {
        path: '/classStudent',
        name: 'classStudent',
        component: () => import('../views/classroom/classStudent.vue'),
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
        path: '/semester',
        name: 'semester',
        component: () => import('../views/course/semester.vue'),
      },
      {
        path: '/subject',
        name: 'subject',
        component: () => import('../views/course/subject.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
