/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-10-06 16:40:28
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-06 16:40:45
 */
let lightClassList = document.getElementsByClassName('basic')

function green() {
  lightClassList[1].classList.remove('yellow')
  lightClassList[2].classList.remove('red')
  lightClassList[0].classList.add('green')
}
function yellow() {
  lightClassList[0].classList.remove('green')
  lightClassList[2].classList.remove('red')
  lightClassList[1].classList.add('yellow')
}
function red() {
  lightClassList[0].classList.remove('green')
  lightClassList[1].classList.remove('yellow')
  lightClassList[2].classList.add('red')
}
function sleep(t) {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
     resolve()
    }, t);
  })
}
let nextBtn = document.getElementById('nextBtn')
let status = null
nextBtn.addEventListener('click',handelNextBtnClick,false)
function handelNextBtnClick() {
  if(status === null){
    green()
    status = 'green'
  } else if(status === 'green'){
    yellow()
    status = 'yellow'
  } else if(status === 'yellow'){
    red()
    status = 'red'
  } else if(status === 'red'){
    green()
    status = 'green'
  }
}