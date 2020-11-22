/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-11-22 15:47:43
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-22 15:47:43
 */
function stringToNumber(str) {
  let number = 0
  let hexNumbers = '0123456789abcdef'
  let octNumers = '01234567'
  let binNumbers = '01'

  // 十六进制
  if(str.startsWith('0x')){
    for(let i = str.length-1;i>=2;i--){
      let item = str[i]
      number += Number(hexNumbers.indexOf(item)) * 16 ** (str.length-1-i)
    }
    return number
  }

  // 八进制
  if(str.startsWith('0o')){
    for(let i = str.length-1;i>=2;i--){
      let item = str[i]
      number += Number(octNumers.indexOf(item)) * 8 ** (str.length-1-i)
    }
  }
  
  // 二进制
  if(str.startsWith('0b')){
    for(let i = str.length-1;i>=2;i--){
      let item = str[i]
      number += Number(binNumbers.indexOf(item)) * 2 ** (str.length-1-i)
    }
  }
  
  // 十进制
  return Number(str)
}