<!-- 无限层级菜单：常规template模式 -->
<template>
  <!-- $attrs：接收父组件传递的并且没有在defineProps声明的参数 -->
  <el-menu class="el-menu-vertical-demo" :default-active="defaultActive" :router="router" v-bind="$attrs">
    <TreeItem :data="data" :name="name" :index="index" :icon="icon" :children="children" />
  </el-menu>
</template>


<script setup lang="ts">
import { PropType } from 'vue'
import TreeItem from './TreeItem.vue' 

const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
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
  verticalExpandWidth: {
    type: String,
    defalut: '150px'
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
})

</script>


<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: v-bind('props.verticalExpandWidth');
}
</style>