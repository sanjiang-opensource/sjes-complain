<template>
    <div>
      <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <cell title="投诉时间" value="value" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="处理状态" value="value" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="单号" value="value" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="购买平台" value="value" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="购买门店" value="value" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="客户电话" value="value" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
        <cell title="投诉类型" value="value" >
          <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
      </group>
    </div>
</template>

<script>
import { Group, Cell, Scroller, Panel } from 'vux'

export default {
  components: {
    Group,
    Cell,
    Scroller,
    Panel
  },
  data () {
    return {
      value: '123'

    }
  }
}
</script>

<style>

</style>
