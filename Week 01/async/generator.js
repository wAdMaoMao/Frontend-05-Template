/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-10-04 17:01:39
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-06 15:40:10
 */

function* light() {
  while (true) {
    green()
    yield sleep(1000)
    yellow()
    yield sleep(200)
    red()
    yield sleep(500)
  }
}

function run(iterator) {
  let {done,value} = iterator.next()
  if(done) return
  if(value instanceof Promise){
    value.then(()=>{
      run(iterator)
    })
  }
}

function co(generator) {
  return function() {
    return run(generator())
  }
}

light = co(light)

// async generator 和 for await of 联合使用

async function* counter() {
  let i = 0
  while (true) {
    await sleep(1000)
  }
}
async function test() {
  for await(let item of counter()){
    console.log(item)
  }
}