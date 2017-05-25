<template>
  <div >

    <!--<group style="width: 100%"  label-margin-right="2em" label-align="left" link="/Detail">-->
      <div class="box" v-for="info in list">

          <cell title="投诉时间 ：" value="2017-5-25" value-align="left" label-margin-left="2em" ></cell>
          <cell title="受理部门 ：" value="全渠道" value-align="left" label-margin-left="2em"></cell>
          <cell title="投诉内容 ：" inline-desc="老包总有问题老包总有问题老包总有问题老包总有问题老包总有问题老包总有问题老包总有问题老包总有问题老包总有问题老包总有问题" style="word-break: break-all "></cell>
          <div style="width: 100%;height: 1px;background-color: #e1e1e1"></div>
          <cell title="超时" value="处理中" style="height: 60px;color: red;" link="/Detail/2">
            <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../assets/logo.png">
          </cell>

      </div>
    <!--</group>-->

  </div>
</template>

<script>
import { Group, Cell} from 'vux'

export default {
  components: {
    Group,
    Cell
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
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题二',
        desc: '由各种',
        url: {
          path: '/component/radio',
          replace: false
        }
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题二',
        desc: '由各种',
        url: {
          path: '/component/radio',
          replace: false
        }
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
  },
  methods: {
      toDetail: function () {
        this.$router.push({
            path: '/Detail'
        })
      }
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
