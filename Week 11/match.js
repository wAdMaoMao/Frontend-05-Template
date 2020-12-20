/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-12-20 16:07:16
 * @LastEditors: voanit
 * @LastEditTime: 2020-12-20 17:44:50
 */
/**
 * 编写一个 match 函数。
 * 它接收两个参数，第一个参数是一个选择器字符串性质，第二个是一个 HTML 元素。
 * 这个元素你可以认为它一定会在一棵 DOM 树里面。
 * 通过选择器和 DOM 元素来判断，当前的元素是否能够匹配到我们的选择器。
 * （不能使用任何内置的浏览器的函数，仅通过 DOM 的 parent 和 children 这些 API，来判断一个元素是否能够跟一个选择器相匹配。）
 */
function matchChild(selector,element) {
  if(!selector||!element) return false
  const regPattern = /(#[a-zA-Z]+[_a-zA-Z0-9-]*?)|(\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*)|([a-z]+)/g
  const matched = selector.match(regPattern)
  let matchTime = 0

  for(const p of matched){
    if(p.charAt(0)==='#'){
      const attr = Array.from(element.attributes).filter(attr=>attr.name==='id')[0]
      if(attr && attr.value === p.replace('#','')){
        matchTime++
      }
    }else if(p.charAt(0)==='.'){
      const attr = Array.from(element.attributes).filter(attr=>attr.name==='class')[0]
      if(attr){
        const classes = attr.value.split(' ')
        for(let className of classes){
          if(className === p.replace('.','')){
            matchTime++
          }
        }
      }
    }else{
      if(element.tagName.toLowerCase()===p){
        matchTime++
      }
    }
  }
  return matchTime === matched.length
}
function match(selector,element) {
  if(!selector||!element) return false
  let elements = [element]
  let curNode = element
  while(curNode.parentode){
    elements.push(curNode.parentode)
    curNode = curNode.parentode
  }
  const selectorParts = selector.split(' ').reverse()
  if(!matchChild(selectorParts[0],element)){
    return false
  }
  let matched = false
  let j = 1
  for(let i = 0,len = elements.length;i<len;i++){
    if(matchChild(selectorParts[j],elements[i])){
      j++
    }
  }
  return matched = j >= selectorParts.length
}
match("div #id.class", document.getElementById("id"))
