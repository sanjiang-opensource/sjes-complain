<template>
  <div>
    <cell title="投诉时间 ：" :value="item.complainTime | timeToString" value-align="left" label-margin-left="2em"></cell>
    <cell title="受理部门 ：" :value="item.receiveDept" value-align="left" label-margin-left="2em"></cell>
    <cell title="投诉内容 ：" :inline-desc="item.complainContent" style="word-break: break-all "></cell>
    <cell :border-intent="false" :title="item.overTime | changeTitle" :value="item.complainStat | statusName"
          :class="overTime(item.overTime)" :link="'/complain/detail/'+item.id+'/'+workerId">
      <img slot="icon" width="25" class="img" src="../assets/outtime.png">
    </cell>
  </div>
</template>

<script>
  import {Cell} from 'vux'

  export default {
    name: 'complain-item',
    props: {
      'item': {
        type: Object,
        default: null
      }
    },
    components: {
      Cell
    },
    data () {
      return {
        workerId: ''
      }
    },
    mounted () {
      this.workerId = this.$route.query.workerId
    },
    methods: {
      overTime (status) {
        if (status) {
          return 'overTime'
        } else {
          return 'noOver'
        }
      }
    }
  }
</script>

<style scoped>
  .img {
    display: block;
    margin-right: 5px;
  }

  .overTime {
    height: 60px;
    color: red;
  }

  .noOver {
    height: 60px;
    color: green;
  }
</style>
