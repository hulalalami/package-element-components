<template>
  <MChooseCity @chooseCity="chooseCity"/>
</template>


<script setup lang="ts">
import { cityValue } from '@/components/chooseCity/src/types'

const chooseCity = (val: cityValue|string) => {
  console.log(val);
}

</script>


<style lang="scss" scoped>
  
</style>