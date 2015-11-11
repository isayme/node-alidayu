var expect = require('chai').expect;
var AliDayu = require('..');
var sign = AliDayu.prototype._sign;

describe('sign', function() {
  it('should ok when md5', function() {
    var s = sign.call({app_secret: 'test'}, {
      method: 'taobao.user.seller.get',
      format: 'xml',
      app_key: 'test',
      v: '2.0',
      fields: 'nick',
      sign_method: 'md5',
      timestamp: '2013-05-06 13:52:03',
      session: 'test'
    });

    expect(s).equal('72CB4D809B375A54502C09360D879C64');
  });
});
