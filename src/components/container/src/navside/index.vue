<template>
  <MInfinitMenu vertical-expand-width="150px" :default-active="$route.path" router :collapse="collapse" :data="data" />
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { MenuItem } from '@/components/menu/src/types'
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps<{ collapse: boolean }>()

const tempArr: MenuItem[] = []
const data = computed(()=>{
  router.getRoutes().forEach(item=>{
    if(item.meta.name) {
      const {path, meta: {icon, name}} = item
      tempArr.push({icon: icon as string, name: name as string, index: path})
    }
  })
  return tempArr
})

console.log('getRoutes()=>', router.getRoutes());


</script>


<style lang="scss" scoped>

</style>