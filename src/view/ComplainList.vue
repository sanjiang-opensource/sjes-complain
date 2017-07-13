<template>
  <div style="background-color: #eeeeee">
    <section class="grid" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" drapload-key="ascroll" drapload-up="loadMore ()">
      <item v-for="info in list"
            style="display: flex;flex-direction: column;margin-bottom: 20px;position: relative;width: 100%;background-color: white" :item="info" :key="info"
            :link="'/complain/detail/'+info.id+'/'+workerId">
      </item>
      <Spinner :show="loading"></Spinner>
    </section>
    <toast v-model="show" type="success" :text="loadingText"></toast>
    <divider v-if="end" style="display: flex;">我是有底线的</divider>
    <tabbar style="position:fixed" >
      <tabbar-item v-for="info in complainStatus" :badge="info.statCounts" @on-item-click="statSelect(info.complainStat, info.order)" :key="info" >
        <img slot="icon" :src="info.imageUrl">
        <span slot="label">{{info.statName}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import Spinner from '../components/Spinner.vue'
  import InfiniteScroll from 'vue-infinite-scroll'
  import {ViewBox, Cell, XHeader, Toast, Divider, Selector, Group, Tabbar, TabbarItem} from 'vux'
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
      Group,
      Tabbar,
      TabbarItem
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
        complainStatus: [],
        showSelect: true
//        statuGroup: {},
//        statuKeys: [],
//        waitStat: true,
//        doingStat: false,
//        overStat: false,
//        invalidStat: false
      }
    },
    created () {
      this.workerId = this.$route.query.workerId
      this.data = new ComplainListModel(this.shopName, this.workerId, 1)
      this.$store.commit('INIT_WORKERID', this.workerId)
      this.$store.dispatch('getComplainList', this.data)
    },
    mounted () {
      this.page = this.$store.getters.page
      this.size = this.$store.getters.size
    },
    methods: {
      loadMore () {
        let page = this.list.length / this.size + 1
        this.busy = true
        this.isScroll = true
        this.loading = true
        api.fetchSearchByWorkId(this.data, page, this.size)
          .then(res => {
            if (page === 1) {
              this.complainStatus = this.complainStatus.concat(res.complainStatus)
            }
            this.show = true
            this.list = this.list.concat(res.list)
            this.shops = this.shops.concat(res.shops)
            let totalCount = res.totalCount
            if (this.list.length < totalCount) {
              this.busy = false
            }
            let endListCount = totalCount - this.list.length
            if (endListCount === 0) {
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
      },
      statSelect (status, order) {
        document.body.scrollTop = 0
        this.data.complainStat = status
        this.busy = false
        let length = this.complainStatus.length
        for (var i = 0; i < length; i++) {
          if (i === order - 1) {
            this.complainStatus[i].imageUrl = this.complainStatus[i].imageUrl.replace('-1', '')
          } else {
            if (this.complainStatus[i].imageUrl.indexOf('-1') > 0) {
            } else {
              this.complainStatus[i].imageUrl = this.complainStatus[i].imageUrl.substring(0, this.complainStatus[i].imageUrl.length - 4) + '-1.png'
            }
          }
        }
        api.fetchSearchByWorkId(this.data, 1, this.size).then(res => {
          this.list = res.list
        })
        this.$router.push('/complain/?workerId=' + this.workerId)
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
