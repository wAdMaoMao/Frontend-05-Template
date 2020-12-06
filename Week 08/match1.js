/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-11-29 16:32:00
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-29 16:34:46
 */
// 用状态机实现：字符串“abcabx”的解析

function status(item) {
  if(item === 'a'){
    return findB
  }else{
    return status
  }
}
function findB(item) {
  if(item === 'b'){
    return findC
  } else {
    return status(item)
  }
}
function findC(item) {
  if(item === 'c'){
    return findA1
  } else {
    return status(item)
  }
}
function findA1(item) {
  if(item === 'a'){
    return findB1
  } else {
    return status(item)
  }
}
function findB1(item) {
  if(item === 'b'){
    return findX
  } else {
    return status(item)
  }
}
function findX(item) {
  if(item === 'x'){
    return end
  } else {
    return findC(item)
  }
}
function end(item) {
  return end
}
export function stateMachine(string) {
  let state = status
  for(let item of string){
    state = state(item)
  }
  return state === end
}