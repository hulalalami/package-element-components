<template>
  <el-progress :percentage="p" v-bind="$attrs"></el-progress>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
  // 进度完成度
  percentage: {
    type: Number,
    required: true
  },
  // 是否有动画效果
  isAnmiate: {
    type: Boolean,
    default: false
  },
  // 动画时长
  time: {
    type: Number,
    default: 500
  }
})

const p = ref(0)

onMounted(() => {
  if (props.isAnmiate) {
    const t = Math.ceil(props.time / props.percentage)
    const timer = setInterval(() => {
      p.value += 1
      if (p.value >= props.percentage) {
        p.value = props.percentage
        clearInterval(timer)
      }
    }, t)
  } else {
    p.value = props.percentage
  }
})


</script>


<style lang="scss" scoped>
</style>