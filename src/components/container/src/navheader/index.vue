<template>
  <div class="header">
    <span style="cursor: pointer;" @click="toggle">
      <Fold v-if="modelValue" />
      <Expand v-else />
    </span>
  </div>

</template>


<script setup lang="ts">

const props = defineProps<{ modelValue: boolean }>()
const emits = defineEmits<{(e: 'update:modelValue', modelValue: boolean): boolean}>()

const toggle =()=>{
  emits('update:modelValue', !props.modelValue)
}

</script>


<style lang="scss" scoped>

svg {
  width: 1em;
  height: 1em;
}
.header {
  height: 100%;
  display: flex;
  align-items: center;
  
}
</style>