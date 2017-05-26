<template>
    <div>
      <!--<divider style="display: flex;margin-bottom: 10px">投诉详情</divider>-->
      <x-header style="position: fixed;z-index: 9999;width: 100%;height: 50px;top:0px">投诉详情</x-header>
      <div style="display: flex;margin-top: 50px;flex-direction: column">
        <div label-width="4.5em" label-margin-right="2em" label-align="right" style="background-color: white;display: flex;margin-bottom: 20px;flex-direction: column">
        <cell title="投诉时间 ：" :value="complainDetail.customerComplainWxModel.complainTimeStr" value-align="left" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="处理状态 ：" :value="complainDetail.customerComplainWxModel.complainStat" value-align="left" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="单号 ：" :value="complainDetail.customerComplainWxModel.orderId" value-align="left" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="购买平台 ：" :value="complainDetail.customerComplainWxModel.platform" value-align="left" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="购买门店 ：" :value="complainDetail.customerComplainWxModel.gateShop" value-align="left" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="客户电话 ：" :value="complainDetail.customerComplainWxModel.mobile" value-align="left" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="投诉类型 ：" :value="complainDetail.customerComplainWxModel.complainType" value-align="left" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
      </div>

      <divider style="display: flex;margin-bottom: 10px">投诉内容</divider>
      <div style="background-color: white;display: flex;margin-bottom: 20px;flex-direction: column">
        <cell inline-desc="ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss" style="word-break: break-all"></cell>
        <cell title="现场照片"  :onclick="toComplainImage" link="/image"></cell>
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

    <divider style="display: flex;margin-bottom: 10px">客诉处理</divider>
        <div class="box">

          <cell title="投诉受理时间 ：" :value="complainDetail.customerComplainWxModel.acceptTimeStr" value-align="left" label-margin-left="2em" ></cell>
          <cell title="处理门店/部门 ：" :value="complainDetail.customerComplainWxModel.receiveDept" value-align="left" label-margin-left="2em"></cell>
          <x-textarea title="处理结果：" :max="200" style="border-style:double;border-width: 1px;border-color: #e1eeee"></x-textarea>
          <div style="display: flex;flex-direction: row;height: 100px;align-items: center;position: relative">
            <input type="checkbox" style="height: 20px;width: 20px;margin-left: 20px">是否转单</input>
            <x-input style="margin-left: 10px;width: 100px;height: 25px;background-color: #eeeeee" ></x-input>
            <x-button style="margin-left: 20px;width: 100px;height: 40px;background-color: cornflowerblue;font-size: 14px">选择商场</x-button>
          </div>

        </div>
      </div>

    </div>
</template>

<script>
import { Group, Cell, Scroller, Divider , XTextarea, XInput, XButton, XHeader} from 'vux'
import { mapGetters } from 'vuex'

export default {
  components: {
    Group,
    Cell,
    Scroller,
    Divider,
  XTextarea,
XInput,
XButton,
XHeader
  },

  methods : {
      toComplainImage: function () {
        let imagePaths = complainDetail.imagePaths;
        this.$router.push({
          name: 'Image',
          param: {
              list: imagePaths
          }
        })

      }
  },
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
