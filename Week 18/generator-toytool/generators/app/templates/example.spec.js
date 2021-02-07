/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-02-05 16:24:54
 * @LastEditors: voanit
 * @LastEditTime: 2021-02-05 16:50:15
 */
import add from '../src/example.js'

let assert = require('assert')

describe('test fnc add',function() {
  it('1 + 2 === 3',function() {
    assert.strictEqual(add(1,2),3)
  })
})