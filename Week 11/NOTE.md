<!--
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-09-27 18:37:12
 * @LastEditors: voanit
 * @LastEditTime: 2020-12-20 18:16:19
-->
# 学习笔记

## 1. 为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
* 答：first-line是在文档在进行排版之后，才能确定的元素，而设置display，或者float属性可能导致当前元素脱离文档流，从而不再属于第一个元素。这就和它的定义产生了矛盾，因此，first-line不支持一些影响layout的属性设置。

## 2. CSS选择器
### （1）简单选择器
* `*`
* `div svg|a`
* `.cls`
* `#id`
* `[attr=value]`
* `:hover`
* `::before`
### （2）复合选择器
* `<简单选择器><简单选择器><简单选择器>`
* `*或者div必须写在最前边`
### （3）复杂选择器
* `<复合选择器><sp><复合选择器>`
* `<复合选择器>'>'<复合选择器>`
* `<复合选择器>'+'<复合选择器>`
* `<复合选择器>'~'<复合选择器>`
* `<复合选择器>'||'<复合选择器>`
### （4）伪类
#### 1）链接/行为
* :any-link
* :link :visited
* :hover
* :active
* :focus
* :target
#### 2）树结构
* :empyt
* :nth-child()
* :nth-last-child()
* :first-child :last-child :only-child
#### 2）逻辑型
* :not
* :where :has
### （5）伪元素
* ::before
* ::after
* ::first-line
* ::first-letter
* ::first-line 可用属性：font系列、color系列、background系列、word-spacing、letter-spacing、text-decoration、text-transform、line-height
* ::first-letter 可用属性：font系列、color系列、background系列、text-transform、line-height、word-spacing、letter-spacing、line-height、float、vertical-align、盒模型系列（margin、padding、border）
border