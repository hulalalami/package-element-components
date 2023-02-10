<template>
  <el-popover popper-class="notification_padding-bottom" placement="bottom-start" :width="300" trigger="click">
    <template #default>
      <slot></slot>
    </template>
    <template #reference>
      <el-badge style="cursor: pointer;" :value="value" :max="max" :is-dot="isDot">
        <el-icon><component :is="icon"></component></el-icon>
      </el-badge>
    </template>
  </el-popover>
</template>


<script setup lang="ts">

defineProps({
  value: {
    type: [String, Number],
    default: ''
  },
  max: {
    type: Number
  },
  isDot: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: 'Bell'
  }
})

</script>


<style lang="scss" scoped>

</style>