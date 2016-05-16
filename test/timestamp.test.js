/* global describe, it */

var expect = require('chai').expect
var timestamp = require('../lib/timestamp')

describe('timestamp', function () {
  it('should have format: YYYY-MM-DD HH:mm:ss', function () {
    var ts = timestamp()
    var matched = /\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}/.test(ts)
    expect(matched).to.be.true
  })
})
