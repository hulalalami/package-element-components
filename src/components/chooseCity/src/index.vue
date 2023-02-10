<template>
  <el-popover v-model:visible="visible" placement="bottom-start" :width="430" trigger="click">
    <template #reference>
      <div class="result">
        <span>{{ result }}</span>
        <el-icon class="icon" :class="{ rolate: visible }"><ArrowUp /></el-icon>
      </div>
    </template>
    <div class="container">
      <el-row>
        <el-col :span="10">
          <el-radio-group v-model="radioValue">
            <el-radio-button label="按城市" />
            <el-radio-button label="按省份" />
          </el-radio-group>
        </el-col>
        <el-col :span="14">
          <el-select v-model="selectValue" filterable :filter-method="filterMethod" placeholder="请选择城市" @change="changeSelect" >
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-col>
      </el-row>
      <div class="tab">
        <template v-if="radioValue==='按城市'">
          <el-tag class="city-captail" v-for="(city, key) in cities" :key="key" @click="clickChat(key)">{{key}}</el-tag>
          <el-scrollbar max-height="300px">
            <template v-for="(city, key) in cities" :key="key">
              <el-row style="margin-bottom: 10px;" :id="key">
                <el-col :span="2">{{key}}:</el-col>
                <el-col :span="22">
                  <span class="city" v-for="item in city" :key="item.id" @click="clickCity(item)">{{item.name}}</span>
                </el-col>
              </el-row>
            </template>
          </el-scrollbar>
        </template>
        <template v-else>
          <el-tag class="province-captail" v-for="captail in Object.keys(province)" :key="captail" @click="clickChat(captail)">{{captail}}</el-tag>
          <el-scrollbar max-height="300px">
            <template v-for="item in Object.values(province)">
              <template v-for="item1 in item" >
                <el-row style="margin-bottom: 10px;" :id="item1.id">
                  <el-col :span="3">{{item1.name}}:</el-col>
                  <el-col :span="21">
                    <span class="city" v-for="item2 in item1.data" :key="item2" @click="clickProvince(item2)">{{item2}}</span>
                  </el-col>
                </el-row>
              </template>
            </template>
          </el-scrollbar>
        </template>
      </div>
    </div>
  </el-popover>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import city from '../lib/city'
import province from '../lib/province.json'
import { cityValue } from './types'

// 弹出层是否显示
const visible = ref<Boolean>(false)
// 最终选择结果
const result = ref<String>('请选择')
// 单选框城市/省份选择
const radioValue = ref<String>('按城市')
// 搜索下拉框值
const selectValue = ref<String>('')
// 搜索下拉框选项
const options = ref<cityValue[]>([])
// 搜索框被选中的临时数据
let temp:cityValue
// 导入的cities数据
const cities = ref(city.cities)

const emits = defineEmits(['chooseCity'])

// 按城市选择，点击城市
const clickCity = (item:cityValue)=>{
  result.value = item.name
  emits('chooseCity', item)
  visible.value = false
}

// 按省份选择，点击城市
const clickProvince = (item:String) =>{
  result.value = item
  emits('chooseCity', item)
  visible.value = false
}

// 按城市/省份选择，点击字母
const clickChat = (key:String) =>{
  const el = document.getElementById(`${key}`)
  if(el) el.scrollIntoView()
}

// 选择框过滤
const filterMethod = (val:string) =>{
  options.value = Object.values(cities.value).flat(2)
  // 按拼音和中文过滤
  options.value = options.value.filter(item=>{
    return item.name.includes(val) || item.spell.includes(val)
  })
}

// 搜索框值变化
const changeSelect = (val:number)=>{
  // !是非空断言
  temp = options.value.find(item=>item.id===val)!
  if(temp) {
    result.value = temp.name
    emits('chooseCity', temp)
  } 
}

// 当弹出层关闭时，清空搜索框的值
watch(()=>visible.value, val=>{
  if(!val) {
    selectValue.value = ''
  }
})

onMounted(()=>{
  options.value = Object.values(cities.value).flat(2)
})

</script>


<style lang="scss" scoped>
.result {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
}

.icon {
  margin-left: 4px;
  transition: all 0.25s;
}

.rolate {
  transform: rotate(180deg);
}

.tab {
  margin: 12px -6px 0 0;
  .city-captail,
  .province-captail,
  .city
  {
    margin-right: 6px;
    margin-bottom: 6px;
    cursor: pointer;
  }
  .city {
    display: inline-block;
  }
}
</style>