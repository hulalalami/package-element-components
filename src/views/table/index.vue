<template>
  <MTable
    :options="options" 
    :data="tableData"
    border

    elementLoadingText="火箭加载中"
    elementLoadingBackground="rgba(122, 122, 122, 0.8)"
    :elementLoadingSvg="svg"
    elementLoadingSvgViewBox="-10, -10, 50, 50"

    @check="check"
    @close="close"

    v-model:editRowIndex="rowEdit.index"
    :rowEditText="rowEdit.text"
    @rowEditConfirm="rowEditConfirm"
    @rowEditCancel="rowEditCancel"

    pagination
    :currentPage="curPage"
    :pageSize="pageSize"
    :total="total"
    paginationAlign="flex-end"
    @sizeChange="sizeChange"
    @currentChange="currentChange"
  >

    <!-- 自定义格式 -->
    <template #date="{scope}">
      <el-icon><Timer /></el-icon>
      {{scope.row.date}}
    </template>
    <template #name="{scope}">
      <el-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ scope.row.name }}</div>
          <div>address: {{ scope.row.address }}</div>
        </template>
        <template #reference>
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-popover>
    </template>

    <!-- 操作按钮 -->
    <template #action="{scope}">
      <el-button type="primary" @click="edit">{{rowEdit.text}}</el-button>
      <el-button type="danger">删除</el-button>
    </template>

    <!-- 编辑行按钮 -->
    <template #editRow="{scope, rowConfirm, rowCancel}">
      <el-button type="primary" @click.stop="rowConfirm(scope)">确认</el-button>
      <el-button type="danger" @click.stop="rowCancel(scope)">取消</el-button>
    </template>

    <!-- 编辑单元格按钮 -->
    <template #editCell="{scope, item, checkItem, closeItem}">
      <div style="display: flex; margin-left: 8px;">
        <el-button size="small" type="primary" @click.stop="checkItem(scope, item)">确认</el-button>
        <el-button size="small" @click.stop="closeItem(scope, item)" >取消</el-button>
      </div>
    </template>

  </MTable>
</template>


<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { TableOptions } from '../../components/table/src/types';
import axios from 'axios'

interface TableData {
  date: string,
  name: string,
  address: string
}

const options:TableOptions[] = [
  {
    label: '日期',
    prop: 'date',
    align: 'center',
    slot: 'date',
    editable: true
  }, {
    label: '姓名',
    prop: 'name',
    align: 'center',
    slot: 'name',
  }, {
    label: '地址',
    prop: 'address',
    align: 'center',
    editable: true
  }, {
    label: '操作',
    align: 'center',
    action: true
  }
]

const tableData = ref<TableData[]>([])

const svg = `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`

// 行编辑文本名和动作标识
const rowEdit = reactive({
  text: '编辑',
  index: ''
})

// 编辑按钮
const edit =()=>{
  rowEdit.index = 'rowEdit'
}

// 编辑单元格
const check = (val:any) =>{
  console.log('编辑单元格确认=>', val.scope.row[val.item.prop]);
}
const close = (val:any) =>{
  console.log('编辑单元格关闭=>', val.scope.row[val.item.prop]);
}

// 编辑行
const rowEditConfirm = (scope:any) =>{
  console.log('编辑行确认=>', scope);
}
const rowEditCancel = (scope:any) =>{
  console.log('编辑行取消=>', scope);
}

// 分页
const curPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const getData = ()=>{
  axios.post('https://mock.apifox.cn/m1/2268695-0-default/api/list', {
    current: curPage.value,
    pageSize: pageSize.value
  }).then((res:any)=>{
    console.log(res);
    tableData.value = res.data.rows
    total.value = res.data.total
    
  })
}
onMounted(getData)
// 每页显示数据的条数
const sizeChange = (val:number) =>{
  pageSize.value = val
  getData()
  
}
// 更改当前页
const currentChange = (val:number) =>{
  curPage.value = val
  getData()
}

</script>


<style lang="scss" scoped>
  
</style>