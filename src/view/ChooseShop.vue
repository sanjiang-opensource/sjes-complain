<template>
  <div>
    <div style="display: flex;flex-direction: row;position: relative;align-items: center;margin-bottom: 10px;background-color: white" v-for="info in list">

      <cell :title="info.shopId" :value="info.shopName" style="width: 70%">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
      </cell>

      <x-button style="width: 30%;height: 80%;font-size: 16px;margin-left: 0px;background-color: cornflowerblue">选择</x-button>

    </div>
  </div>
</template>

<script>
import {XImg, Cell, XButton} from 'vux'
import {mapGetters} from 'vuex'

export default {
  components: {
    XImg,
    Cell,
    XButton
  },
  data () {
    return {
      list: []
    }
  },
  computed: mapGetters({
    list: 'content'
  }),
  created () {
    this.$store.dispatch('getShopList', '曙光')
  },
  methods: {
  }
}
</script>

<style>
  .box {
    display: flex;
    /*height: 150px;*/
    flex-direction: row;
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    background-color: white;
  }
</style>
