<template>
  <el-form ref="form" :model="model" :rules="rules" v-bind="$attrs" :validate-on-rule-change="false">
    <template v-for="item in options">

      <!-- 内嵌children的组件 -->
      <el-form-item 
        v-if="item.children && item.children.length > 0" 
        :label="item.label" 
        :prop="item.prop"
      >
        <component 
          :is="`el-${item.type}`" 
          v-model="model[item.prop!]" 
          v-bind="item.attrs"
        >
          <component v-for="(child, i) in item.children" :key="i" 
            :is="`el-${child.type}`" 
            :label="child.label" 
            :value="child.value"
          />
        </component>
      </el-form-item>

      <!-- v-upload组件单独写 -->
      <el-form-item 
        v-else-if="item.type==='upload'"
        :label="item.label" 
        :prop="item.prop"
      >
        <el-upload
          ref="upload"
          v-bind="item.uploadAttrs"
          :http-request="item.httpRequest"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :on-exceed="onExceed"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
        >
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>
      </el-form-item>

      <!-- 富文本编辑器wangEditor单独写 -->
      <el-form-item 
        v-else-if="item.type==='editor'"
        :label="item.label" 
        :prop="item.prop"
      >
        <div id="editor"></div>
      </el-form-item>

      <!-- 没有children的组件 -->
      <el-form-item 
        v-else
        :label="item.label" 
        :prop="item.prop"
      >
        <component
          :is="`el-${item.type}`" 
          v-model="model[item.prop!]" 
          :placeholder="item.placeholder" 
          v-bind="item.attrs" 
        />
      </el-form-item>

    </template>
    <el-form-item>
      <slot name="action" :form="form" :model="model" ></slot>
    </el-form-item>
  </el-form>
</template>


<script setup lang="ts">
import { PropType, ref, onMounted, nextTick } from 'vue';
import { FormOptions } from './types/type';
import cloneDeep from 'lodash/cloneDeep'
import { FormInstance } from 'element-plus/lib/components/form';
import { UploadFile, UploadFiles, UploadInstance, UploadProgressEvent, UploadRawFile } from 'element-plus/lib/components/upload/src/upload';
import E from 'wangeditor'
import { ElMessage } from 'element-plus';

const props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  }
})

const emits = defineEmits(['onPreview', 'onRemove', 'onSuccess', 'onError', 'onProgress', 'onChange', 'onExceed', 'beforeUpload', 'beforeRemove'])

const model = ref<any>({})
const rules = ref<any>({})
const form = ref<FormInstance>()
const edit = ref()
const upload = ref<UploadInstance>()

// 初始化表单
const initForm = () => {
  const m: any = {}
  const r: any = {}
  props.options.map((item: FormOptions) => {
    m[item.prop!] = item.value
    r[item.prop!] = item.rules
    if(item.type==='editor') {
      const editor = new E('#editor')
      editor.config.placeholder = item.placeholder!
      editor.create()
      // 初始化文本内容
      editor.txt.html(`${item.value}`)
      // 内容变更的change事件，默认200ms监听一次
      editor.config.onchange = function(newHtml:string){
        model.value[item.prop!] = newHtml
      };
      edit.value = editor
    }
  })
  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
}

// 重置表单
const resetFields =()=>{
  form.value!.resetFields()
  const editItem = props.options.find(item=>item.type==='editor')
  if(editItem) {
    edit.value.txt.html(`${editItem.value}`)
  }
  const uploadItem = props.options.find(item=>item.type==='upload')
  if(uploadItem) {
    nextTick(()=>{
      (upload.value as any)[0].clearFiles()
    })
  }
}

// 表单验证
const validate =()=>{
  return form.value!.validate
}
// 获取表单数据
const getFormData =()=>{
  return model.value
}

// defineExpose子组件给父组件暴露出去的属性
defineExpose({
  resetFields,
  validate,
  getFormData
})

onMounted(initForm)

/* v-upload的所有方法
  1.点击添加文件时触发事件及顺序：onchange，beforeUpload，onPreview；
    但是添加文件时的onPreview不能获取file参数
  2.点击已添加的文件触发onPreview
  3.删除已添加的文件触发事件及顺序：beforeRemove， onRemove
  4.添加文件超出数量触发：onExceed；配合limit属性
  5.上传文件触发的事件及顺序：onProgress，onSuccess/onError，onChange；配合auto-upload属性
  6.actions和httpRequest两种请求方式的区别，参考https://blog.csdn.net/wwf1225/article/details/125409166；
    不管哪种方式actions是必传，httpRequest会覆盖actions方式
*/
const onChange = (file:UploadFile, fileList:UploadFiles) =>{
  emits('onChange', {file, fileList})
}
const beforeUpload = (file:UploadRawFile) =>{
  emits('beforeUpload', file)
}
const onPreview = (file:UploadFile) =>{
  emits('onPreview', file)
}
const beforeRemove = (file:UploadFile, fileList:UploadFiles) =>{
  emits('beforeRemove', {file, fileList})
}
const onRemove = (file:UploadFile, fileList:UploadFiles) =>{
  emits('onRemove', {file, fileList})
}
const onExceed = (files:File[], fileList: UploadFiles) =>{
  emits('onExceed', {files, fileList})
}
const onProgress = (event: UploadProgressEvent, file:UploadFile, fileList:UploadFiles) =>{
  emits('onProgress', {event, file, fileList})
}
const onSuccess = (response:any, file:UploadFile, fileList:UploadFiles) =>{
  const uploadItem = props.options.find(item=>item.type==='upload')
  model.value[uploadItem!.prop!] = {response, file, fileList}
  emits('onSuccess', {response, file, fileList})
}
const onError = (err: Error, file:UploadFile, fileList:UploadFiles) =>{
  emits('onError', {err, file, fileList})
}

</script>


<style lang="scss" scoped>
:deep(.el-upload) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>