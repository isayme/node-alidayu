var crypto = require('crypto')
var debug = require('debug')('alidayu:sign')

function md5 (str, encoding) {
  var sum = crypto.createHash('md5')
  encoding = encoding || 'utf8'
  return sum.update(str, encoding).digest('hex').toUpperCase()
}

module.exports = function sign (appSecret, params) {
  var paramArr = []
  var keys = Object.keys(params).sort()
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i]
    paramArr.push(key + params[key])
  }

  paramArr.unshift(appSecret)
  paramArr.push(appSecret)
  debug(paramArr)
  return md5(paramArr.join(''))
}
