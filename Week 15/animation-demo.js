/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-01-21 15:35:58
 * @LastEditors: voanit
 * @LastEditTime: 2021-01-21 16:26:32
 */
import { TimeLine,Animation } from './animation.js'
let tl = new TimeLine()
tl.start()
tl.add(new Animation(document.querySelector('#el').style,'transform',0,1000,3000,null,0,(x)=>`translateX(${x}px)`))
document.querySelector("#pause").addEventListener('click',e=>{
  tl.pause()
})
document.querySelector("#resume").addEventListener('click',e=>{
  tl.resume()
})