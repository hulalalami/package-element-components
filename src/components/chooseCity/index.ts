import {App} from 'vue'
import chooseCity from './src/index.vue'

// 让这个组件通过use的形式使用
export default {
  install(app:App) {
    app.component('MChooseCity',  chooseCity)
  }
}