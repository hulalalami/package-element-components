
import {fileURLToPath} from 'url';
import {dirname, resolve} from 'path';
import { defineConfig, build } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { outputFile } from 'fs-extra'
import { readdirSync, lstatSync } from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 打包入口文件夹
const entryDir = resolve(__dirname, '../packages')
// 出口文件夹
const outDir = resolve(__dirname, '../lib')

// 基础配置
const baseConfig = defineConfig({
  configFile: false, //指明要使用的配置文件
  publicDir: false, //作为静态资源服务的文件夹
  plugins: [vue(), vueJsx()]
})

// rollup配置（vite基于rollup）
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

// 全量打包构建
const buildAll = async () =>{
  await build({
    ...baseConfig,
    build: {
      // sourcemap: 'inline',
      rollupOptions,
      lib: {
        entry: resolve(entryDir, 'index.ts'),
        name: 'package-element-components',
        fileName: 'package-element-components',
        formats: ['es']
      },
      outDir
    }
  })
}

// 单独组件打包构建
const buildSingle = async name =>{
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: resolve(entryDir, name),
        name: 'index',
        fileName: 'index',
        formats: ['es']
      },
      outDir: resolve(outDir, name)
    }
  })
}

// 每个组件生成package.json，按需引入所必须
const createPackageJson = name =>{
  const fileStr = `
    {
      "name": "${name}",
      "main": "index.js",
      "style": "styles.css"
    }
  `
  // 输出，安装fs-extra
  outputFile(
    resolve(outDir, `${name}/package.json`),
    fileStr,
    'utf-8'
  )
}

// 打包成库
const buildLib = async ()=>{

  // 全量打包
  await buildAll()

  // 单独打包
  /* 
    readdirSync同步读取目录下所有文件名
    reslove组成绝对路径
    lstatSync同步获取该文件的有关信息，例如大小，创建时间等
    isDirectory判断是否为文件夹
  */
  const components = readdirSync(entryDir).filter(name=>{
    const componentDir = resolve(entryDir, name)
    const isDir = lstatSync(componentDir).isDirectory()
    return isDir && readdirSync(componentDir).includes('index.ts')
  })
  // 循环构建
  for(const name of components) {
    await buildSingle(name)
    createPackageJson(name)
  }

}

buildLib()