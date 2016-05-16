var only = require('only')
var debug = require('debug')('alidayu:index')
var request = require('request-promise').defaults({
  json: true,
  gzip: true,
  encoding: 'utf8'
})

var sign = require('./lib/sign')
var timestamp = require('./lib/timestamp')

var AliDayu = function (options) {
  options = options || {}

  this.app_key = options.app_key
  this.app_secret = options.app_secret

  this.gw = options.gw || 'http://gw.api.taobao.com/router/rest'

  if (!this.app_key) {
    throw new Error('app_key required.')
  }

  if (!this.app_secret) {
    throw new Error('app_secret required.')
  }

  return this
}

AliDayu.prototype.request = function (method, params) {
  for (var key in params) {
    if (typeof params[key] === 'object') {
      params[key] = JSON.stringify(params[key])
    }
  }

  params.method = method
  params.format = 'json'
  params.app_key = this.app_key
  params.v = '2.0'
  params.sign_method = 'md5'
  params.timestamp = timestamp()
  params.sign = sign(this.app_secret, params)

  var options = {
    method: 'POST',
    uri: this.gw,
    form: params
  }

  debug('request options:', options)
  return request(options)
}

AliDayu.prototype.sms = function (params) {
  var method = 'alibaba.aliqin.fc.sms.num.send'
  params = only(params, [
    'sms_type', // required
    'sms_free_sign_name', // required
    'sms_param',
    'rec_num',  // required
    'sms_template_code'  // required
  ])
  params.sms_type = 'normal'

  return this.request(method, params)
}

AliDayu.prototype.voice_doublecall = function () {
  throw new Error('not implemented!')
}

AliDayu.prototype.voice_singlecall = function () {
  throw new Error('not implemented!')
}

AliDayu.prototype.tts_singlecall = function () {
  throw new Error('not implemented!')
}

module.exports = AliDayu
