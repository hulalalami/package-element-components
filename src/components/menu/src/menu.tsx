
/**
 * 无限层级菜单: JSX模式
 * bug: [
 *  1.在navside侧栏菜单那收缩状态不显示图标；
 *  2.展开和收缩动画不流畅，如何添加内部样式表.el-menu-vertical-demo:not(.el-menu--collapse)
 *  3.打包出错
 * ]
 */


import { defineComponent, PropType, useAttrs, h, resolveComponent } from "vue";
import {MenuItem} from './types'

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true
    },
    defaultActive: {
      type: String,
      default: ''
    },
    router: {
      type: Boolean,
      default: false
    },
    // 菜单名称的键名
    name: {
      type: String,
      default: 'name'
    },
    index: {
      type: String,
      default: 'index'
    },
    icon: {
      type: String,
      default: 'icon'
    },
    children: {
      type: String,
      default: 'children'
    },
  },
  setup(props, ctx) {

    const attrs = useAttrs()

    const renderMenu = (data: any[]) => {
      return data.map((item: any) => {

        const slots = {
          // 相当于<template #title></template>
          title: () => {
            return (
              <>
                {/* resolveComponent：组件用名字注册的，不能直接导入 */}
                <el-icon>{item[props.icon] ? h(resolveComponent(item[props.icon])) : ''}</el-icon>
                <span>{item[props.name]}</span>
              </>
            )
          }
        }

        if (item[props.children] && item[props.children].length) {
          return (
            // 用v-slots取代v-slot
            <el-sub-menu index={item[props.index]} v-slots={slots} >
              {renderMenu(item[props.children])}
            </el-sub-menu>
          )
        }

        return (
          // 用v-slots取代v-slot
          <el-menu-item index={item[props.index]} v-slots={slots}></el-menu-item>
        )
      })
    }

    return () => {
      return (
        <el-menu default-active={props.defaultActive} router={props.router} {...attrs} >
          {renderMenu(props.data)}
        </el-menu>
      )
    }
  }
})
