<!--
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-09-27 18:37:12
 * @LastEditors: voanit
 * @LastEditTime: 2020-10-06 16:33:08
-->
# 学习笔记

## 1. TicTacToe棋类游戏代码编写过程中，利用一维数组代替二维数组，并根据数学归纳法找到棋子落位对应数组下标的关系，达到优化代码的作用。

## 2. 对象的深拷贝的方式有很多，在开发棋牌类游戏时，利用Object.create({})取代JSON.parse(JSON.stringify({}))是一种不错的方式。
* Object.create(proto, [propertiesObject])创建一个新对象，使用现有的对象来提供新创建的对象的原型。
* proto:必须。表示新建对象的原型对象，即该参数会被赋值到目标对象(即新对象，或说是最后返回的对象)的原型上。该参数可以是null、对象、函数的prototype属性（创建空的对象时需传null , 否则会抛出TypeError异常）。
* propertiesObject:可选。添加到新创建对象的可枚举属性（即其自身的属性，而不是原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。
* 返回值：在指定原型对象上添加新属性后的对象。

## 3. 异步编程的几种方式
* callback回调方式(缺点：代码嵌套层级过多，回调地狱问题)
* promise
* generator
* async + await
* async generator + for await of