<template>
  <div id="calendar" v-bind="$attrs">
  </div>
</template>


<script setup lang="ts">
import '@fullcalendar/core/vdom'
import { Calendar, EventClickArg } from '@fullcalendar/core'
import dayGrid from '@fullcalendar/daygrid'
import interaction, { DateClickArg } from '@fullcalendar/interaction'
import { onMounted, PropType, ref, watch } from 'vue'
import { EventItem } from './types'

const props = defineProps({
  // 语言
  locale: {
    type: String,
    default: 'zh-cn'
  },
  // 视图模式
  initalView: {
    type: String,
    default: 'dayGridMonth'
  },
  // 按钮文字
  buttonText: {
    type: Object,
    default: ()=>{
      return {
        today: '今天',
        month: '月',
        day: '日',
        preYear: '上一年',
        nextYear: '下一年',
        prev: '上一月',
        next: '下一月'
      }
    }
  },
  // 头部工具栏
  headerToolbar: {
    type:Object,
    default: ()=>{
      return {
        start: 'title',
        center: '',
        end: 'prev today next'
      }
    }
  },
  // 底部工具栏
  footerToolbar: {
    type: Object,
    default: ()=>{}
  },
  // 事件源
  events: {
    type: Array as PropType<EventItem[]>,
    default: ()=>[]
  },
  // 日历显示结束时间
  displayEventEnd: {
    type: Boolean,
    default: false
  },
  // 自定义渲染内容
  eventContent: {
    type: Function
  }
})

const emits = defineEmits(['dateClick', 'eventClick'])

// 日历实例
const calendar = ref<Calendar>()

// 渲染日历的方法
const renderCalendar =()=>{
  const el = document.getElementById('calendar')
  if(el) {
    calendar.value = new Calendar(el, {
      // 日历插件
      plugins:[dayGrid, interaction],
      locale: props.locale,
      initialView: props.initalView,
      buttonText: props.buttonText,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
      eventSources: [
        {
          // 渲染日历事件
          events(e, callback) {
            if(props.events.length) callback(props.events)
            else callback([])
          }
        }
      ],
      // 点击日历上某一天
      dateClick(info:DateClickArg) {
        emits('dateClick', info)
      },
      // 点击日历上的事件
      eventClick(info:EventClickArg) {
        emits('eventClick', info)
      },
      displayEventEnd: props.displayEventEnd,
      // 自定义渲染内容
      eventContent: props.eventContent
    }),
    calendar.value.render()
  }
}

onMounted(renderCalendar)

// 监听父组件传递的事件
watch(()=>props.events, ()=>{
  renderCalendar()
}, {deep: true})

</script>


<style lang="scss" scoped>
  
</style>