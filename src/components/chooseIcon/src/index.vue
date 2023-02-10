<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>
  <el-dialog :title="title" v-model="dialogVisible" >
    <ul class="container">
      <li class="item"
      v-for="(item, index) in Object.keys(ElIcons)" :key="index"
      @click="clickItem(item)"
      >
        <el-icon class="icon"><component :is="item" /></el-icon>
        <div class="title">{{item}}</div>
      </li>
    </ul>
  </el-dialog>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'
import * as ElIcons from '@element-plus/icons-vue'
import { useCopy } from '@/hooks/useCopy'

const props = defineProps<{
  title: String,
  visible: boolean
}>()
const emits = defineEmits<{(e: 'update:visible', visible: boolean): boolean}>()

// 不直接修改父组件传递的props
const dialogVisible = ref<boolean>(props.visible)

// 点击弹出对话框
const handleClick =()=>{
  emits('update:visible', !props.visible)
}

// 点击图标复制
const clickItem =(item:string)=>{
  const text = `<el-icon><${item} /></el-icon>`
  useCopy(text)
  dialogVisible.value = false
}

/* 要点击两次，el-dialog才展示
  el-dialog关闭后，dialogVisible.value===fasle，props.visible依旧为true
  第一次点击props.visible依旧为flase，dialogVisible.value===fasle
  第二次点击props.visible才变为true，dialogVisible.value===true
*/
watch(()=>props.visible, val=>{
  dialogVisible.value = val
})
// 修复上面的
watch(()=>dialogVisible.value, val=>{
  emits('update:visible', val)
})

</script>


<style lang="scss" scoped>
.container {
  display: flex;
  height: 500px;
  overflow: auto;
  flex-wrap: wrap;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  .item {
    box-sizing: border-box;
    width: 25%;
    height: 78px;
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .icon {
      font-size: 40px;
    }
    .title {
      margin-top: 8px;
    }
  }
}

</style>