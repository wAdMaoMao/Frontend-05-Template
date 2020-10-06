/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-10-04 17:01:39
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-06 15:25:37
 */

async function light() {
  while (true) {
    green()
    await sleep(1000)
    yellow()
    await sleep(200)
    red()
    await sleep(500)
  }
}