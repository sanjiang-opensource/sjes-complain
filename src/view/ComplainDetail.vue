<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" style="position: fixed;width: 100%;height: 50px;top:0px;z-index: 10"
              @on-click-back="goBack">投诉详情
    </x-header>
    <div style="display: flex;flex-direction: column;z-index: 10;background-color: #eeeeee;margin-top: 50px">
      <div label-width="4.5em" label-margin-right="2em" label-align="right"
           style="background-color: white;display: flex;margin-bottom: 10px;flex-direction: column">
        <cell title="投诉时间 ：" :value="complainDetail.customerComplainWxModel.complainTime | timeToString" value-align="left">
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

      <divider style="display: flex">投诉内容</divider>
      <div style="background-color: #eeeeee;display: flex;margin-bottom: 10px;flex-direction: column">
        <cell :title="complainDetail.customerComplainWxModel.complainContent"
              style="word-break: break-all;background-color: white"></cell>
        <div v-if="showSwiper()">
          <divider>投诉照片</divider>
          <swiper height="250px" :list="complainDetail.customerComplainWxModel.imagePathLists" :loop="true"
                  dots-class="custom-bottom" dots-position="center"></swiper>
        </div>
      </div>

      <div v-if="isShowDetilList()">
        <divider style="display: flex">转单详情</divider>
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
          <x-input v-model="shopName" style="width: 25%;margin-left: 10px;height: 25px;background-color: #eeeeee" placeholder="输入商场名称"></x-input>
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
      @click.native="closeComplain">确认无效客诉
          </x-button>
          </div>

          </div>
          </div>
          </div>

          <div v-transfer-dom>
        <popup v-model="shopViewShow" position="bottom">
          <div style="background-color: #eeeeee;overflow-y: auto;height: 400px;">
            <div style="display: flex;flex-direction: row;position: relative;align-items: center;margin-bottom: 10px;background-color: white"
              v-for="info in content">

              <cell :title="info.shopId" :value="info.shopName" style="width:100%;height: 60px" @click.native="chooseShop(info.shopName, info.shopId)">
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
          Confirm,
          Popup
        } from 'vux'
        import {mapGetters} from 'vuex'
        import SubmitModel from '../utils/SubmitModel'
        import * as api from '../api/index'

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
            Confirm,
            Popup
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
              showAlert: false,
              detail: '',
              warn: false,
              warnInfo: '',
              content: []
            }
          },
          computed: mapGetters({
            complainDetail: 'complainDetail',
            workerId: 'workerId',
            message: 'message'
          }),
          mounted () {
            this.$store.dispatch('getComplainDetail', {id: this.$route.params.id, workerId: this.$route.params.workerId})
          },
          methods: {
            isClose () {
              let complainStat = this.complainDetail.customerComplainWxModel.complainStat
              let receiveDeptNum = this.complainDetail.customerComplainWxModel.receiveDeptNum
              let indexOf = this.complainDetail.shopIds.indexOf(receiveDeptNum)
              return indexOf >= 0 && complainStat === 1
            },
            isShowDetilList () {
              return this.complainDetail.complainResults.length !== 0
            },
            submitResult: function () {
              this.detail = '确认提交转单？'
              this.showAlert = true
            },
            closeComplain: function () {
              this.detail = '确认关闭客诉？'
              this.showAlert = true
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
                api.fetchSearchByShopName(this.shopName, 1, 20).then(res => {
                  this.content = res.content
                  if (this.content.length === 1) {
                    this.shopName = this.content[0].shopName
                    this.shopId = this.content[0].shopId
                  } else if (this.content.length === 0) {
                    this.warn = true
                    this.warnInfo = '该门店不存在'
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
              if (this.detail === '确认关闭客诉？') {
                this.warn = true
                if (this.result !== '' && this.turn === '') {
                  this.showAlert = false
                  var res = {}
                  res.result = this.result
                  res.id = this.$route.params.id
                  this.$store.dispatch('closeComplain', res)
                  this.warnInfo = this.message.msg
                } else {
                  this.warnInfo = '处理意见不能为空且不能勾选转单'
                }
              }
              if (this.detail === '确认提交转单？') {
                this.warn = true
                if (this.result === '') {
                  this.warn = true
                  this.warnInfo = '请将信息填写完整'
                } else {
                  this.showAlert = false
                  if (this.turn === '') {
                    this.shopName = this.complainDetail.customerComplainWxModel.receiveDept
                    this.shopId = this.complainDetail.customerComplainWxModel.receiveDeptNum
                  }
                  console.log(this.shopName, this.shopId)
                  let data = new SubmitModel(this.result, this.$route.params.id, this.shopName, this.shopId, this.turn)
                  this.$store.dispatch('submitResult', data)
                  this.warnInfo = this.message.msg
                }
              }
              if (this.detail === '请勾选转单按钮') {
                this.showAlert = false
              }
            },
            submitRes () {
              if (this.warnInfo === this.message.msg) {
                this.$router.push('/complain/?workerId=' + this.workerId)
                this.$destroy()
              }
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
