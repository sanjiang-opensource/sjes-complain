<template>
  <div>
    <cell title="投诉时间 ：" :value="item.complainTime | timeToString" value-align="left" label-margin-left="2em"></cell>
    <cell title="受理部门 ：" :value="item.receiveDept" value-align="left" label-margin-left="2em"></cell>
    <cell title="投诉内容 ：" :inline-desc="item.complainContent" style="word-break: break-all "></cell>
    <cell :border-intent="false" :title="item.overTime | changeTitle"
          :link="'/complain/detail/'+item.id+'/'+workerId" :style="changeStyle">
      <img slot="icon" width="25" class="img" src="../assets/outtime.png">
      <div slot="value">
        <span :style="changeValueStyle">{{item.complainStat | statusName}}</span>
      </div>
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
    computed: {
      changeStyle: function () {
        if (this.item.overTime === 1) {
          return 'height:60;color:red'
        } else {
          return 'height:60;color:green'
        }
      },
      changeValueStyle: function () {
        if (this.item.complainStat === 1) {
          return 'color:red'
        } else {
          return 'color:green'
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
