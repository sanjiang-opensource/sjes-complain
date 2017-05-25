<template>
  <div>
    <div v-for="src in list" style="background-color:yellow;text-align:center;">
      <!--<span style="font-size:20px;">Loading</span>-->
      <x-img :src="src" style="width: 100%;height: auto"></x-img>
    </div>
  </div>
</template>

<script>
import {XImg} from 'vux'

export default {
  components: {
    XImg
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
