/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-02-03 15:11:53
 * @LastEditors: voanit
 * @LastEditTime: 2021-02-03 15:29:49
 */
import {add} from '../add'
let assert = require('assert')

it('1 + 2 should be 3', function() {
  assert.strictEqual(add(1,2), 3)
})

it('-5 + 2 should be -3', function() {
  assert.strictEqual(add(-5,2), -3);
});