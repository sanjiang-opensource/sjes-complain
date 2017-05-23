<template>
    <div>
      <panel li></panel>
    </div>
</template>

<script>
import { Group, Cell, Scroller, Panel} from 'vux'

export default {
  components: {
    Group,
    Cell,
    Scroller,
    Panel
  },
  data () {
    return {
      type: '1',
      list: [{
        title: '标题一',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
      }, {
        title: '标题二',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
      }],

    }
  }
}
</script>

<style>

</style>
