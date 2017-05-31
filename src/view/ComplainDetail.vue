<template>
  <div>
    <!--<divider style="display: flex;margin-bottom: 10px">投诉详情</divider>-->
    <x-header :left-options="{preventGoBack: true}" style="position: fixed;z-index: 9999;width: 100%;height: 50px;top:0px" @on-click-back="goBack">投诉详情</x-header>
    <div style="display: flex;margin-top: 50px;flex-direction: column">
      <div label-width="4.5em" label-margin-right="2em" label-align="right"
           style="background-color: white;display: flex;margin-bottom: 20px;flex-direction: column">
        <cell title="投诉时间 ：" :value="complainDetail.customerComplainWxModel.complainTimeStr" value-align="left">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="处理状态 ：" :value="complainDetail.customerComplainWxModel.complainStat | statusName"
              value-align="left">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="单号 ：" :value="complainDetail.customerComplainWxModel.orderId" value-align="left">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="购买平台 ：" :value="complainDetail.customerComplainWxModel.platform" value-align="left">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="购买门店 ：" :value="complainDetail.customerComplainWxModel.gateShop" value-align="left">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="客户电话 ：" :value="complainDetail.customerComplainWxModel.mobile" value-align="left">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="投诉类型 ：" :value="complainDetail.customerComplainWxModel.complainType" value-align="left">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
      </div>

      <divider style="display: flex;margin-bottom: 10px">投诉内容</divider>
      <div style="background-color: white;display: flex;margin-bottom: 20px;flex-direction: column">
        <cell :inline-desc="complainDetail.customerComplainWxModel.complainContent"
              style="word-break: break-all"></cell>
        <button style="width: 100%;height: 50px;background-color: aquamarine;font-size: 16px" @click="show=true">现场照片</button>
      </div>

      <divider style="display: flex;margin-bottom: 10px">转单详情</divider>
      <div style="height: 290px;background-color: #FBF9FE;overflow-y: auto;">
        <div class="box" v-for="info in complainDetail.complainResults">

          <cell title="投诉受理时间 ：" :value="info.acceptTimeStr" value-align="left" label-margin-left="2em"></cell>
          <cell title="处理门店/部门 ：" :value="info.receiveDept" value-align="left" label-margin-left="2em"></cell>
          <cell title="处理完成时间 ：" :value="info.finishTimeStr" value-align="left" label-margin-left="2em"></cell>
          <cell title="处理结果 ：" :value="info.result" value-align="left" label-margin-left="2em"></cell>
          <cell title="转单 ：" :value="info.turnDept" value-align="left" label-margin-left="2em"></cell>

        </div>
      </div>

      <div v-show="isClose(complainDetail.customerComplainWxModel.complainStat)">
        <divider style="display: flex;margin-bottom: 10px">客诉处理</divider>
        <div class="box">
          <cell title="投诉受理时间 ：" :value="complainDetail.customerComplainWxModel.acceptTimeStr" value-align="left"
                label-margin-left="2em"></cell>
          <cell title="处理门店/部门 ：" :value="complainDetail.customerComplainWxModel.receiveDept" value-align="left"
                label-margin-left="2em"></cell>
          <x-textarea v-model="result" title="处理结果：" :max="200"
                      style="border-style:double;border-width: 1px;border-color: #e1eeee"></x-textarea>
          <div style="display: flex;flex-direction: row;height: 100px;align-items: center;position: relative">
            <input v-model="turn" type="checkbox" style="height: 20px;width: 20px;margin-left: 20px">是否转单</input>
            <x-input v-model="shopName" style="margin-left: 10px;width: 100px;height: 25px;background-color: #eeeeee"></x-input>
            <button style="margin-left: 20px;width: 100px;height: 40px;background-color: cornflowerblue;font-size: 16px;color: white" @click="toShopList">
              选择商场
            </button>
          </div>
          <div
            style="display: flex;flex-direction: row;height: 80px;align-items: center;position: relative;background-color: #FBF9FE">
            <button
              style="margin-left: 30px;width: 40%;height: 50px;background-color: cornflowerblue;font-size: 18px;color: white" @click="submitResult">
              提交处理结果
            </button>
            <x-button
              style="margin-right: 30px;width: 40%;height: 50px;background-color: red;font-size: 18px;color: white">
              确认无效客诉
            </x-button>
          </div>

        </div>
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="show" class="dialog-demo">
        <div class="img-box">
          <div style="width: 100%;height: 100%" v-for="info in complainDetail.customerComplainWxModel.imagePathLists">
            <img src="info" style="max-width:100%;height: 100%">
          </div>
        </div>
        <div @click="show=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="shopViewShow" class="dialog-demo">
        <div style="background-color: #FBF9FE">
          <div style="display: flex;flex-direction: row;position: relative;align-items: center;margin-bottom: 10px;background-color: white" v-for="info in content">

            <cell :title="info.shopId" :value="info.shopName" style="width: 70%;height: 60px">
              <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
            </cell>

            <button style="width: 30%;height: 50px;font-size: 16px;margin-left: 0px;background-color: cornflowerblue" @click="chooseShop(info.shopName, info.shopId)">选择</button>

          </div>
        </div>
        <div @click="shopViewShow=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
  import {Group, Cell, Scroller, Divider, XTextarea, XInput, XButton, XHeader, XDialog, TransferDom} from 'vux'
  import {mapGetters} from 'vuex'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      Cell,
      Scroller,
      Divider,
      XTextarea,
      XInput,
      XButton,
      XHeader,
      XDialog
    },
    beforeCreate () {
      this.shopName = this.$store.state.shopName
    },
    data () {
      return {
        turn: '',
        result: '1',
        shopName: this.$store.state.shopName,
        shopId: null,
        show: false,
        shopViewShow: false
      }
    },
    computed: mapGetters({
      complainDetail: 'complainDetail',
      content: 'content',
      workerId: 'workerId'
    }),
    created () {
      this.$store.dispatch('getComplainDetail', this.$route.params.id)
    },
    mounted () {

    },
    methods: {
      isClose: function (value) {
        return value === 1
      },
      toShopList: function () {
        this.shopViewShow = true
        this.$store.dispatch('getShopList', this.shopName)
      },
      submitResult: function () {
        var data = {}
        data.result = this.result
        data.id = this.$route.params.id
        data.shopName = this.shopName
        data.shopId = this.shopId
        data.turn = this.turn
        this.$store.dispatch('submitResult', data)
      },
      goBack: function () {
        console.log(this.workerId)
        this.$router.push('/complain/?workerId=' + this.workerId)
        this.$destroy()
      },
      chooseShop: function (shopName, shopId) {
        this.shopViewShow = false
        this.shopName = shopName
        this.shopId = shopId
      }
    },
    destroyed () {
      this.$store.dispatch('CLEAN_DETAIL')
    }
  }
</script>

<style lang="less" scoped>
  @import '~vux/src/styles/close';
  .box {
    display: flex;
    /*height: 150px;*/
    flex-direction: column;
    position: relative;
    width: 100%;
    margin-bottom: 20px;
    background-color: white;
  }

  .dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow-y: auto;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
  }
</style>
