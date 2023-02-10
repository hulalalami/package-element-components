<template>
  <el-table
    :data="copyTableData" 

    v-loading="isLoading" 
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-background="elementLoadingBackground"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"

    @row-click="rowClick"

    v-bind="$attrs"
  >

    <!-- 数据列 -->
    <template v-for="item in tableOptions">
      <el-table-column
        :prop="item.prop" 
        :label="item.label" 
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">

          <!-- 可编辑行 -->
          <template v-if="scope.row.rowEdit">
            <el-input size="small"
              v-if="editableArr!.includes(item.prop!)"  
              v-model="tempEditList[item.prop!]" 
            />
            <template v-else>
              <!-- 自定义格式 -->
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <!-- 常规格式 -->
              <span v-else>{{scope.row[item.prop!]}}</span>
              <!-- 单元格是否可编辑 -->
              <el-icon class="edit" v-if="item.editable" @click.stop="clickEdit(scope, item)">
                <component :is="editIcon" />
              </el-icon>
            </template>
          </template>

          <!-- 不可编辑行 -->
          <template v-else>

            <!-- 进入编辑单元格 -->
            <template v-if="scope.$index+scope.column.id===currentEdit">
              <div class="edit-container">
                <el-input size="small" v-model="tempEdit" />
                  <!-- 编辑单元格check/close的插槽 -->
                <slot 
                  v-if="$slots.editCell" 
                  name="editCell" 
                  :scope="scope" 
                  :item="item" 
                  :checkItem="check"
                  :closeItem="close"
                ></slot>
                <div class="icon" v-else>
                  <el-icon class="check" @click.stop="check(scope, item)"><Check /></el-icon>
                  <el-icon class="close" @click.stop="close(scope, item)"><Close /></el-icon>
                </div>
              </div>
            </template>

            <template v-else>
              <!-- 自定义格式 -->
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <!-- 常规格式 -->
              <span v-else>{{scope.row[item.prop!]}}</span>
              <!-- 单元格是否可编辑 -->
              <el-icon class="edit" v-if="item.editable" @click.stop="clickEdit(scope, item)">
                <component :is="editIcon" />
              </el-icon>
            </template>
          </template>

        </template>
      </el-table-column>
    </template>

    <!-- 操作列 -->
    <el-table-column 
      :label="actionOptions!.label"
      :align="actionOptions!.align"
      :width="actionOptions!.width"
    >
      <template #default="scope" >
        <slot 
          name="editRow" 
          v-if="scope.row.rowEdit" 
          :scope="scope" 
          :rowConfirm="rowConfirm" 
          :rowCancel="rowCancel"
        ></slot>
        <slot name="action" v-else :scope="scope" ></slot>
      </template>
    </el-table-column>

  </el-table>

  <div class="pagination" v-if="pagination">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>

</template>


<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { PropType, computed, ref, reactive, onMounted, watch,  } from 'vue';
import { TableOptions } from './types';

interface ObjType {
  [key: string]: any
}


const props = defineProps({
  options: {
    type: Array as PropType<TableOptions[]> ,
    required: true
  },
  data: {
    type: Array as PropType<any[]>,
    required: true
  },
  
  // v-loading配置
  // 加载文案
  elementLoadingText: {
    type: String
  },
  // 加载图标名
  elementLoadingSpinner: {
    type: String
  },
  // 背景遮罩颜色
  elementLoadingBackground: {
    type: String
  },
  // 加载svg
  elementLoadingSvg: {
    type: String
  },
  // 加载svg的ViewBox配置
  elementLoadingSvgViewBox: {
    type: String
  },

  // 可编辑单元格图标
  editIcon: {
    type: String,
    default: 'Edit'
  },

  // 行编辑的文本名
  rowEditText: {
    type: String,
  },
  // 行编辑的动作标识
  editRowIndex: {
    type: String,
    default: ''
  },

  // 是否分页
  pagination: {
    type: Boolean,
    default: false
  },
  // 当前页
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  // 每页显示数据数量的选项
  pageSizes: {
    type: Array as PropType<number[]>,
    default: [10, 20, 30]
  },
  // 数据总数
  total: {
    type: Number,
  },
  // 分页器排列方式
  paginationAlign: {
    type: String as PropType<'flex-start'|'center'|'flex-end'>,
    default: 'flex-start'
  }
})
const emits = defineEmits([
  'check', 
  'close', 
  'update:editRowIndex', 
  'rowEditConfirm', 
  'rowEditCancel',
  'sizeChange',
  'currentChange'
])

// 当前点击的单元格的唯一标识
const currentEdit = ref<string>()

// 拷贝表格的数据
const copyTableData = ref<any[]>(cloneDeep(props.data))
onMounted(()=>{
  if(copyTableData.value) {
    copyTableData.value.map(item =>{
      // 设置当前不可编辑状态
      item.rowEdit = false
    })
  }
})
// 监听父组件传来的数据
watch(()=>props.data, val=>{
  copyTableData.value = cloneDeep(val)
  copyTableData.value.map(item =>{
    // 设置当前不可编辑状态
    item.rowEdit = false
  })
}, {deep: true})

// 拷贝行编辑的动作标识
const copyEditRowIndex = ref<string>(props.editRowIndex)
// 监听父组件传递过来的标识
watch(()=>props.editRowIndex, val=>{
  if(val) copyEditRowIndex.value = val
})

// 编辑单元格的临时数据
const tempEdit = ref<string>()
const tempEditList = reactive<ObjType>({})

// 过滤操作选项之后的配置
const tableOptions = computed(()=>props.options.filter(item=>!item.action))
// 找出操作项的配置
const actionOptions = computed(()=>props.options.find(item=>item.action))

// 没有加载数据之前显示loading
const isLoading = computed(()=>!props.data || !props.data.length)

// 点击编辑图标，进入编辑单元格
const clickEdit = (scope:any, item:any) =>{
  currentEdit.value = scope.$index + scope.column.id
  tempEdit.value = scope.row[item.prop!]
}

// 编辑单元格完毕点击check
const check = (scope:any, item:any)=>{
  scope.row[item.prop!] = tempEdit.value
  currentEdit.value = ''
  emits('check', {scope, item})
}
// 取消编辑单元格点击close
const close = (scope:any, item:any)=>{
  currentEdit.value = ''
  emits('close', {scope, item})
}

// 点击每一行的编辑按钮
const editableArr = ref<string[]>()
const rowClick = (row:any, column:any, event:any) =>{
  // 判断当前点击是否是操作项中编辑按钮的内容
  if(column.label===actionOptions.value!.label && event.target.innerText===props.rowEditText) {
    // 找出可编辑的row子项
    editableArr.value = props.options.map(i=>{
      if(i.editable) {return i.prop}
    }).filter(Boolean) as string[]
    // 过滤出可编辑的单元格并设置临时值
    for(const [key, value] of Object.entries(row)) {
      if(editableArr.value.includes(key)) {
        tempEditList[key] = value
      }
    }
    // 标记当前行为可编辑状态
    row.rowEdit = true
    // 标记其他行不可编辑
    copyTableData.value.map(item=>{
      if(item!==row) item.rowEdit = false
    })
    if(!row.rowEdit) emits('update:editRowIndex', '')
  }
}

// 行编辑确认
const rowConfirm = (scope:any) =>{
  for(const [key, val] of Object.entries(tempEditList)){
    scope.row[key] = val
  }
  scope.row.rowEdit = false
  emits('rowEditConfirm', scope)
}
// 行编辑取消
const rowCancel = (scope:any) =>{
  scope.row.rowEdit = false
  emits('rowEditCancel', scope)
}

// 改变每页数据条数
const handleSizeChange = (val:number) =>{
  emits('sizeChange', val)
}
// 改变当前页
const handleCurrentChange = (val:number) =>{
  emits('currentChange', val)
}

</script>


<style lang="scss" scoped>
.edit-container {
  display: flex;
  .icon {
    display: flex;
    .check {
      font-size: 20px;
      color: red;
    }
    .close {
      font-size: 20px;
      color: green;
    }
  }
}

:deep(.el-icon) {
  position: relative;
  top: 2px;
  margin-left: 4px;
}
.edit {
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: v-bind('props.paginationAlign');
  align-items: center;
  margin-top: 15px;
}
</style>