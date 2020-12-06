/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-11-29 14:51:41
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-29 16:32:07
 */
// 在一个字符串中，找到字符”a”
export function match(string) {
  for(let item of string){
    if(item === 'a'){
      return true
    }
  }
  return false
}
//在一个字符串中，找到字符“ab”
export function findab(string) {
  let findA = false
  for(let item of string){
    if(item === 'a'){
      findA = true
    }else if(findA && item === 'b'){
      return true
    }else{
      findA = false
    }
  }
  return false
}

//在一个字符串中，找到字符“abcdef”
//非状态机
export function noStatus(string) {
  let findA = false
  let findB = false
  let findC = false
  let findD = false
  let findE = false
  for(let item of string){
    if(item === 'a'){
      findA = true
    }else if(findA && item === 'b'){
      findB = true
    }else if(findB && item === 'c'){
      findC = true
    }else if(findC && item === 'd'){
      findD = true
    }else if(findD && item === 'e'){
      findE = true
    }else if(findE && item === 'f'){
      return true
    } else{
      findA = false
      findB = false
      findC = false
      findD = false
      findE = false
    }
  }
  return false
}
//状态机
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
    return findD
  } else {
    return status(item)
  }
}
function findD(item) {
  if(item === 'd'){
    return findE
  } else {
    return status(item)
  }
}
function findE(item) {
  if(item === 'e'){
    return findF
  } else {
    return status(item)
  }
}
function findF(item) {
  if(item === 'f'){
    return end
  } else {
    return status(item)
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

