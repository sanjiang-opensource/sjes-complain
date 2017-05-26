<template>
  <div>
    <x-header style="position: fixed;z-index: 9999;width: 100%;height: 50px;top:0px">投诉图片</x-header>
    <div style="display: flex;margin-top: 50px;flex-direction: column">
      <div v-for="src in list" style="text-align:center;">
        <!--<span style="font-size:20px;">Loading</span>-->
        <x-img :src="src" style="width: 100%;height: auto"></x-img>
      </div>
    </div>
  </div>
</template>

<script>
import {XImg, XHeader} from 'vux'

export default {
  components: {
    XImg,
    XHeader
  },
  data () {
    return {
      list: [
        'https://o5omsejde.qnssl.com/demo/test1.jpg',
        'https://o5omsejde.qnssl.com/demo/test2.jpg',
        'https://o5omsejde.qnssl.com/demo/test0.jpg',
        'https://o5omsejde.qnssl.com/demo/test4.jpg',
      ]
    }
  }
}
</script>

<style>

</style>
