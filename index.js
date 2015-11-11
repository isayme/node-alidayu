var crypto = require('crypto');
var urllib = require('urllib');
var _ = require('lodash');

var defaults = {
  format: 'json',
  v: '2.0',
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
  var now = new Date();
  var diff = now.getTimezoneOffset() + 480;
  var now = new Date(now.getTime() + diff * 60000);

  var year = now.getFullYear();
  var month = ('0' + (now.getMonth() + 1)).slice(-2);
  var day = ('0' + now.getDate()).slice(-2);
  var hour = ('0' + now.getHours()).slice(-2);
  var minutes = ('0' + now.getMinutes()).slice(-2);
  var seconds = ('0' + now.getSeconds()).slice(-2);

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
  this.app_key = options.app_key;
  this.app_secret = options.app_secret;

  this.options = _.merge(_.clone(defaults), _.omit(options, ['app_secret']));

  if (!this.app_key) {
    throw new Error('app_key required.');
  }

  if (!this.app_secret) {
    throw new Error('app_secret required.');
  }

  this.gw = 'https://eco.taobao.com/router/rest';

  return this;
};

AliDayu.prototype._sign = function(params) {
  var app_secret = this.app_secret;
  var param_arr = [];
  for (var key in params) {
    if (typeof params[key] === 'object') {
      param_arr.push(key + JSON.stringify(params[key]));
    } else {
      param_arr.push(key + params[key]);
    }
  }

  param_arr.sort();

  return md5(app_secret + param_arr.join('') + app_secret);
};

function fullEncodeURIComponent(str) {
  var rv = encodeURIComponent(str).replace(/[!'()*~]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
  return rv.replace(/\%20/g,'+');
}

AliDayu.prototype._request = function(params, callback) {
  for (var key in params) {
    if (typeof params[key] === 'object') {
      params[key] = fullEncodeURIComponent(JSON.stringify(params[key]));
    } else {
      params[key] = fullEncodeURIComponent(params[key]);
    }
  }

  var options = {
    method: 'POST',
    data: params,
    dataType: 'json',
    gizp: true
  };

  urllib.request(this.gw, options, callback);
};

AliDayu.prototype.sms = function(options, callback) {
  var method = 'alibaba.aliqin.fc.voice.num.singlecall';
  var params = merge(this.options, {method: method}, options);
  params.timestamp = timestamp();
  params.sign = this._sign(params);

  this._request(params, callback);
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
