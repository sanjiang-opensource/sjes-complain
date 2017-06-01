<template>
  <div>
    <!--<divider style="display: flex;margin-bottom: 10px">投诉详情</divider>-->
    <x-header :left-options="{preventGoBack: true}" style="position: fixed;z-index: 9999;width: 100%;height: 50px;top:0px" @on-click-back="goBack">投诉详情</x-header>
    <div style="display: flex;margin-top: 50px;flex-direction: column">
      <div label-width="4.5em" label-margin-right="2em" label-align="right"
           style="background-color: white;display: flex;margin-bottom: 20px;flex-direction: column">
        <cell title="投诉时间 ：" :value="complainDetail.customerComplainWxModel.complainTimeStr" value-align="left">
          <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../assets/date.png">
        </cell>
        <cell title="处理状态 ：" :value="complainDetail.customerComplainWxModel.complainStat | statusName"
              value-align="left">
          <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../assets/state.png">
        </cell>
        <cell title="单号 ：" :value="complainDetail.customerComplainWxModel.orderId" value-align="left">
          <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../assets/order.png">
        </cell>
        <cell title="购买平台 ：" :value="complainDetail.customerComplainWxModel.platform" value-align="left">
          <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../assets/platform.png">
        </cell>
        <cell title="购买门店 ：" :value="complainDetail.customerComplainWxModel.gateShop" value-align="left">
          <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../assets/shop.png">
        </cell>
        <cell title="客户电话 ：" :value="complainDetail.customerComplainWxModel.mobile" value-align="left">
          <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../assets/mobile.png">
        </cell>
        <cell title="投诉类型 ：" :value="complainDetail.customerComplainWxModel.complainType" value-align="left">
          <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../assets/complain.png">
        </cell>
      </div>

      <divider style="display: flex;margin-bottom: 10px">投诉内容</divider>
      <div style="background-color: white;display: flex;margin-bottom: 20px;flex-direction: column">
        <cell :title="complainDetail.customerComplainWxModel.complainContent" style="word-break: break-all" ></cell>
        <div v-show="showSwiper(complainDetail.customerComplainWxModel.imagePathLists)">
          <divider>投诉照片</divider>
          <swiper height="250px" :list="complainDetail.customerComplainWxModel.imagePathLists" loop="true" dots-class="custom-bottom" dots-position="center"></swiper>
        </div>
      </div>

      <div v-show="isShowDetilList(complainDetail.complainResults)">
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
      </div>

      <div v-show="isClose(complainDetail.customerComplainWxModel.complainStat)">
        <divider style="display: flex;margin-bottom: 10px">客诉处理</divider>
        <div class="box">
          <cell title="投诉受理时间 ：" :value="complainDetail.customerComplainWxModel.acceptTimeStr" value-align="left" label-margin-left="2em"></cell>
          <cell title="处理门店/部门 ：" :value="complainDetail.customerComplainWxModel.receiveDept" value-align="left" label-margin-left="2em"></cell>
          <x-textarea v-model="result" title="处理结果：" :max="200" style="border-style:double;border-width: 1px;border-color: #e1eeee"></x-textarea>
          <div style="display: flex;flex-direction: row;height: 100px;align-items: center;position: relative">
            <input v-model="turn" type="checkbox" style="height: 20px;width: 20px;margin-left: 20px">是否转单</input>
            <x-input v-model="shopName" style="margin-left: 10px;width: 100px;height: 25px;background-color: #eeeeee"></x-input>
            <x-button style="margin-left: 20px;width: 100px;height: 40px;font-size: 16px;color: white" @click.native="showSearchView" type="primary">选择商场</x-button>
          </div>
          <div style="display: flex;flex-direction: row;height: 80px;position: relative;background-color: #FBF9FE;padding: 10px">
            <x-button style="margin-top: 15px;width: 40%;height: 50px;font-size: 18px;color: white" @click.native="submitResult" type="primary">提交处理结果</x-button>
            <x-button style="margin-top: 15px;width: 40%;height: 50px;font-size: 18px;color: white" type="warn" @click.native="closeComplain">确认无效客诉</x-button>
          </div>

        </div>
      </div>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="shopViewShow" class="dialog-demo">
        <div style="display: flex;flex-direction: row;align-items: center;position: relative;padding: 10px;background-color: #eeeeee">
          <x-input v-model="shopName" style="margin-left: 10px;width: 55%;height: 25px;background-color: white;border-color: #9b9b9b;border-style:solid; border-width:1px;"></x-input>
          <x-button style="margin-left: 5px;width: 100px;height: 40px;font-size: 16px;color: white" @click.native="toShopList" type="primary">查询</x-button>
        </div>
        <div style="background-color: #eeeeee;overflow-y: auto;height: 400px;">
          <div style="display: flex;flex-direction: row;position: relative;align-items: center;margin-bottom: 10px;background-color: white" v-for="info in content">

            <cell :title="info.shopId" :value="info.shopName" style="width: 60%;height: 60px">
              <img slot="icon" width="30" style="display:block;margin-right:5px;" src="../assets/shop.png">
            </cell>

            <x-button style="width: 25%;height: 40px;font-size: 16px;margin-right: 10px" @click.native="chooseShop(info.shopName, info.shopId)" type="primary">选择</x-button>

          </div>
        </div>
        <div @click="shopViewShow=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <alert v-model="showAlert" title="选择失败" content="请勾选转单"></alert>
    </div>
  </div>
</template>

<script>
  import {Group, Cell, Scroller, Divider, XTextarea, XInput, XButton, XHeader, XDialog, TransferDom, Alert, Swiper} from 'vux'
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
      XDialog,
      Alert,
      Swiper
    },
    beforeCreate () {
      this.shopName = this.$store.state.shopName
    },
    data () {
      return {
        turn: '',
        result: '',
        shopName: this.$store.state.shopName,
        shopId: null,
        show: false,
        shopViewShow: false,
        showAlert: false
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
      isShowDetilList: function (value) {
        let isShow = true
        if (value.length === 0) {
          isShow = false
        }
        return isShow
      },
      toShopList: function () {
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
        this.$router.push('/complain/?workerId=' + this.workerId)
        this.$destroy()
      },
      closeComplain: function () {
        var res = {}
        res.result = this.result
        res.id = this.$route.params.id
        this.$store.dispatch('closeComplain', res)
        this.$router.push('/complain/?workerId=' + this.workerId)
        this.$destroy()
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
      },
      showSearchView: function () {
        if (this.turn) {
          this.shopViewShow = true
        } else {
          this.showAlert = true
        }
      },
      showSwiper: function (value) {
        let isShow = true
        if (value[0].img === '') {
          isShow = false
        }
        return isShow
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
