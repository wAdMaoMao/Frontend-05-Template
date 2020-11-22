/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-11-22 15:47:32
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-22 16:17:43
 */
function numberToString(number,scale) {
  let result = ''
  let num = Math.abs(number)
  let sign = number>=0?'':'-'
  if(number === 0) return '0'

  switch (scale) {
    // 二进制
    case 2:
      while (num>0) {
        if(num%2){
          result = (num%2) + result
        }else{
          result = 0 + result
        }
        num >>= 1
      }
      break;
      
    // 八进制
    case 8:
      while (num>0) {
        if(num%8){
          result = (num%8) + result
        }else{
          result = 0 + result
        }
        num >>= 3
      }
      break;
      
    // 十六进制
    case 16:
      while (num>0) {
        if(num%16){
          result = (num%16) + result
        }else{
          result = 0 + result
        }
        num >>= 4
      }
      break;
  
    default:
      return String(number)
  }

  return sign + result

}