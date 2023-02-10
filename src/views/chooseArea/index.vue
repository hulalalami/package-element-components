<template>
  <MChooseArea @change="changeArea"></MChooseArea>
</template>


<script setup lang="ts">

const changeArea = (data:object) =>{
  console.log(data);
  
}

</script>


<style lang="scss" scoped>
  
</style>