import {App} from 'vue'
import menu from './src/secflor.vue'

// 无限层级菜单有两种方式
import infinitMenu from './src/unlimit/container.vue'
// import infinitMenu from './src/menu'

// 让这个组件通过use的形式使用
export default {
  install(app:App) {
    app.component('MMenu', menu)
    app.component('MInfinitMenu', infinitMenu)
  }
}