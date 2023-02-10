
<!-- 二级菜单 -->
<template>
  <!-- $attrs：接收父组件传递的并且没有在defineProps声明的参数 -->
  <el-menu class="el-menu-vertical-demo" :default-active="defaultActive" :router="router" v-bind="$attrs">
    <template v-for="item in data">
      <el-sub-menu v-if="item[children] && item[children].length !== 0" :index="item[index]">
        <template #title>
          <el-icon v-if="item[icon]">
            <component :is="item[icon]" />
          </el-icon>
          <span>{{ item[name] }}</span>
        </template>
        <el-menu-item v-for="(item1, index1) in item[children]" :key="index1" :index="item1[index]">
          <el-icon v-if="item1[icon]">
            <component :is="item1[icon]" />
          </el-icon>
          <span>{{ item1[name] }}</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item[index]">
        <el-icon v-if="item[icon]">
          <component :is="item[icon]" />
        </el-icon>
        <span>{{ item[name] }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>


<script setup lang="ts">
import { PropType } from 'vue'

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
// 伸缩动画之用
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: v-bind('props.verticalExpandWidth');
}
</style>