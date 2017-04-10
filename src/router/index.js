import Vue from 'vue'
import Router from 'vue-router'
import auth from '../auth'
import {index, courseList, login, courseDetail, userInfo, timeTable, courseConf, addCourse, teacherConf, addTeacher,search} from '../pages/index'

Vue.use(Router)

export const router = new Router({
  linkActiveClass: 'item-selected',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: { noAuth: true }
    },
    {
      path: '/userIndex',
      name: 'index',
      component: index
    },
    {
      path: '/courseList',
      name: 'courseList',
      component: courseList
    },
    {
      path: '/course-detail/:classId',
      name: 'courseDetail',
      component:courseDetail
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component:userInfo
    },
    {
      path:'/timeTable',
      name: 'timeTable',
      component:timeTable
    },
    {
      path:'/courseConf',
      name:'courseConf',
      component:courseConf
    },
    {
      path:'/addCourse',
      name:'addCourse',
      component:addCourse
    },
    {
      path:'/teacherConf',
      name:'teacherConf',
      component:teacherConf
    },
    {
      path:'/addTeacher',
      name:'addTeacher',
      component:addTeacher
    },
    {
      path:'/search/:value',
      name:'search',
      component:search
    },

    {path: '*', redirect: {name: 'login'}}
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.noAuth)) {
    next();
    return;
  }

  if (!auth.student.authenticated) {
    next({
     name: 'login'
    });
    return;
  }

  next();
});
export default router;
