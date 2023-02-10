<template>
  <div class="trend">
    <div class="text" :style="{color: ftextColor}">
      <!-- slot和text值同时传入，slot覆盖text -->
      <slot v-if="slots.default"></slot>
      <span v-else>{{text}}</span>
    </div>
    <div class="icon">
      <el-icon :style="{color: fIconColor}"><component :is="fIcon" /></el-icon>
    </div>
  </div>
</template>

<script lang="ts">
  enum upOrDownType {
    up = 'up',
    down = 'down'
  }
  enum upOrDownColorType {
    up = '#f5222d',
    down = '#52c41a'
  }
  enum iconType {
    up = 'ArrowUp',
    down = 'ArrowDown'
  }
</script>


<script setup lang="ts">
import { useSlots, computed, PropType } from 'vue'
const slots = useSlots()


const props = defineProps({
  // 标记当前趋势是上升(up)还是下降(down)
  type: {
    type: String as PropType<upOrDownType>,
    default: upOrDownType.up
  },
  text: {
    type: String,
  },
  textColor: {
    type: String as PropType<upOrDownColorType> || String,
  },
  // icon优先根据用户传入，再根据type判断up/down
  icon: {
    type: String as PropType<iconType> || String,
  },
  iconColor: {
    type: String as PropType<upOrDownColorType> || String,
  },
  // 优先级低于自定义
  reverseColor: {
    type: Boolean,
    default: false
  }
})

const ftextColor = computed(()=>{
  if(props.textColor) {
    return props.textColor
  } else {
    if(props.reverseColor) {
      if(props.type===upOrDownType.up) {
        return upOrDownColorType.down
      } else {
        return upOrDownColorType.up
      }
    } else {
      if(props.type===upOrDownType.up) {
        return upOrDownColorType.up
      } else {
        return upOrDownColorType.down
      }
    }
  }
})

const fIconColor = computed(()=>{
  if(props.iconColor) {
    return props.iconColor
  } else {
    if(props.reverseColor) {
      if(props.type===upOrDownType.up) {
        return upOrDownColorType.down
      } else {
        return upOrDownColorType.up
      }
    } else {
      if(props.type===upOrDownType.up) {
        return upOrDownColorType.up
      } else {
        return upOrDownColorType.down
      }
    }
  }
})

const fIcon = computed(()=>{
  if(props.icon) {
    return props.icon
  } else {
    return props.type===upOrDownType.up ? iconType.up : iconType.down
  }
})

</script>


<style lang="scss" scoped>
.trend {
  display: flex;
  align-items: center;
  margin-right: 10px;
  .text {
    margin-right: 4px;
  }
  .icon {
    line-height: 1;
  }
}

</style>