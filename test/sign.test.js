/* global describe, it */

var expect = require('chai').expect
var sign = require('../lib/sign')

describe('sign', function () {
  it('should ok when md5', function () {
    var s = sign('test', {
      method: 'taobao.user.seller.get',
      format: 'xml',
      app_key: 'test',
      v: '2.0',
      fields: 'nick',
      sign_method: 'md5',
      timestamp: '2013-05-06 13:52:03',
      session: 'test'
    })

    expect(s).equal('72CB4D809B375A54502C09360D879C64')
  })

  // ref: http://open.taobao.com/doc2/detail.htm?articleId=101617&docType=1&treeId=1
  it('should ok when md5', function () {
    var s = sign('helloworld', {
      method: 'taobao.item.seller.get',
      format: 'json',
      app_key: '12345678',
      v: '2.0',
      fields: 'num_iid,title,nick,price,num',
      num_iid: 11223344,
      sign_method: 'md5',
      timestamp: '2016-01-01 12:00:00',
      session: 'test'
    })

    expect(s).equal('66987CB115214E59E6EC978214934FB8')
  })
})
