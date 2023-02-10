<template>
    <el-divider>正常趋势</el-divider>
    <div class="flex">
      <MTrend text="营业额" type="up"></MTrend>
      <MTrend text="销售额" type="down"></MTrend>
    </div>

    <el-divider>颜色翻转</el-divider>
    <div class="flex">
      
      <MTrend text="营业额" type="up" reverseColor></MTrend>
      <MTrend text="销售额" type="down" reverseColor></MTrend>
    </div>

    <el-divider>自定义图标颜色</el-divider>
    <div class="flex">
      <MTrend text="营业额" type="up" iconColor="blue"></MTrend>
      <MTrend text="销售额" type="down" iconColor="black"></MTrend>
    </div>

    <el-divider>自定义文字颜色</el-divider>
    <div class="flex">
      <MTrend text="营业额" type="up" textColor="blue"></MTrend>
      <MTrend text="销售额" type="down" textColor="yellow"></MTrend>
    </div>

    <el-divider>自定义图标</el-divider>
    <div class="flex">
      <MTrend type="up" icon="CaretTop">营业额</MTrend>
      <MTrend type="down" icon="CaretBottom">销售额</MTrend>
    </div>
</template>

<script lang='ts' setup>
</script>

<style lang='scss' scoped>
.flex {
  display: flex;
  div {
    margin-right: 10px;
  }
}
</style>