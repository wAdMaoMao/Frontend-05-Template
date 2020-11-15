<!--
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-09-27 18:37:12
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-15 17:07:47
-->
# 学习笔记

## 1. 语言分类
* 非形式语言：中文、英文等。
* 形式语言（例如：乔姆斯基谱系），乔姆斯基谱系是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的。它包括四个层次：
(1)0型文法：无限制文法或短语结构文法，包含以下三种文法；
(2)1型文法：上下文相关文法，生成上下文相关语言，包含以下两种文法；
(3)2型文法：上下文无关文法，生成上下文无关语言，包含以下一种文法；
(4)3型文法：正规文法，生成正则语言。
* 形式语言按照用途来分类：
(1)数据描述语言：JSON、HTML、XAML、SQL、CSS；
(2)编程预语言：C、C++、Java、C#、Python、Ruby、Perl、Lisp、T-SQL、Clojure、Haskell、JavaScript。
* 形式语言按照表达方式来分类：
(1)声明式语言：JSON、HTML、XAML、SQL、CSS、Lisp、Clojure、Haskell；
(2)命令型语言：C、C++、Java、C#、Python、Ruby、Perl、JavaScript。
* [参考](https://cloud.tencent.com/developer/article/1176163)

## 2. 产生式
* 用尖括号括起来的名称来表示语法结构名【在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句】
* 巴科斯诺尔范式：即巴科斯范式（英语：Backus Normal Form，缩写为 BNF）是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。它是由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）首先引入的用来描述计算机语言语法的符号集。
* 语法结构分成基础结构和需要用其他语法结构定义的复合结构
(1)基础结构称终结符（终结符：最终在代码中出现的字符）
(2)复合结构称非终结符
* 引号和中间的字符表示终结符
* 可以允许有括号
* `*`表示重复多次
* `|`表示或
* `+`表示至少一次

## 3. 带括号的四则运算产生式
```js
<Mul>::=<Number>|
        <Mul>"*"<Number>|
        <Mul>"/"<Number>
<Add>::=<Mul>|
        <Add>"+"<Mul>|
        <Add>"-"<Mul>
<Parenthesis>::=<Mul>|
                "("<Add>")"
<ResultProduction>::=<Parenthesis>"+"<Parenthesis>|
                     <Parenthesis>"-"<Parenthesis>|
                     <Parenthesis>"*"<Parenthesis>|
                     <Parenthesis>"/"<Parenthesis>|
```

## 4. 现代语言的特例（大部分编程语言的主体可以大致认为成上下文无关文法）
* C++中，`*`可能表示乘号或者指针，具体指哪个，取决于`*`号前面的标识符是否被声明为类型。
* VB中，`<`可能是小于号，也可能是XML直接量的开始，取决于当前位置是否可以接受XML直接量。
* Python中，行首的tab符和空格根据上一行的行首空白以一定的规则被处理成虚拟终结符indent或者dedent。
* Javascript中，`/`可能是除号，也可能是正则表达式的开头，处理方式类似于VB，字符串模板中也需要特殊处理`}`，还有自动插入分号规则。

## 5. js类型
* Number:IEEE754 float表示方法
* String:ASCII、Unicode字符集、UTF编码方式
* Boolean：true false
* Null
* undefined：用void(0)代替undefined进行undefined赋值
* object
* symbol

## 6.[JavaScript对象分类](https://www.bbsmax.com/A/kmzLQxbGJG/)