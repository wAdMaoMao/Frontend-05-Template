/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-01-18 11:35:14
 * @LastEditors: voanit
 * @LastEditTime: 2021-01-21 19:15:50
 */

const TICK = Symbol('tick')
const TICK_HANDLER = Symbol('tick-handler')
const ANIMATIONS = Symbol('animations')
const START_TIME = Symbol('start_time')
const PAUSE_START = Symbol('pause-start') // 中止动画开始时间
const PAUSE_TIME = Symbol('pause-time') // 中止动画时间
const STATE = Symbol('state')
export class TimeLine{
  constructor(){
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
    this[STATE] = 'inited'
  }
  start(){
    if(this[STATE] !== 'inited'){
      throw new Error('The state is not inited!')
    }
    this[STATE] = 'started'
    let startTime = Date.now()
    this[PAUSE_TIME] = 0
    // 将tick定义为私有方法
    this[TICK] = ()=>{
      let now = Date.now() - this[PAUSE_TIME]
      for(let animation of this[ANIMATIONS]){
        let t;
        if(this[START_TIME].get(animation)<startTime){
          t = now - startTime
        } else {
          t = now - this[START_TIME].get(animation)
        }
        if(animation.duration < t){
          this[ANIMATIONS].delete(animation)
          t = animation.duration
        }
        animation.receiveTime(t)
      }
      this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
    }
    this[TICK]()
  }
  pause(){
    // 中止动画
    if(this[STATE] !== 'started'){
      throw new Error('The state is not started!')
    }
    this[STATE] = 'paused'
    this[PAUSE_START] = Date.now()
    cancelAnimationFrame(this[TICK_HANDLER])
  }
  resume(){
    // 开启动画
    if(this[STATE] !== 'paused'){
      throw new Error('The state is not paused!')
    }
    this[STATE] = 'started'
    this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
    this[TICK]()
  }
  reset(){
    this[ANIMATIONS] = new Set()
    this[START_TIME] = new Map()
    this[PAUSE_START] = 0
    this[PAUSE_TIME] = 0
    this[TICK_HANDLER] = null
    this[STATE] = 'inited'
  }
  add(animation,startTime){
    if(arguments.length<2){
      startTime = Date.now()
    }
    this[ANIMATIONS].add(animation)
    this[START_TIME].set(animation,startTime)
  }
}

export class Animation{
  constructor(object,property,startValue,endValue,duration,timinfFunction,delay,tempalte){
    this.object = object
    this.property = property
    this.startValue = startValue
    this.endValue = endValue
    this.duration = duration
    this.delay = delay
    this.timinfFunction = timinfFunction
    this.tempalte = tempalte
  }
  receiveTime(time){
    console.log('time',time)
    let range = this.endValue - this.startValue
    this.object[this.property] = this.tempalte(this.startValue + range*time/this.duration)
  }
}