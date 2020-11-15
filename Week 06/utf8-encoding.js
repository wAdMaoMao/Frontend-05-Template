/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-11-15 15:35:20
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-15 16:00:30
 */
function UTF8_Encoding(string) {
  const utf8Arr = []
  for(let character of string){
    // 查找出每个字符的utf-16的码点
    const codePoint = character.codePointAt(0)
    // 根据码点值所占字符分别处理
    if(codePoint >= 0x00 && codePoint <= 0x7f){
      //占用一个字节
      utf8Arr.push(codePoint)
    } else if(codePoint >= 0x80 && codePoint <= 0x7ff){
      //占用两个字节
      utf8Arr.push((192|(31&(codePoint>>6))))
      utf8Arr.push((128|(63&codePoint)))
    } else if((codePoint >= 0x800 && codePoint <= 0xd7ff)||(codePoint >= 0xe000 && codePoint <= 0xffff)){
      //占用三个字节
      utf8Arr.push((224|(15&(codePoint>>12))))
      utf8Arr.push((128|(63&(codePoint>>6))))
      utf8Arr.push((128|(63&codePoint)))
    } else if(codePoint >= 0x10000 && codePoint <= 0x10ffff){
      //占用四个字节
      utf8Arr.push((240|(7&(codePoint>>18))))
      utf8Arr.push((128|(63&(codePoint>>12))))
      utf8Arr.push((128|(63&(codePoint>>6))))
      utf8Arr.push((128|(63&codePoint)))
    }
  }
  // 转为二进制
  const binaryAyy = []
  for(let item of utf8Arr){
    binaryAyy.push(item.toString(2))
  }
  return binaryAyy
}
console.log(TF8_Encoding('北京故宫博物院'))
