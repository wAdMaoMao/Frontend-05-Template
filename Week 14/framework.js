/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2021-01-10 11:51:16
 * @LastEditors: voanit
 * @LastEditTime: 2021-01-10 13:00:33
 */
export function createElement(type,attributes,...children) {
  let element
  if(typeof type === 'string'){
    element = new ElementWrapper(type)
  } else {
    element = new type
  }
  for(let attr in attributes){
    element.setAttribute(attr,attributes[attr])
  }
  for(let child of children){
    if(typeof child === 'string'){
      child = new TextNodeWrapper(child)
    }
    element.appendChild(child)
  }
  return element
}
export class Component{
  mountTo(parent){
    parent.appendChild(this.root)
  }
  setAttribute(name,value){
    this.root.setAttribute(name,value)
  }
  appendChild(child){
    child.mountTo(this.root)
  }
}
class ElementWrapper extends Component{
  constructor(type){
    this.root = document.createElement(type)
  }
}
class TextNodeWrapper extends Component{
  constructor(content){
    this.root = document.createTextNode(content)
  }
}