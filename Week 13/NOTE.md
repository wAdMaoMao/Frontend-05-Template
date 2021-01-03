<!--
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-09-27 18:37:12
 * @LastEditors: voanit
 * @LastEditTime: 2021-01-03 17:13:40
-->
# 学习笔记

## 1. HTML实体（DTD）
* &nbsp 在网页上出现多个空格，会出现分词的问题
* &quot 是双引号
* &amp 是&符
* &lt 是小于号
* &gt 是大于号

#  2. HTML 语义化标签的使用
```js
<main></mian> // 放的主要部分 表示一个
<hgroup></hgroup> // 标题组
<abbr></abbr> // 表示缩写、简写 有title属性
<strong></strong> // 表示重点 文章的重点
<em></em> // 表示强调 语气上
<figure></figure> // 用作文档中插图的图像
<figcaption></figcaption> // 元素为 figure 添加标题
<nav></nav> // nav 标签定义导航链接的部分。
<dfn></dfn> // dfn表示定义当前的词
<samp></samp> // 表示例子
<pre></pre> // 表示引入代码
<code></code> // 表示代码
```
## 3. DOM API
* parentElement
* children
* firstElementChild
* lastElementChild
* nextElementSibling
* previousElementSibilng

* parentNode
* childNodes
* firstChild
* lastChild
* nextSibling
* previousSibilng

* appendChild
* insertBefore
* removeChild
* replaceChild

* compareDocumentPosition: 比较两个节点中关系
* contains: 检查一个节点是否包含另一个节点
* isEqualNode: 检查两个节点是否完全相同
* isSameNode
* cloneNode: 复制一个节点
## 4. 事件API

## 5. Range API
* range.setStartBefore
* range.setEndBefore
* range.setStartAfter
* range.setEndAfter
* range.selectNode
* range.selectNodeContents
* range.extractContents(): 取节点
* range.insertNode(): 插入节点

```js
  <div id="a">
    <span>1</span>
    <p>2</p>
    <p>3</p>
    <div>4</div>
  </div>
  
  let element = document.getElementById('a')
  
  function reverseChildren(element){
    let range = new Range()
    range.selectNodeContents(element)
    let fragment = range.extractContents()
    let l = fragment.childNodes.length
    while(l-- > 0){
      fragment.appendChild(fragment.childNodes[l]) // 不会引发重排
    }
    element.appendChild(fragment)
  }
  reverseChildren(element)
```

## 6. CSSOM 及 CSSOM View
* `document.styleSheets`
* `document.styleSheets[0].cssRules`
* `document.styleSheets[0].insertRule("p{color:pink;}",0)`
* `document.styleSheets[0].removeRule(0)`
* `window.getComputedStyle(elt,pseudoElt)` el-想要获取的元素 pseudoElt-可选，伪元素
* `getClientRects()` 获取当前元素生成的所有盒
* `getBoundingClientRect()` 获取包裹当前元素最外层的盒