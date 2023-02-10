<template>
  <div class="model-form">
    <el-dialog
      v-model="dialogVisible" 
      v-bind="$attrs"
    >
      <template #default>
        <MForm 
          ref="form" 
          :options="options" 
          :label-width="formLabelWidth"
          @onPreview="onPreview"
          @onRemove="onRemove"
          @onSuccess="onSuccess"
          @onError="onError"
          @onProgress="onProgress"
          @onChange="onChange"
          @onExceed="onExceed"
          @beforeUpload="beforeUpload"
          @beforeRemove="beforeRemove"
        >
          <!-- v-upload专用 -->
          <template #uploadArea>
            <slot name="uploadArea"></slot>
          </template>
          <template #uploadTip>
            <slot name="uploadTip"></slot>
          </template>
        </MForm>
      </template>

      <template #footer>
        <slot name="footer" :form="form" ></slot>
      </template>
    </el-dialog>
  </div>
</template>


<script setup lang="ts">
import { FormInstance } from 'element-plus/lib/components/form';
import { PropType, ref, watch } from 'vue';
import { FormOptions } from '../../form/src/types/type';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  formLabelWidth: {
    type: String
  },
  maxHeight: {
    type: String
  },
  // 以下是v-upload专用事件
  onPreview: {
    type: Function
  },
  onRemove: {
    type: Function
  },
  onSuccess: {
    type: Function
  },
  onError: {
    type: Function
  },
  onProgress: {
    type: Function
  },
  onChange: {
    type: Function
  },
  onExceed: {
    type: Function
  },
  beforeUpload: {
    type: Function
  },
  beforeRemove: {
    type: Function
  },
})

const emits = defineEmits(['update:visible'])

const form = ref<FormInstance>()

const dialogVisible = ref(props.visible)

watch(()=>props.visible, val=>{
  dialogVisible.value = val
})
watch(()=>dialogVisible.value, val=>{
  emits('update:visible', val)
})

</script>


<style lang="scss" scoped>
.model-form {
  :deep(.el-dialog) {
    max-height: v-bind('props.maxHeight');
    overflow: auto;
  }
}


</style>