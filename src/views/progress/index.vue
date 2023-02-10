<template>
  <MProgress isAnmiate :percentage="60" />
  <br />
  <MProgress type="dashboard" isAnmiate :time="3000" :percentage="90" :color="colors" />
</template>


<script setup lang="ts">

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]

</script>


<style lang="scss" scoped>
</style>