<template>
  <div id="app">
      <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
  }
</style>
<style lang="scss">
  @import "assets/list";
</style>
