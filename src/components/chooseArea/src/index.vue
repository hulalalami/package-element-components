<template>
  <div>
    <el-select clearable placeholder="请选择省份" v-model="province">
      <el-option v-for="item in areas" :key="item.code" :label="item.name" :value="item.code"></el-option>
    </el-select>
    <el-select clearable :disabled="!province" placeholder="请选择城市" v-model="city">
      <el-option v-for="item in selectCity" :key="item.code" :label="item.name" :value="item.code"></el-option>
    </el-select>
    <el-select clearable :disabled="!province || !city" placeholder="请选择区域" v-model="area">
      <el-option v-for="item in selectArea" :key="item.code" :label="item.name" :value="item.code"></el-option>
    </el-select>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import allAreas from '../lib/pcas-code.json'

export interface AreaItem {
  name: string,
  code: string,
  children?: AreaItem[]
}
export interface Data {
  name: string,
  code: string
}

const areas = reactive(allAreas)

// 对应code值
const province = ref<string>('')
const city = ref<string>('')
const area = ref<string>('')

// 对应的数组
const selectCity = ref<AreaItem[]>([])
const selectArea = ref<AreaItem[]>([])

const emits = defineEmits(['change'])

// 监听选择省份
watch(() => province.value, val => {
  if (val) {
    // !.是ts的非空断言
    let cities = areas.find(item => item.code === province.value)!.children
    selectCity.value = cities
  }
  city.value = ''
  area.value = ''
})
// 监听选择城市
watch(() => city.value, val => {
  if (val) {
    let area = selectCity.value.find(item => item.code === city.value)!.children!
    selectArea.value = area
  }
  area.value = ''
})

// 监听区域
watch(() => area.value, val => {
  if (val) {
    const provinceData: Data = {
      code: province.value,
      name: allAreas.find(item => item.code === province.value)!.name
    }
    const cityData: Data = {
      code: city.value,
      name: selectCity.value.find(item => item.code === city.value)!.name
    }
    const areaData: Data = {
      code: val,
      name: selectArea.value.find(item => item.code === val)!.name
    }
    emits('change', {
      province: {
        code: provinceData.code,
        name: provinceData.name
      },
      city: {
        code: cityData.code,
        name: cityData.name
      },
      area: {
        code: areaData.code,
        name: areaData.name
      }
    })
  }
})

</script>


<style lang="scss" scoped>
.el-select {
  margin: 0 10px;
}
</style>