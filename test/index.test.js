/* global describe, it */

var expect = require('chai').expect

var AliDayu = require('../')

// var alidayu = new AliDayu({
//   app_key: process.env.NODE_ALIDAYU_KEY,
//   app_secret: process.env.NODE_ALIDAYU_SECRET
// })

describe('sms', function () {
  it('constructor', function () {
    function createClient () {
      var client = new AliDayu()
      return client
    }
    expect(createClient).throw(Error)
  })
})
