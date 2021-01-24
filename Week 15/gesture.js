/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-01-22 15:45:11
 * @LastEditors: voanit
 * @LastEditTime: 2021-01-22 19:50:25
 */
let element = document.documentElement

element.addEventListener('mousedown',e=>{
  start(e)
  let mousemove = e=>{
    move(e)
  }
  let mouseup = e=>{
    // end(e)
    element.removeEventListener('mousemove',mousemove)
    element.removeEventListener('mouseup',mouseup)
  }
  element.addEventListener('mousemove',mousemove)
  element.addEventListener('mouseup',mouseup)
})

element.addEventListener('touchstart',e=>{
  for(let touch of e.changedTouches){
    start(touch)
  }
})
element.addEventListener('touchmove',e=>{
  for(let touch of e.changedTouches){
    move(touch)
  }
})
element.addEventListener('touchend',e=>{
  for(let touch of e.changedTouches){
    end(touch)
  }
})
element.addEventListener('touchcancel',e=>{
  for(let touch of e.changedTouches){
    cancel(touch)
  }
})
let handler
let startX,startY
let isPan = false
let isTap = true
let isPress = false
let start = point => {
  // console.log('start',point.clientX,point.clientY)
  startX = point.clientX, startY = point.clientY
  isPan = false
  isTap = true
  isPress = false
  handler = setTimeout(() => {
    isPan = false
    isTap = false
    isPress = true
    handler = null
    console.log('press')
  }, 1000)
}

let move = point => {
  // console.log('move',point.clientX,point.clientY)
  let dx = point.clientX - startX
  let dy = point.clientY - startY
  if(!isPan && dx ** 2 + dy ** 2 > 100){
    isPan = true
    isTap = false
    isPress = false
    console.log('panstart')
    clearTimeout(handler)
  }
  if(isPan){
    console.log(dx,dy)
    console.log('pan')
  }
}

let end = point => {
  // console.log('end',point.clientX,point.clientY)
  if(isTap){
    clearTimeout(handler)
    console.log('tap')
  }
  if(isPan){
    console.log('panend')
  }
  if(isPress){
    console.log('pressend')
  }
}

let cancel = point => {
  // console.log('cancel',point.clientX,point.clientY)
}