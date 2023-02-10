<template>
  <div style="display: flex;">
    <el-time-select class="mr-4" v-model="startTime" :max-time="endTime" :placeholder="startPlaceholder" :start="startTimeStart" :step="startStep" :end="startTimeEnd" v-bind="$attrs.startOptions" />
    <el-time-select v-model="endTime" :min-time="startTime" :placeholder="endPlaceholder" :start="endTimeStart" :step="endStep" :end="endTimeEnd" :disabled="endTimeDisabled" v-bind="$attrs.endOptions" />
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'

const startTime = ref('')
const endTime = ref('')
const endTimeDisabled = ref(true)

defineProps({
  startPlaceholder: {
    type: String,
    default: '请输入开始时间'
  },
  startTimeStart: {
    type: String,
    default: '8:30'
  },
  startStep: {
    type: String,
    default: '00:15'
  },
  startTimeEnd: {
    type: String,
    default: '23:30'
  },
  endPlaceholder: {
    type: String,
    default: '请输入结束时间'
  },
  endTimeStart: {
    type: String,
    default: '8:30'
  },
  endStep: {
    type: String,
    default: '00:15'
  },
  endTimeEnd: {
    type: String,
    default: '23:30'
  }
})

const emits = defineEmits(['startChange', 'endChange'])

watch(() => startTime.value, val => {
  if (val) {
    endTimeDisabled.value = false
    emits('startChange', val)
  } else {
    endTime.value = ''
    endTimeDisabled.value = true
  }
})

watch(() => endTime.value, val => {
  if (val) {
    emits('endChange', {
      startTime: startTime.value,
      endTime: val
    })
  }
})

</script>


<style lang="scss" scoped>
.mr-4 {
  margin-right: 4px;
}
</style>