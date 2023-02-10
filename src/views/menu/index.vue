<template>
  <div class="container">
    <div class="menu1">
        <p>2层菜单</p>
        <MMenu style="width: 200px; margin-right: 100px;" :data="data1" name="a" index="b" icon="c" children="d" background-color="#995353" />
    </div>
    <div class="menu2">
      <p>无限层级菜单</p>
      <MInfinitMenu style="width: 200px; margin-right: 100px;" :data="data2" background-color="green" />
    </div>
  </div>

</template>


<script setup lang="ts">

const data1 = [
  {
    a: '导航1',
    b: '1',
    c: 'document'
  }, {
    a: '导航2',
    b: '2',
    c: 'document'
  }, {
    a: '导航3',
    b: '3',
    c: 'document',
    d: [
      {
        a: '导航3-1',
        b: '3-1',
      },
    ]
  },
]

const data2 = [
  {
    name: '导航1',
    index: '1',
    icon: 'document'
  }, {
    name: '导航2',
    index: '2',
    icon: 'document'
  }, {
    name: '导航3',
    index: '3',
    icon: 'document',
    children: [
      {
        name: '导航3-1',
        index: '3-1',
        icon: 'document',
        children: [
          {
            name: '导航3-1-1',
            index: '3-1-1',
            icon: 'document',
            children: [
              {
                name: '导航3-1-1-1',
                index: '3-1-1-1',
              },
            ]
          },
        ]
      },
    ]
  },
]

</script>


<style lang="scss" scoped>

.container {
  position: relative;
  .menu1 {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .menu2 {
    position: absolute;
    left: 300px;
    top: 10px;
  }
}


</style>