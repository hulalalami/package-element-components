<template>
  <MChooseTime @startChange="startChangeTime" @endChange="endChangeTime" :startOptions="startOptionsTime" :endOptions="endOptionsTime" />
  <br />
  <MChooseDate disableToday @startChange="startChangeDate" @endChange="endChangeDate" />
</template>


<script setup lang="ts">

interface endChangeTime {
  startTime: string,
  endTime: string
}
const startChangeTime = (val:string) =>{
  console.log('startChangeTime=>', val);
}
const endChangeTime = (val:endChangeTime) =>{
  console.log('endChangeTime=>', val);
}
const startOptionsTime = {
  effect: 'dark'
}
const endOptionsTime = {
  format: 'HH时mm分'
}

interface endChangeDate {
  startDate: Date,
  endDate: Date
}
const startChangeDate = (val:Date) =>{
  console.log('startChangeDate=>', val); 
}
const endChangeDate = (val:endChangeDate) =>{
  console.log('endChangeDate=>', val); 
}

</script>


<style lang="scss" scoped>
  
</style>