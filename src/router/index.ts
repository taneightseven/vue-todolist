//从vue-router导入路由创建函数和history模式
import { createRouter, createWebHistory } from 'vue-router'

//首页使用TodoView
import TodoView from '@/views/TodoView.vue'

//创建路由实例，使用HTML5 History模式
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //根路径显示Todo页面
      path: '/',
      name: 'home',
      component: TodoView,
    },
    {
      //保留About页面，可通过/about访问
      path: '/about',
      name: 'about',
      //路由懒加载：访问时才加载AboutView
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

//导出路由实例，供main.ts使用
export default router
