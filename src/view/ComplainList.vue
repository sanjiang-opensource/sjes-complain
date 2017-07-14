<template>
  <div style="background-color: #eeeeee">
    <section class="grid" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" drapload-key="ascroll" drapload-up="loadMore ()">
      <!--<group v-show="showSelect" style="height: 50px;background-color: white">-->
        <!--<selector title="受理商场" placeholder="请选择受理商场" v-model="shopName" :options="shops" @on-change="changeShop"></selector>-->
      <!--</group>-->
      <item v-for="info in list"
            style="display: flex;flex-direction: column;margin-bottom: 20px;position: relative;width: 100%;background-color: white" :item="info" :key="info"
            :link="'/complain/detail/'+info.id+'/'+workerId">
      </item>
      <Spinner :show="loading"></Spinner>
    </section>
    <toast v-model="show" type="success" :text="loadingText"></toast>
    <divider v-if="end" style="display: flex;">我是有底线的</divider>
    <tabbar style="position:fixed">
      <tabbar-item v-for="(info, index) in complainStatus" :badge="info.statCounts | numberToString" @on-item-click="statSelect(info.complainStat, info.order)" :key="info"
                   :selected="selected === (index + 1)">
        <img slot="icon" :src="info.imageUrl">
        <img slot="icon-active" :src="info.imageUrl  | dealImageUrl">
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
        showSelect: true,
        selected: 1,
        flag: true
      }
    },
    created () {
//      document.body.scrollTop = this.$store.getters.scroll
      this.workerId = this.$route.query.workerId
      this.data = new ComplainListModel(this.shopName, this.workerId, 1)
      this.$store.commit('INIT_WORKERID', this.workerId)
      this.selected = this.$store.getters.newIndex
    },
    mounted () {
      this.page = this.$store.getters.page
      this.size = this.$store.getters.size
    },
    methods: {
      loadMore () {
        if (this.flag) {
          let page = this.list.length / this.size + 1
          this.busy = true
          this.isScroll = true
          this.loading = true
          let complainStat = 1
          if (this.selected === 2) {
            complainStat = 4
          } else if (this.selected === 3) {
            complainStat = 2
          } else if (this.selected === 4) {
            complainStat = 3
          }
          this.data.complainStat = complainStat
          api.fetchSearchByWorkId(this.data, page, this.size)
            .then(res => {
              if (page === 1) {
                this.complainStatus = []
                this.complainStatus = this.complainStatus.concat(res.complainStatus)
              }
              this.show = true
              this.list = this.list.concat(res.list)
              this.shops = this.shops.concat(res.shops)
              let totalCount = res.totalCount
              if (this.list.length < totalCount) {
                this.busy = false
                this.flag = true
              }
              let endListCount = totalCount - this.list.length
              if (endListCount === 0) {
                this.loadingText = '已加载全部数据'
                this.flag = false
                this.busy = true
                this.end = true
              }
              this.loading = false
              this.isScroll = false
              console.log(this.busy, this.isScroll)
            }, (error) => {
              this.show = true
              this.loading = false
              if (error.response.status === 500) {
                this.loadingText = '数据加载失败: 服务器接口异常'
              }
            })
        }
      },
      statSelect (status, order) {
        document.body.scrollTop = 0
        this.loading = true
        this.page = 1
        this.data.complainStat = status
        this.$store.commit('SET_NEW_INDEX', order)
        this.flag = false
        this.selected = order
        api.fetchSearchByWorkId(this.data, this.page, this.size).then(res => {
          this.list = res.list
          this.loading = false
          this.show = true
          if (res.totalCount > 10) {
            console.log(res.totalCount)
            this.busy = false
            this.flag = true
            this.loadingText = '数据加载完成'
          } else {
            this.loadingText = '已加载全部数据'
          }
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
