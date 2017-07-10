<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" style="position: fixed;width: 100%;height: 50px;top:0px;z-index: 10"
              @on-click-back="goBack">客诉详情
    </x-header>
    <div onscroll="true"
         style="display: flex;flex-direction: column;z-index: 10;background-color: #eeeeee;margin-top: 50px">
      <div label-width="4.5em" label-margin-right="2em" label-align="right"
           style="background-color: white;display: flex;margin-bottom: 10px;flex-direction: column">
        <cell title="投诉时间 ：" :value="complainDetail.customerComplainWxModel.complainTime | timeToString"
              value-align="left">
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
        <cell title="客户电话 ：" :value="complainDetail.customerComplainWxModel.mobile" value-align="left" @click.native="call" is-link>
          <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../assets/mobile.png">
        </cell>
        <cell title="投诉类型 ：" :value="complainDetail.customerComplainWxModel.complainType" value-align="left">
          <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../assets/complain.png">
        </cell>
      </div>

      <divider style="display: flex">投诉内容</divider>
      <div style="background-color: #eeeeee;display: flex;margin-bottom: 10px;flex-direction: column">
        <cell :title="complainDetail.customerComplainWxModel.complainContent"
              style="word-break: break-all;background-color: white"></cell>
        <div v-if="showSwiper()">
          <divider>投诉照片</divider>
          <!--<swiper height="250px" :list="complainDetail.customerComplainWxModel.imagePathLists" :loop="true"-->
          <!--dots-class="custom-bottom" dots-position="center"></swiper>-->
          <swiper height="250px" dots-position="center">
            <swiper-item style="width: 100%" v-for="info in complainDetail.customerComplainWxModel.imagePathLists">
              <img :src="info.img" @click="clickImg($event, info.img)"/>
            </swiper-item>
          </swiper>
        </div>
      </div>

      <div v-if="isShowDetilList()">
        <div style="background-color: #FBF9FE">
          <div class="box" v-for="info in complainDetail.complainResults">

            <cell title="投诉受理时间 ：" :value="info.acceptTimeStr" value-align="left" label-margin-left="2em"></cell>
            <cell title="处理门店/部门 ：" :value="info.receiveDept" value-align="left" label-margin-left="2em"></cell>
            <cell title="处理完成时间 ：" :value="info.finishTimeStr" value-align="left" label-margin-left="2em"></cell>
            <cell title="处理结果 ：" :value="info.result" value-align="left" label-margin-left="2em"></cell>
            <cell title="转单 ：" :value="info.turnDept" value-align="left" label-margin-left="2em"></cell>

          </div>
        </div>
      </div>

      <div v-if="isClose()">
        <divider style="display: flex">客诉处理</divider>
        <div class="box" style="margin-bottom: 0px">
          <cell title="投诉受理时间 ：" :value="complainDetail.customerComplainWxModel.acceptTimeStr" value-align="left"
                label-margin-left="2em"></cell>
          <cell title="处理门店/部门 ：" :value="complainDetail.customerComplainWxModel.receiveDept" value-align="left"
                label-margin-left="2em"></cell>
          <x-textarea v-model="result" title="处理结果：" :max="200"
                      style="border-style:double;border-width: 1px;border-color: #e1eeee"></x-textarea>
          <div style="display: flex;flex-direction: row;height: 100px;align-items: center;position: relative">
            <input v-model="turn" type="checkbox" style="height: 20px;width: 20px;margin-left: 10px">转单</input>
            <x-input v-show="turn" v-model="shopName"
                     style="width: 25%;margin-left: 10px;height: 25px;background-color: #eeeeee"
                     placeholder="输入商场名称"></x-input>
            <x-button style="margin-left: 10px;margin-right: 10px;width: 30%;height: 40px;font-size: 14px;color: white"
                      @click.native="showSearchView" type="primary">选择商场
            </x-button>
          </div>
          <div
            style="display: flex;flex-direction: row;height: 80px;position: relative;background-color: #FBF9FE;padding: 10px">
            <x-button style="margin-top: 15px;width: 40%;height: 50px;font-size: 15px;color: white"
                      @click.native="submitResult" type="primary">提交处理结果
            </x-button>
            <x-button style="margin-top: 15px;width: 40%;height: 50px;font-size: 15px;color: white" type="warn"
                      @click.native="closeComplain">确认无效投诉
            </x-button>
          </div>

        </div>
      </div>
    </div>

    <div v-transfer-dom>
      <popup v-model="shopViewShow" position="bottom">
        <div style="background-color: #eeeeee;overflow-y: auto;height: 400px;">
          <div
            style="display: flex;flex-direction: row;position: relative;align-items: center;margin-bottom: 10px;background-color: white"
            v-for="info in content">

            <cell :title="info.shopId" :value="info.shopName" style="width:100%;height: 60px"
                  @click.native="chooseShop(info.shopName, info.shopId)">
              <img slot="icon" width="30" style="display:block;margin-right:5px;" src="../assets/shop.png">
            </cell>

          </div>
        </div>
        <div @click="shopViewShow=false" style="display: flex;justify-content: center">
          <span class="vux-close"></span>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showAlert"
               title="操作提示" @on-confirm="confirm">
        <p style="text-align:center;">{{ detail }}</p>
      </confirm>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showImg" class="dialog-demo">
        <croppa v-model="myCroppa" :showRemoveButton="false" :width="400" :height="400" v-if="showImg">
          <img slot="initial" :src="imgUrl"/>
        </croppa>
        <div @click="showImg=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
      <confirm v-model="warn"
               title="操作提示" @on-confirm="submitRes">
        <p style="text-align:center;">{{ warnInfo }}</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import {
    Group,
    Cell,
    Scroller,
    Divider,
    XTextarea,
    XInput,
    XButton,
    XHeader,
    XDialog,
    TransferDom,
    Alert,
    Swiper,
    SwiperItem,
    Confirm,
    Popup
  } from 'vux'
  import {mapGetters} from 'vuex'
  import SubmitModel from '../utils/SubmitModel'
//  import Croppa from 'vue-croppa'
  import 'vue-croppa/dist/vue-croppa.css'

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
      Swiper,
      SwiperItem,
      Confirm,
      Popup
//      Croppa
    },
    beforeCreate () {
      this.shopName = this.$store.state.shopName
    },
    data () {
      return {
        imgUrl: '',
        showImg: false,
        turn: false,
        result: '',
        shopName: this.$store.state.shopName,
        shopId: null,
        show: false,
        shopViewShow: false,
        showAlert: false,
        detail: '',
        warn: false,
        dealResult: false,
        warnInfo: '',
        content: [],
        complainType: true,
        isSubmit: false,
        complainDetail: {}
      }
    },
    computed: mapGetters({
//      complainDetail: 'complainDetail',
      workerId: 'workerId',
      message: 'message'
    }),
    created () {
      console.log(this.complainDetail)
      this.$store.dispatch('getComplainDetail', {id: this.$route.params.id, workerId: this.$route.params.workerId}).then(res => {
        this.complainDetail = res
      })
      this.warnInfo = ''
      console.log(11)
    },
    methods: {
      isClose () {
        let complainStat = this.complainDetail.customerComplainWxModel.complainStat
        let receiveDeptNum = this.complainDetail.customerComplainWxModel.receiveDeptNum
        let indexOf = this.complainDetail.shopIds.indexOf(receiveDeptNum)
        return indexOf >= 0 && (complainStat === 1 || complainStat === 4)
      },
      isShowDetilList () {
        return this.complainDetail.complainResults.length !== 0
      },
      submitResult: function () {
        this.showAlert = true
        if (this.result === '') {
          this.detail = '请填写处理结果'
        } else {
          if (this.turn === true && this.shopId === null) {
            this.detail = '转单时必须选择门店'
          } else if (this.turn === false && this.shopId === null) {
            this.detail = '确认提交处理？'
            this.complainType = true
            this.isSubmit = true
          } else {
            this.detail = '确认提交转单？'
            this.complainType = true
            this.isSubmit = true
          }
        }
      },
      closeComplain: function () {
        this.showAlert = true
        if (this.result === '') {
          this.detail = '处理意见不能为空'
        } else {
          if (this.turn === true) {
            this.detail = '关闭客诉不能勾选转单'
          } else {
            this.complainType = false
            this.detail = '确认关闭客诉？'
            this.isSubmit = true
          }
        }
      },
      goBack: function () {
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
          this.$store.dispatch('getShopList', this.shopName, 1, 20).then(res => {
            this.content = res.content
            if (this.content.length === 1) {
              this.shopName = this.content[0].shopName
              this.shopId = this.content[0].shopId
            } else if (this.content.length === 0) {
              this.showAlert = true
              this.detail = '该门店不存在'
            } else {
              this.shopViewShow = true
            }
          })
        } else {
          this.detail = '请勾选转单按钮'
          this.showAlert = true
        }
      },
      showSwiper () {
        return this.complainDetail.customerComplainWxModel.imagePaths !== ''
      },
      confirm () {
        if (this.isSubmit === false) {
          this.showAlert = false
        } else {
          if (this.complainType) {
            if (this.turn === '') {
              this.shopName = this.complainDetail.customerComplainWxModel.receiveDept
              this.shopId = this.complainDetail.customerComplainWxModel.receiveDeptNum
              this.turn = false
            }
            let data = new SubmitModel(this.result, this.$route.params.id, this.shopName, this.shopId, this.turn)
            this.$store.dispatch('submitResult', data).then(data => {
              this.warnInfo = data.msg
              this.warn = true
              this.dealResult = data.success
            })
          } else {
            var res = {}
            res.result = this.result
            res.id = this.$route.params.id
            this.$store.dispatch('closeComplain', res).then(data => {
              this.warnInfo = data.msg
              this.warn = true
              this.dealResult = data.success
            })
          }
        }
      },
      submitRes () {
        if (this.dealResult) {
          this.$router.push('/complain/?workerId=' + this.workerId)
          this.$destroy()
        }
      },
      clickImg (e, imgUrl) {
        this.showImg = true
        // 获取当前图片地址
        this.imgUrl = imgUrl
      },
      call () {
        console.log(1)
        window.location.href = 'tel://' + this.complainDetail.customerComplainWxModel.mobile
      }
    },
    destroyed () {
//            this.$store.dispatch('CLEAN_DETAIL')
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
    margin-bottom: 10px;
    background-color: white;
  }

  .dialog-demo {
    .weui-dialog {
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
