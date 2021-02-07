/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-02-04 11:03:22
 * @LastEditors: voanit
 * @LastEditTime: 2021-02-05 18:04:41
 */
import parserHtml from '../parser'
let assert = require('assert')

describe('parser html:',function () {
  it('<a></a>', function() {
    let tree = parserHtml('<a></a>')
    console.log(tree)
    assert.strictEqual(tree.children[0].tagName,'a')
    assert.strictEqual(tree.children[0].children.length,0)
  })
  it('<a></b>', function() {
    let tree = parserHtml('<a></b>')
    console.log(tree)
    assert.strictEqual(tree.children[0].tagName,'a')
    assert.strictEqual(tree.children[0].children.length,0)
  })
  it('<a />', function() {
    let tree = parserHtml('<a/>')
    console.log(tree)
    assert.strictEqual(tree.children[0].tagName,'a')
    assert.strictEqual(tree.children[0].children.length,0)
  })
  it('<a href/>', function() {
    let tree = parserHtml("<a href/>")
    console.log(tree)
    assert.strictEqual(tree.children[0].tagName,'a')
    assert.strictEqual(tree.children[0].children.length,0)
  })
  it('<a href></a>', function() {
    let tree = parserHtml("<a href></a>")
    console.log(tree)
    assert.strictEqual(tree.children[0].tagName,'a')
    assert.strictEqual(tree.children[0].children.length,0)
  })
  it('<a>abc</a>', function() {
    let tree = parserHtml('<a>abc</a>')
    console.log(tree)
    assert.strictEqual(tree.children[0].tagName,'a')
    assert.strictEqual(tree.children[0].children.length,1)
  })
  it('<a id = "item"></a>', function() {
    let tree = parserHtml('<a id="item"></a>')
    console.log(tree)
    assert.strictEqual(tree.children[0].tagName,'a')
    assert.strictEqual(tree.children[0].children.length,0)
  })
  it('<a id="item"/>', function() {
    let tree = parserHtml('<a id="item" />')
    console.log(tree)
    assert.strictEqual(tree.children[0].tagName,'a')
    assert.strictEqual(tree.children[0].children.length,0)
  })
  it('<a id="item"  >', function() {
    let tree = parserHtml('<a id="item"  >')
    console.log(tree)
    assert.strictEqual(tree.children[0].tagName,'a')
    assert.strictEqual(tree.children[0].children.length,0)
  })
  it('<a id="item" = >', function() {
    let tree = parserHtml('<a id="item" = >')
    console.log(tree)
    assert.strictEqual(tree.children[0].tagName,'a')
    assert.strictEqual(tree.children[0].children.length,0)
  })
  it('<a id=abc></a>', function() {
    let tree = parserHtml('<a id=abc></a>')
    console.log(tree)
    assert.strictEqual(tree.children[0].tagName,'a')
    assert.strictEqual(tree.children[0].children.length,0)
  })
  it('<a id=abc/>', function() {
    let tree = parserHtml('<a id=abc/>')
    console.log(tree)
    assert.strictEqual(tree.children[0].tagName,'a')
    assert.strictEqual(tree.children[0].children.length,0)
  })
  it('<a id=\'abc\'/>', function() {
    let tree = parserHtml('<a id=\'abc\'/>')
    console.log(tree)
    assert.strictEqual(tree.children.length,0)
  })
  it('<a id=\'abc\'></a>', function() {
    let tree = parserHtml('<a id=\'abc\'></a>')
    console.log(tree)
    assert.strictEqual(tree.children.length,0)
  })
  it('<A href="ddd"/> upper case', function() {
    let tree = parserHtml('<A href="ddd"/>')
    console.log(tree)
    assert.strictEqual(tree.children[0].tagName,'A')
    assert.strictEqual(tree.children[0].children.length,0)
  })
  it('<A/> upper case', function() {
    let tree = parserHtml('<A/>')
    console.log(tree)
    assert.strictEqual(tree.children[0].tagName,'A')
    assert.strictEqual(tree.children[0].children.length,0)
  })
  it('<>', function() {
    let tree = parserHtml('<>')
    console.log(tree)
    assert.strictEqual(tree.children.length,0)
  })
})
