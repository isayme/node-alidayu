var crypto = require('crypto');
var http = require('http');
var https = require('https');

var defaults = {
  production: false,
  app_key: '',
  app_secret: '',
  format: 'json',
  v: 2.0,
  simplify: false,
  sign_method: 'md5'
};

var sandbox = {
  http: 'http://gw.api.tbsandbox.com/router/rest',
  https: 'https://gw.api.tbsandbox.com/router/rest'
};

var production = {
  http: 'http://gw.api.taobao.com/router/rest',
  https: 'https://eco.taobao.com/router/rest'
}

// 时间戳，格式为yyyy-MM-dd HH:mm:ss，时区为GMT+8
function timestamp() {
  var diff = now.getTimezoneOffset() + 480;
  var now = new Date(Date.now() + diff * 60000);

  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  return '' + year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
}

function md5(str, encoding) {
  var md5sum = crypto.createHash('md5');
  encoding = encoding || 'utf8';
  return md5sum.update(str, encoding).digest('hex').toUpperCase();
}

function merge() {
  var result = {};
  for (var i = 0, len = arguments.length; i < len; i++) {
    var obj = arguments[i];

    for (var key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

var AliDayu = function(options) {
  this.options = merge(defaults, options);

  if (!this.options.app_key) {
    throw new Error('app_key required.');
  }

  if (!this.options.app_secret) {
    throw new Error('app_secret required.');
  }

  return this;
};

AliDayu.prototype._sign = function(params) {
  var app_secret = this.options.app_secret;
  var param_arr = [];
  for (var key in params) {
    if (typeof params[key] === 'object') {
      params.push(key + JSON.stringify(params[key]));
    } else {
      params.push(key + params[key]);
    }
  }
  param_arr.sort();

  return md5(app_secret + param_arr.join('') + app_secret);
};

AliDayu.prototype.sms = function(callback) {
  var method = 'alibaba.aliqin.fc.voice.num.singlecall';
  var params = merge(this.options, {method: method});
  params.sign = this._sign(params);

};

AliDayu.prototype.voice_doublecall = function() {
  throw new Error('not implemented!')
};

AliDayu.prototype.voice_singlecall = function() {
  throw new Error('not implemented!')
};

AliDayu.prototype.tts_singlecall = function() {
  throw new Error('not implemented!')
};

var AliDaYu = AliDayu;
module.exports = AliDayu;
