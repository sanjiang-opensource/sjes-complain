import Vue from 'vue'

Vue.filter('statusName', function (value) {
  let status = ''
  if (value === 1) {
    status = '待处理'
  } else if (value === 2) {
    status = '已完成'
  } else if (value === 3) {
    status = '无效投诉'
  } else {
    status = '处理中'
  }
  return status
})
Vue.filter('statusColor', function (value) {
  let color = 'gray'
  if (value === 1) {
    color = 'red'
  } else if (value === 2) {
    color = 'green'
  } else {
    color = 'gray'
  }
  return color
})
Vue.filter('timeToString', function (value) {
  if (value !== '') {
    return value[0] + '-' + value[1] + '-' + value[2] + ' ' + value[3] + ':' + value[4] + ':' + (value[5] === undefined ? '00' : value[5])
  }
  return ''
})
Vue.filter('changeTitle', function (value) {
  let overTimeName = ''
  if (value === 1) {
    overTimeName = '超时'
  } else {
    overTimeName = '未超时'
  }
  return overTimeName
})
Vue.filter('numberToString', function (value) {
  if (value !== '' && value != null) {
    return value.toString()
  }
  return ''
})
Vue.filter('dealImageUrl', function (value) {
  return value.replace('-1', '')
})
