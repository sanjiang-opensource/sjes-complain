<template>
  <div>
    <x-header style="position: fixed;z-index: 9999;width: 100%;height: 50px;top:0px">商场列表</x-header>
    <div style="display: flex;margin-top: 50px;flex-direction: column">
      <div style="display: flex;flex-direction: row;position: relative;align-items: center;margin-bottom: 10px;background-color: white" v-for="info in content">

        <cell :title="info.shopId" :value="info.shopName" style="width: 70%;height: 60px">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>

        <button style="width: 30%;height: 50px;font-size: 16px;margin-left: 0px;background-color: cornflowerblue" @click="goBack(info.shopName, info.shopId)">选择</button>

      </div>
    </div>
  </div>
</template>

<script>
import {XImg, Cell, XButton, XHeader} from 'vux'
import {mapGetters} from 'vuex'

export default {
  components: {
    XImg,
    Cell,
    XButton,
    XHeader
  },
  computed: mapGetters({
    content: 'content'
  }),
  created () {
    this.$store.dispatch('getShopList', this.$route.params.shopName)
  },
  methods: {
    goBack: function (shopName, shopId) {
      this.$store.commit('editShopName', shopName)
      this.$destroy()
      this.$router.push({name: 'Detail', params: {shopName: shopName, shopId: shopId, id: this.$route.params.id}})
    }
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
