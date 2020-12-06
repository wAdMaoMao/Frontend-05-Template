/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-11-29 16:32:00
 * @LastEditors: voanit
 * @LastEditTime: 2020-12-05 17:17:06
 */
// 使用状态机完成”abababx”的处理。

function status(item) {
  if(item === 'a'){
    return findB
  }else{
    return status
  }
}
function findB(item) {
  if(item === 'b'){
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
    return findA2
  } else {
    return status(item)
  }
}
function findA2(item) {
  if(item === 'a'){
    return findB2
  } else {
    return status(item)
  }
}
function findB2(item) {
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
    return findA2(item)
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