var debug = require('debug')('alidayu:timestamp')

// 时间戳，格式为yyyy-MM-dd HH:mm:ss，时区为GMT+8
function timestamp () {
  var now = new Date()
  // var diff = now.getTimezoneOffset() // + 480
  // now = new Date(now.getTime() + diff * 60000)

  var year = now.getFullYear()
  var month = ('0' + (now.getMonth() + 1)).slice(-2)
  var day = ('0' + now.getDate()).slice(-2)
  var hour = ('0' + now.getHours()).slice(-2)
  var minutes = ('0' + now.getMinutes()).slice(-2)
  var seconds = ('0' + now.getSeconds()).slice(-2)

  var result = '' + year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
  debug(result)
  return result
}

module.exports = timestamp
