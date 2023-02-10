<template>
  <div style="display: flex;">
    <div class="mr-4">
      <el-date-picker v-model="startDate" type="date" :placeholder="startPlaceholder" :disabled-date="startDisableDate" v-bind="$attrs.startOptions" />
    </div>
    <div>
      <el-date-picker v-model="endDate" type="date" :placeholder="endPlaceholder" :disabled-date="endDisableDate" :disabled="endDateDisabled" v-bind="$attrs.endOptions" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  startPlaceholder: {
    type: String,
    default: '请选择开始日期'
  },
  endPlaceholder: {
    type: String,
    default: '请选择结束日期'
  },
  // 是否禁用今天之前的日期
  disableToday: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['startChange', 'endChange'])

const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)
const endDateDisabled = ref<Boolean>(true)

const startDisableDate = (time: Date) => {
  if (props.disableToday) return time.getTime() < Date.now() - 86400000
}
const endDisableDate = (time: Date) => {
  if (startDate.value) return time.getTime() < startDate.value.getTime() + 86400000
}

watch(() => startDate.value, val => {
  if (val) {
    endDateDisabled.value = false
    emits('startChange', val)
  } else {
    endDate.value = null
    endDateDisabled.value = true
  }
})

watch(() => endDate.value, val => {
  if (val) {
    emits('endChange', {
      startDate: startDate.value,
      endDate: val
    })
  }
})

</script>


<style lang="scss" scoped>
.mr-4 {
  margin-right: 4px;
}
</style>