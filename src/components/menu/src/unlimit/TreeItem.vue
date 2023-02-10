<template>
  <template v-for="item in data">
    <el-sub-menu v-if="item[children] && item[children].length !== 0" :index="item[index]">
      <template #title>
        <el-icon v-if="item[icon]"><component :is="item[icon]" /></el-icon>
        <span>{{item[name]}}</span>
      </template>
      <TreeItem :data="item[children]" :name="name" :index="index" :icon="icon" :children="children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item[index]">
      <el-icon v-if="item[icon]"><component :is="item[icon]" /></el-icon>
      <span>{{item[name]}}</span>
    </el-menu-item>
  </template>

</template>


<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true
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
</style>