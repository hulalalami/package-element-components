<template>
  <el-container>
    <!-- width:auto 宽度随子元素变化 -->
    <el-aside width="auto">
      <nav-side :collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <nav-header v-model="isCollapse" />
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import NavHeader from './navheader/index.vue'
import NavSide from './navside/index.vue'

const isCollapse = ref<boolean>(false)

</script>


<style lang="scss" scoped>
svg {
  width: 1em;
  height: 1em;
}
.el-header {
  border-bottom: 1px solid #eee;
}
</style>