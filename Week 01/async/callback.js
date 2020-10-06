/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-10-04 17:01:21
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-04 17:20:26
 */
function light() {
  green()
  setTimeout(() => {
    yellow()
    setTimeout(() => {
      red()
      setTimeout(() => {
        light()
      }, 500)
    }, 200)
  }, 1000)
}