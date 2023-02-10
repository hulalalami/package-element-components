<template>
  <div>
    <MChooseIcon title="选择图标" v-model:visible="visible">
      <template #default>
        <span>选择图标</span>
      </template>
    </MChooseIcon>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'

const visible = ref<boolean>(false)

</script>


<style lang="scss" scoped>
  
</style>