var expect = require('chai').expect;
var AliDayu = require('..');

var alidayu = new AliDayu({
  app_key: process.env.NODE_ALIDAYU_KEY,
  app_secret: process.env.NODE_ALIDAYU_SECRET
});

describe('sms', function() {
  it('should ok', function(done) {
    alidayu.sms({
      sms_type: 'normal',
      sms_free_sign_name: '用户注册验证码',
      sms_param: {
        code: 12345,
        product: '今日事'
      },
      rec_num: '15850603069',
      sms_template_code: 'SMS_2140795'
    }, function() {
      done()
    })
  });
});
