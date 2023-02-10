<template>
  <div class="list-tabs__item">
    <el-tabs>
      <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.title">
        <el-scrollbar max-height="300px">
          <ul>
            <li class="container" v-for="(item1, index1) in item.content" :key="index1"
              @click="clickItem(item1, index1)">
              <div class="avatar" v-if="item1.avatar">
                <el-avatar size="small" :src="item1.avatar"></el-avatar>
              </div>
              <div class="content">
                <div class="title">
                  <h4 v-if="item1.title">{{ item1.title }}</h4>
                  <el-tag v-if="item1.tag" size="small" :type="item1.tagType">{{ item1.tag }}</el-tag>
                </div>
                <div class="time" v-if="item1.desc">{{ item1.desc }}</div>
                <div class="time" v-if="item1.time">{{ item1.time }}</div>
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
    <div class="actions">
      <div class="a-item" :class="{'border': index !== actions.length-1}" v-for="(action, index) in actions" :key="index" @click="clickAction(action, index)">
        <el-icon class="a-icon">
          <component :is="action.icon"></component>
        </el-icon>
        <span>{{ action.text }}</span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { PropType } from 'vue'
import { ActionOptions, LsitOptions, ListItem } from './type';

defineProps({
  // 列表内容
  list: {
    type: Array as PropType<LsitOptions[]>,
    required: true
  },
  // 操作内容
  actions: {
    type: Array as PropType<ActionOptions[]>,
    default: () => []
  }
})
const emits = defineEmits(['clickItem', 'clickAction'])

const clickItem = (item: ListItem, index: number) => {
  emits('clickItem', { item, index })
}

const clickAction = (item: ActionOptions, index: number) => {
  emits('clickAction', { item, index })
}


</script>


<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;

  &:hover {
    background-color: #e6f6ff;
  }

  .avatar {
    flex: 1;
    display: flex;
  }

  .content {
    flex: 5;

    .title {
      display: flex;
      justify-content: space-between;
    }

    .time {
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
}

.actions {
  height: 50px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #eee;

  .a-item {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: #e6f6ff;
    }

    .a-icon {
      margin-right: 4px;
    }
  }
}

.border {
  border-right: 1px solid #eee;
}
</style>