<template>
  <div style="background-color: #eeeeee">
    <x-header style="position: fixed;z-index: 9999;width: 100%;height: 50px;top:0px" :left-options="{showBack: false}">投诉列表</x-header>
    <section class="grid" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" drapload-key="ascroll" drapload-up="loadMore ()">
      <!--<group v-show="showSelect" style="height: 50px;background-color: white">-->
        <!--<selector title="受理商场" placeholder="请选择受理商场" v-model="shopName" :options="shops" @on-change="changeShop"></selector>-->
      <!--</group>-->
      <item v-for="info in list" style="display: flex;flex-direction: column;margin-bottom: 20px;position: relative;width: 100%;background-color: white" :key="info.id" :item="info">
      </item>
      <Spinner :show="loading"></Spinner>
    </section>
    <toast v-model="show" type="success" :text="loadingText"></toast>
    <divider v-show="end" style="display: flex;">我是有底线的</divider>
  </div>
</template>

<script>
  import Spinner from '../components/Spinner.vue'
  import InfiniteScroll from 'vue-infinite-scroll'
  import {ViewBox, Cell, XHeader, Toast, Divider, Selector, Group} from 'vux'
  import Item from '../components/Item.vue'
  import * as api from '../api'
  import ComplainListModel from '../utils/ComplainListModel'

  export default {
    components: {
      ViewBox,
      Cell,
      XHeader,
      Spinner,
      Toast,
      Item,
      Divider,
      Selector,
      Group
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
        loading: true,
        show: false,
        loadingText: '数据加载完成',
        end: false,
        scroll: '',
        shopName: '',
        data: null,
        shops: [],
        showSelect: true
      }
    },
    created () {
      this.workerId = this.$route.query.workerId
      this.data = new ComplainListModel(this.shopName, this.workerId)
      this.$store.commit('INIT_WORKERID', this.workerId)
      this.$store.dispatch('getComplainList', this.data)
    },
    mounted () {
      this.page = this.$store.getters.page
      this.size = this.$store.getters.size
//      window.addEventListener('scroll', this.menu)
    },
    methods: {
      loadMore () {
        let page = this.list.length / this.size + 1
//        console.log(page)
        this.busy = true
        this.isScroll = true
        this.loading = true
        api.fetchSearchByWorkId(this.data, page, this.size)
          .then(res => {
            this.show = true
            this.list = this.list.concat(res.list)
            this.shops = this.shops.concat(res.shops)
            let totalCount = res.totalCount
            if (this.list.length < totalCount) {
              this.busy = false
            }
            let endListCount = totalCount - this.list.length
            if (endListCount === 0) {
              console.log(1)
              this.loadingText = '已加载全部数据'
              this.end = true
            }
            this.loading = false
            this.isScroll = false
          }, (error) => {
            this.show = true
            this.loading = false
            if (error.response.status === 500) {
              this.loadingText = '数据加载失败: 服务器接口异常'
            }
          })
//      },
//      changeShop () {
//        this.loadingText = '数据加载完成'
//        this.end = false
//        this.data.receiveDept = this.shopName
//        this.busy = true
//        this.isScroll = true
//        this.loading = true
//        api.fetchSearchByWorkId(this.data, 1, this.size)
//          .then(res => {
//            this.show = true
//            this.list = res.list
//            console.log(this.list)
//            this.shops = res.shops
//            let totalCount = res.totalCount
//            if (this.list.length < totalCount) {
//              this.busy = false
//            }
//            let endListCount = totalCount - this.list.length
//            if (endListCount === 0) {
//              this.loadingText = '已加载全部数据'
//              this.end = true
//            }
//            this.loading = false
//            this.isScroll = false
//          }, (error) => {
//            this.show = true
//            this.loading = false
//            if (error.response.status === 500) {
//              this.loadingText = '数据加载失败: 服务器接口异常'
//            }
//          })
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
