<template>
  <div style="height: 100%">
    <view-box ref="viewBox">
      <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <cell title="投诉时间" value="value">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="处理状态" value="value">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="单号" :value="complainDetail.customerComplainWxModel.orderId">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="购买平台" :value="complainDetail.customerComplainWxModel.platform">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="购买门店" value="value">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="客户电话" value="value">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="投诉类型" value="value">
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
      </group>
    </view-box>
  </div>
</template>

<script>
  import {Group, Cell, Scroller, Panel, ViewBox} from 'vux'
  import {mapGetters} from 'vuex'

  export default {
    name: 'complain',
    components: {
      Group,
      Cell,
      Scroller,
      Panel,
      ViewBox
    },
    computed: mapGetters({
      complainDetail: 'complainDetail'
    }),
    created () {
      this.$store.dispatch('getComplainDetail')
    }
  }
</script>

<style>

</style>
