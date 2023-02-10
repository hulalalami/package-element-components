<template>
  <MCalendar 
    class="calendar" 
    displayEventEnd 
    :events="events"
    @dateClick="dateClick" 
    @eventClick="eventClick"
    :eventContent="eventContent"
  />
</template>


<script setup lang="ts">
import { EventItem } from '@/components/calendar/src/types'
import { EventClickArg, EventContentArg } from '@fullcalendar/common';
import { DateClickArg } from '@fullcalendar/interaction';
import { ref } from 'vue'

// 日历事件
const events = ref<EventItem[]>([
  {
    title: '购物',
    start: '2022-08-26 00:00:00',
    end: '2022-08-26 23:59:00',
  }, {
    title: '旅游',
    start: '2022-08-01 08:00:00',
    end: '2022-08-07 16:00:00',
    editable: true
  }
])

// 点击单元格
const dateClick = (info:DateClickArg) =>{
  events.value.push({
    title: '学习',
    start: info.dateStr + ' 08:00:00',
    end: info.dateStr + ' 20:00:00'
  })
  console.log(info);
}

// 点击日历事件
const eventClick = (info: EventClickArg) =>{
  console.log(info);
} 

// 自定义渲染内容
const eventContent = (arg: EventContentArg) =>{
  console.log(arg);
  const el = document.createElement('div')
  const timeTextArr = arg.timeText.split(' - ')
  const start = timeTextArr[0]
  const end = timeTextArr[1]
  el.innerHTML = `
    <img src="src/assets/logo.png" style="width:30px;height:30px;" />
    <div>标题: ${arg.event._def.title}</div>
    <div>开始时间：${start}</div>
    <div>结束时间：${end}</div>
  `
  return {
    domNodes: [el]
  }
}

</script>


<style lang="scss" scoped>
.calendar {
  width: 800px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>