<template>
  <div>
    <x-header style="position: fixed;z-index: 9999;width: 100%;height: 50px;top:0px">投诉详情</x-header>
    <section class="grid" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div v-for="info in list" style="display: flex;flex-direction: column;margin-bottom: 20px;position: relative;width: 100%;background-color: white">
        <cell title="投诉时间 ：" :value="timeToString(info.complainTime)" value-align="left" label-margin-left="2em"></cell>
        <cell title="受理部门 ：" :value="info.receiveDept" value-align="left" label-margin-left="2em"></cell>
        <cell title="投诉内容 ：" :inline-desc="info.complainContent"
              style="word-break: break-all "></cell>
        <div style="width: 100%;height: 1px;background-color: #e1e1e1"></div>
        <cell :title="getOverTimeName(info.overTime)" :value="getStatusName(info.complainStat)" style="height: 60px;color: red;" :link="'/Detail/'+info.id">
          <img slot="icon" width="25" style="display:block;margin-right:5px;" src="../assets/logo.png">
        </cell>
      </div>
      <Spinner :show="loading"></Spinner>
      <!--<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" spinner="circles">-->
          <!--<span slot="no-more">-->
           <!--数据加载完毕！-->
          <!--</span>-->
      <!--</infinite-loading>-->

    </section>
  </div>



</template>

<script>
//  import InfiniteLoading from 'vue-infinite-loading'
  import Spinner from '../components/Spinner.vue'
  import InfiniteScroll from 'vue-infinite-scroll'
  import {ViewBox, Cell, XHeader} from 'vux'
  import * as api from '../api'

  export default {
    components: {
      ViewBox,
      Cell,
      XHeader,
      Spinner
    },
    directives: {InfiniteScroll},
    data () {
      return {
        header: '',
        isScroll: false,
        busy: false,
        workerId: null,
        list: [],
        footer: '查看更多',
        items: [
          {messgae: ''}
        ],
        loading: true
      }
    },
    mounted () {
      this.workerId = this.$route.params.workerId
      this.page = this.$route.params.page
      this.size = this.$route.params.size
    },
    computed: {
    },
    methods: {
      getStatusName: function (value) {
        let status = ''
        if (value === 1) {
          status = '待处理'
        } else if (value === 2) {
          status = '已完成'
        } else {
          status = '已关闭'
        }
        return status
      },
      getOverTimeName: function (value) {
        let overTimeName = ''
        if (value === 1) {
          overTimeName = '超时'
        } else {
          overTimeName = '未超时'
        }
        return overTimeName
      },
      loadMore () {
        let page = this.list.length / this.size + 1
        this.busy = true
        this.isScroll = true
        api.fetchSearchByWorkId(this.workerId, page, this.size)
          .then(res => {
            this.list = this.list.concat(res.list)
            let totalCount = res.totalCount
            if (this.list.length < totalCount) {
              this.busy = false
              console.log(this.busy)
            }
            this.loading = false
            this.isScroll = false
          })
      },
//      onInfinite () {
//        this.page = this.list.length / this.size + 1
//        api.fetchSearchByWorkId(this.workerId, this.page, this.size)
//          .then((res) => {
//            if (res.list.length) {
//              this.list = this.list.concat(res.list)
//              this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
//              let totalCount = res.totalCount
//              if (this.list.length - totalCount === 0) {
//                this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
//              }
//            } else {
//              this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
//            }
//          })
//      },
      timeToString (value) {
        if (value !== '') {
          return value[0] + '-' + value[1] + '-' + value[2] + ' ' + value[3] + ':' + value[4] + ':' + (value[5] === undefined ? '00' : value[5])
        }
      }
    },
    destoryed () {
      this.$store.dispatch('CLEAN_LIST')
    }
  }
</script>


<style scoped>
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
