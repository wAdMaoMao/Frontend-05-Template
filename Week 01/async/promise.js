/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-10-04 17:01:59
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-06 15:28:00
 */

function light() {
  green()
  sleep(1000)
  .then(()=>{
    yellow()
    return sleep(200)
  }).then(()=>{
    red()
    return sleep(500)
  }).then(light)
}