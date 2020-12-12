/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-12-06 10:42:24
 * @LastEditors: voanit
 * @LastEditTime: 2020-12-12 13:12:55
 */
const EOF = Symbol('EOF') // 终止标识

const css = require('css')

let layout = require('./layout')

let currentToken = null
let currentAttribute = null
let currentTextNode = null // 文本节点

// 栈数据结构
let stack = [
  {
    type: 'document',
    children: []
  }
]


// CSS规则处理函数
let rules = []
function addCSSRules(text) {
  let ast = css.parse(text)
  rules.push(...ast.stylesheet.rules)
}

// 匹配函数
function match(element,selector) {
  if(!selector || !element.attributes){
    return false
  }
  if(selector.charAt(0) === '#'){
    // 取出属性为id的一项
    let attr = element.attributes.filters(item=>item.name === 'id')
    if(attr&&attr.value&&attr.value === selector.replace('#','')){
      return true
    }
  } else if(selector.charAt(0) === '.'){
    // 取出属性为class的一项
    let attr = element.attributes.filters(item=>item.name === 'class')
    if(attr&&attr.value&&attr.value === selector.replace('.','')){
      return true
    }
  } else {
    if(element.tagName === selector){
      return true
    }
  }
  return false
}

// 处理CSS优先级函数
function specificity(selector) {
  let p = [0,0,0,0]
  let selectorParts = selector.split(' ')
  for(let item of selectorParts){
    if(item.charAt(0) === '#'){
      p[1] += 1
    } else if(item.charAt(0) === '.') {
      p[2] += 1
    } else {
      p[3] += 1
    }
  }
  return p
}
function compare(sp1,sp2) {
  if(sp1[0] - sp2[0]){
    return sp1[0] - sp2[0]
  }
  if(sp1[1] - sp2[1]){
    return sp1[1] - sp2[1]
  }
  if(sp1[2] - sp2[2]){
    return sp1[2] - sp2[2]
  }
  return sp1[3] - sp2[3]
}

// 标签匹配CSS规则函数
function computeCSS(element) {
  // 获取父元素 reverse是因为需要从当前元素逐级向外层进行匹配
  let element = stack.slice().reverse()
  if(!element.computedStyle){
    element.computedStyle = {}
  }
  for(let rule of rules){
    let selectorParts = rule.selectors[0].split(' ').reverse()
    if(!match(element,selectorParts[0])) continue
    
    let matched = false
    let j = 1
    for(let i = 0;i<elements.length;i++){
      if(match(element[i],selectorParts[j])){
        j++
      }
    }
    if( j>= selectorParts.length){
      matched = true
    }
    if(matched){
      // 匹配到的逻辑
      let computedStyle = element.computedStyle
      let sp = specificity(rule.selectors[0])
      for(let item of rule.declarations){
        if(!computedStyle[item.property]){
          computedStyle[item.property] = {}
        }
        if(!computedStyle[item.property].specificity){
          computedStyle[item.property].value = item.value
          computedStyle[item.property].specificity = sp

        } else if(compare(computedStyle[item.property],sp)<0) {
          computedStyle[item.property].value = item.value
          computedStyle[item.property].specificity = sp
        }
      }
    }
  }
  
}

function emit(token) {
  // 取出栈顶元素
  let top = stack[stack.length - 1]
  if(token.type === 'startTag'){
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }
    element.tagName = token.tagName
    // 添加属性
    for(let item of token){
      if(item !== 'type' && item !== 'tagName'){
        element.attributes.push({
          name: item,
          value: token[item]
        })
      }
    }
    // 创建一个元素立刻计算CSS
    computeCSS(element)
    top.children.push(element)
    element.parent = top

    // 判断是否为自封闭标签 自封闭标签不入栈
    if(!token.isSelfCloseing) stack.push(element)
    currentTextNode = null
  } else if(token.type === 'endTag') {
    if(top.tagName !== token.tagName){
      throw new Error('Tag start end does not match!')
    } else {
      // 如果遇到style标签，执行添加CSS规则的操作
      if(top.tagName === 'style') {
        addCSSRules(top.children[0].content)
      }
      //计算布局
      layout(top)
      // 出栈
      stack.pop()
    }
    currentTextNode = null
  } else if(token.type === 'text'){
    if(currentTextNode == null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
}

// tag - 开始标签 结束标签 自封闭标签
function data(c) {
  if(c==='<'){
    return tagOpen
  } else if (c === EOF) {
    emit({
      type: 'EOF'
    })
    return false
  } else {
    emit({
      type: 'text',
      content: c
    })
    return data
  }
}

function tagOpen(c) {
  if(c === '/'){
    return endTagOpen
  } else if(c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }
    return tagName(c)
  } else {
    return
  }
}

function endTagOpen(c) {
  if(c.match(/^[a-zA-Z]$/)){
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c)
  } else if(c === '>') {
    // TODO报错
  } else if(c === EOF) {

  } else {
    
  }
}

function tagName(c) {
  if(c.match(/^[\n\t\f ]$/)) {
    return beforeAttributeName
  } else if(c === '/') {
    return selfCloseingStartTag
  } else if(c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c
    return tagName
  } else if(c === '>') {
    return data
  } else {
    return tagName
  }
}
//处理属性
function beforeAttributeName(c) {
  if(c.match(/^[\n\t\f ]$/)) {
    return beforeAttributeName
  } else if(c === '>' || c === '/' || c === EOF) {
    return afterAttrbuteName(c)
  } else if(c === '=') {
    // TODO 抛出错误
    return 
  } else {
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}

function attributeName(c) {
  if(c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c == EOF) {
    return afterAttrbuteName(c)
  } else if(c === '='){
    return beforeAttributeValue
  } else if(c === '\u0000') {

  } else if(c === "\"" || c === "'" || c === '<') {
    
  } else {
    currrentAttribute.name += c
    return attributeName
  }
}

function afterAttrbuteName(c) {
  
}

function beforeAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF){
    return beforeAttributeValue
  } else if(c === '\"') {
    return doubleQuotedAttributeValue
  } else if(c === '\''){
    return singleQuotedAttributeValue
  } else if(c === '>') {

  } else {
    return UnquotedAttributeValue
  }
}

function doubleQuotedAttributeValue(c) {
  if(c === '\"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if(c === '\u0000') {

  } else if(c === EOF) {

  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function singleQuotedAttributeValue(c) {
  if(c === '\'') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  } else if(c === '\u0000') {

  } else if(c === EOF) {

  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function afterQuotedAttributeValue(c) {
  if(c.match(/^[/t/n/f ]$/)) {
    return beforeAttributeName
  } else if(c === '/') {
    return selfCloseingStartTag
  } else if(c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if(c === EOF) {

  } else {
    currentAttribute.value += c
    return doubleQuotedAttributeValue
  }
}

function UnquotedAttributeValue(c) {
  if(c.match(/^[/n/t/f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    return beforeAttributeName
  } else if(c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return selfCloseingStartTag
  } else if(c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  } else if(c === '\u0000') {

  } else if(c ==='\'' || c === '/"' || c === '<' || c === '=' || c === '`') {

  } else if(c === EOF) {

  } else {
    currentAttribute.value += c
    return UnquotedAttributeValue
  }
}

function selfCloseingStartTag(c) {
  if(c === '>') {
    currentToken.isSelfCloseing = true
    return data
  } else if(c === EOF) {
    
  } else {
    
  }
}

module.exports.parserHtml = function parserHtml(html) {
  let state = data
  for(let item of html){
    state = state(item)
  }
  state = state(EOF)
  console.log(html)
}