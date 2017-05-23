<template>
  <div>
    <scroller v-for="">

       <cell title="啦啦啦">

       </cell>

    </scroller>
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
      header:"",
      list: [{
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题一',
        desc: '由各种。',
        url: '/component/cell'
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题二',
        desc: '由各种',
        url: {
          path: '/component/radio',
          replace: false
        }
      }],
      footer:"查看更多",
      items:[
        {messgae:""}
      ]
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
