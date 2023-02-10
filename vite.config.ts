import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080
  },
  // 设置相对路径，防止打包后引用文件出错
  base: './',
  resolve:{
    alias: [{find:'@', replacement:resolve(__dirname, 'src')}]
  }
})
