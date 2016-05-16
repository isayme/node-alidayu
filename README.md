# node-alidayu
阿里大鱼Node SDK.

# 安装
> npm i node-alidayu --save

# 使用
````
var AliDayu = require('node-alidayu')
var client = new AliDayu({
  app_key: 'your app key',
  app_secret: 'your app secret'
})

client.sms({
  rec_num: 'phone number',
  sms_free_sign_name: '注册验证',
  sms_template_code: 'SMS_2140795',
  sms_param: {
    code: "4568",
    product: 'product name'
  }
}).then(function (data) {
  console.log('sucess')
}).catch(function (err) {
  console.log('fail')
})
````

# 支持特性
- 使用Promise, 不支持callback
- alibaba.aliqin.fc.sms.num.send (短信发送)

# 参考文档
[短信发送](https://api.alidayu.com/doc2/apiDetail.htm?spm=a3142.7395905.4.6.RoLvnK&apiId=25450)
