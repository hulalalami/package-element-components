import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import mUI from '@/components'
// 整体打包，整体引入组件
// import mUI from '../lib/package-element-components.js'
// import '../lib/style.css'
// 单独打包，单独引入
// import chooseIcon from '../lib/chooseIcon/index.js'
// import menu from '../lib/menu/index.js'
// import '../lib/chooseIcon/style.css'
// 发布npm后使用
// import chooseIcon from 'package-element-components/chooseIcon'
// import 'package-element-components/style.css'


const app = createApp(App)

// 注册全局全部icons图标，***当packages打包时引入了，这里可以不引入***
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app
  .use(router)
  .use(ElementPlus)
  .use(mUI)
  // .use(chooseIcon)
  // .use(menu)
  .mount('#app')
