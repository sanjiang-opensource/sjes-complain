<template>
  <div style="background-color: #eeeeee">
    <x-header style="position: fixed;z-index: 9999;width: 100%;height: 50px;top:0px" :left-options="{showBack: false}">投诉列表</x-header>
    <section class="grid" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
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
  import {ViewBox, Cell, XHeader, Toast, Divider} from 'vux'
  import Item from '../components/Item.vue'
  import * as api from '../api'

  export default {
    components: {
      ViewBox,
      Cell,
      XHeader,
      Spinner,
      Toast,
      Item,
      Divider
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
        end: false
      }
    },
    created () {
      this.workerId = this.$route.query.workerId
      this.$store.commit('INIT_WORKERID', this.workerId)
      this.$store.dispatch('getComplainList', this.workerId)
    },
    mounted () {
      this.page = this.$store.getters.page
      this.size = this.$store.getters.size
    },
    methods: {
      loadMore () {
        let page = this.list.length / this.size + 1
//        console.log(page)
        this.busy = true
        this.isScroll = true
        this.loading = true
        api.fetchSearchByWorkId(this.workerId, page, this.size)
          .then(res => {
            this.show = true
            this.list = this.list.concat(res.list)
            let totalCount = res.totalCount
            if (this.list.length < totalCount) {
              this.busy = false
            }
            let endListCount = totalCount - this.list.length
//            console.log(endListCount + '+' + this.size)
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
