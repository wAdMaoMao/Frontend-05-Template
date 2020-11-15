<!--
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-09-27 18:37:12
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-15 12:07:44
-->
# 学习笔记

## 1. proxy
* (1) Proxy就是代理，可以帮助我们完成很多事情，例如对数据的处理，对构造函数的处理，对数据的验证，说白了，就是在我们访问对象前添加了一层拦截，可以过滤很多操作，而这些过滤后的具体操作，由你来定义。
* (2) 基本用法
    ```js
      let target = {
        a: 1,
        b: {
          c: 3
        },
        d: [1,2,3]
      }
      let handler = {
        set(obj,prop,value){
          // 劫持set后你的操作
        },
        get(obj,prop){
          // 劫持get后你的操作
        }
        // ...
      }
      /*
       * target - 需要通过proxy包装的对象
       * handler - 劫持某些操作后的代理操作函数集
       **/
      let proxy = new Proxy(target,handler)
    ```
* (3) 常用捕获器
  ```js
  let handler = {
    getPrototypeOf(){}, // Object.getPrototypeOf 方法的捕捉器。
    setPrototypeOf(){}, // Object.setPrototypeOf 方法的捕捉器。
    isExtensible(){}, // Object.isExtensible 方法的捕捉器。
    preventExtensions(){}, // Object.preventExtensions 方法的捕捉器。
    getOwnPropertyDescriptor(){}, // Object.getOwnPropertyDescriptor 方法的捕捉器。
    defineProperty(){}, // Object.defineProperty 方法的捕捉器。
    has(){}, // in 操作符的捕捉器。
    get(){}, // 属性读取操作的捕捉器。
    set(){}, // 属性设置操作的捕捉器。
    deleteProperty(){}, // delete 操作符的捕捉器。
    ownKeys(){}, // Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。
    apply(){}, // 函数调用操作的捕捉器。
    construct(){}, // new 操作符的捕捉器。
  }
  ```
* (4) 兼容性问题：主流浏览器（如Chrome、Firefox、Opera、Safari）是支持proxy，但IE不支持（可以通过polyfill支持）。
## 2. Range
* (1) Range 接口表示一个包含节点与文本节点的一部分的文档片段。可以用`document.createRange()`来创建，也可以用`Selection`对象的`getRangeAt` 方法获取`Range`。另外，还可以通过`Document`对象的构造函数`Range()`来得到`Range`。（[查看详情](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)）
## 3. CSSOM(CSS Object Model)
* (1) CSSOM是一组允许用JavaScript操纵CSS的API。它是继DOM和HTML API之后，又一个操纵CSS的接口，从而能够动态地读取和修改CSS样式。
* (2) 浏览器兼容性：近几年cssom的这些新特性正在一点一点的向不同的浏览器内添加，具体情况具体分析，用到某个API请详细的检查该API的可用性。
* (3) [CSSOM API](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Object_Model#API%E5%8F%82%E8%80%83)
