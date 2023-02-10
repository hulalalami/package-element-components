<template>
  <MNotification :value="100" :max="99" icon="ChatDotRound" >
    <template #default>
      <MNotificationList @clickItem="clickItem" @clickAction="clickAction" :list="list" :actions="actions" />
    </template>
  </MNotification>
</template>


<script setup lang="ts">
import { list, actions } from './data'

const clickItem = (val: any) =>{
  console.log(val);
}

const clickAction = (val: any) =>{
  console.log(val);
  
}

</script>


<style lang="scss" scoped>
  
</style>