//从pinia导入createPinia，用于创建状态管理实例
import { createPinia } from 'pinia'
//从vue导入createApp，用于创建Vue应用
import { createApp } from 'vue'

//导入根组件App
import App from './App.vue'
//导入路由配置
import router from './router'

//创建Vue应用实例
const app = createApp(App)

//安装Pinia，启用状态管理
app.use(createPinia())
//安装Vue Router，启用路由
app.use(router)

//挂载到index.html中的#app节点
app.mount('#app')
