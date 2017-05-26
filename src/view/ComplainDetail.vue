<template>
  <div>
    <divider style="display: flex;margin-bottom: 10px">投诉详情</divider>
    <div label-width="4.5em" label-margin-right="2em" label-align="right"
         style="background-color: white;display: flex;margin-bottom: 20px;flex-direction: column">
      <cell title="投诉时间 ：" :value="complainDetail.customerComplainWxModel.complainTime" value-align="left">
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
      </cell>
      <cell title="处理状态 ：" :value="complainDetail.customerComplainWxModel.complainStat" value-align="left">
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
      <cell inline-desc="ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
            style="word-break: break-all"></cell>
      <cell title="现场照片" :onclick="toComplainImage" link="/Image"></cell>
    </div>

    <divider style="display: flex;margin-bottom: 10px">转单详情</divider>
    <div style="height: 300px;background-color: #FBF9FE;overflow-y: auto;">
      <div class="box" v-for="info in complainDetail.complainResults">

        <cell title="投诉受理时间 ：" :value="info.acceptTimeStr" value-align="left" label-margin-left="2em"></cell>
        <cell title="处理门店/部门 ：" :value="info.receiveDept" value-align="left" label-margin-left="2em"></cell>
        <cell title="处理完成时间 ：" :value="info.finishTimeStr" value-align="left" label-margin-left="2em"></cell>
        <cell title="处理结果 ：" :value="info.result" value-align="left" label-margin-left="2em"></cell>
        <cell title="转单 ：" :value="info.turnDept" value-align="left" label-margin-left="2em"></cell>

      </div>
    </div>

  </div>
</template>

<script>
  import {Group, Cell, Scroller, Divider} from 'vux'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      Group,
      Cell,
      Scroller,
      Divider
    },
//  data () {
//    return {
//      complain: {
//        complainDetail: {
//          complainTime: '2017-5-23',
//          complainStat: '待处理',
//          orderId: '123456',
//          platform: '淘宝',
//          gateShop: '胜丰商场',
//          mobile: '15757189922',
//          complainType: '商品质量',
//          complainContent: 'asdadasasasasasdsasafsf',
//          imagePaths: [
//            'https://o5omsejde.qnssl.com/demo/test1.jpg',
//            'https://o5omsejde.qnssl.com/demo/test2.jpg',
//            'https://o5omsejde.qnssl.com/demo/test0.jpg',
//            'https://o5omsejde.qnssl.com/demo/test4.jpg',
//          ],
//          contact: '123',
//          member: '是'
//        },
//        complainResults: [
//          {
//            receiveDept: '胜丰商场',
//            acceptTimeStr: '2017-03-30',
//            finishTimeStr: '2017-03-31',
//            result: '老包总有问题',
//            turn: true,
//            turnDept: '开明商场',
//            turnDeptNum: '00016'
//          },
//          {
//            receiveDept: '胜丰商场',
//            acceptTimeStr: '2017-03-30',
//            finishTimeStr: '2017-03-31',
//            result: '老包总有问题',
//            turn: true,
//            turnDept: '开明商场',
//            turnDeptNum: '00016'
//          }
//        ]
//      }
//    }
//  },

    computed: mapGetters({
      complainDetail: 'complainDetail'
    }),
    created () {
      this.$store.dispatch('getComplainDetail', this.$route.params.id)
    }

  }
</script>

<style>
  .box {
    display: flex;
    /*height: 150px;*/
    flex-direction: column;
    position: relative;
    width: 100%;
    margin-bottom: 20px;
    background-color: white;
  }
</style>
