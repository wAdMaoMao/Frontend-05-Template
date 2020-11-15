/*
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-11-15 16:32:00
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-15 16:48:52
 */
class Dog{
  constructor(name,force=1){
    this.name = name
    this.force = force
  }
  eat(food){
    return `我吃了${food}之后很饱！！！`
  }
}
class Person{
  constructor(name,hp=100){
    this.name = name
    this.hp = hp
  }
  hurted(who,force){
    this.hp = this.hp - force
    return `${who}攻击了${this.name}${force}滴血,${this.name}还剩${this.hp}滴血！！！`
  }
}
let dog = new Dog('拉布拉多',10)
let me = new Person('小明',1000)
console.log(me.hurted(dog.name,dog.force))