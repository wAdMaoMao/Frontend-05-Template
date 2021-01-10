<!--
 * @Descripttion: 
 * @version: 
 * @Author: voanit
 * @Date: 2020-09-27 18:37:12
 * @LastEditors: voanit
 * @LastEditTime: 2021-01-10 15:55:30
-->
# 学习笔记

## CSS属性分类

### 1、文本/字体/颜色

#### （1）字体类
* font-family：指定字体；需要考虑客户端机器上是否装有字体；可以排列多个字体，用逗号分隔，如果有空格用引号分隔；最后一个建议放通用字体名，这个属性只有几个选项：serif | sans-serif | cursive | fantasy | monospace。
* font-size：字体大小，要注意有绝对大小，相对大小，长度，百分比；一般建议采用相对大小，即em或者rem
典型的长度单位。
* font-style：正常体、斜体、倾斜体。
* font-weight：设置粗体。
* font-variant：用来将所有字体都变成大写，但是原来是大写的字体呢又要比默认的要大一些。
* font：简写形式，如上所有跟字体相关的字体混合在一起；font-family是必选的，而且一定要在最后；font-size如果有，必须出现在倒数第二个，后面可以用/跟一个 line-height的设置；剩下的font-style，font-weight，font-variant就无所谓了，前面任意排列font还支持一些类似caption、icon等快捷描述。
* line-height：一个数字，默认差不多为1.2，有normal/数字/长度/百分比。
一般建议使用纯数字，用长度和百分比都在某些特殊情况下超出预期，即子元素的行高被父亲元素设置了，同时子元素还有默认的浏览器字体设置的场景。
* font-size-adjust：不太常用属性，用来设置英文字体的大小写字母之间的高度比例的。
#### （2）文字类
* word-spacing：词和词之间的距离，默认值是由字体来定的，自定义可以定义为长度/百分比，对于中文来讲，也是空格。
* letter-spacing：字母和字母之间的距离，默认值是由字体来定的，可以自定义为长度单位。
* word-break：文字换行逻辑。
* word-wrap/overflow-wrap：normal/break-word。word-wrap是overflow-wrap的别名。
* vertical-align: 上下对齐方式。
* text-align: 左右对齐方式。
* text-transform：大小写转换。
* text-shadow：阴影设置，可以设置阴影的颜色，相对原字体的位置，以及模糊半径。
* text-decoration：设置颜色、位置、样式。
* text-indent：缩进，段落第一行文本要空多少距离，单位为长度。
* text-justiy：在text-align被设置为justiy的时候用来控制是在单词之间加空格(英文)，还是在字母之间加空格(中文)。
* text-overflow：文本溢出的截断，可以用'...'来代替，或者用自己定义的字符串来代替超出字符，需要配合 overflow: hidden 的属性来控制，否则还是会超出边距显示。
* white-space：控制空格符，"\t"，"\n"以及显示的时候是否折行显示的属性normal/nowrap/pre/pre-wrap/pre-line。
#### （3）颜色&背景类
* color：背景颜色，关于眼色的值一共有三种，枚举值，#xxx, rgb, hsl。
* opacity：不透明度，即设置颜色的透明的程度，0为透明，1为不透明，单独的属性设置和用color的rgba函数来设置都一样
* backgroud-color：背景颜色
* backgroud-image：可以指定多个图片，第一个图片最接近用户，border会最后绘制
* backgroud-clip：背景图片延伸到盒子模型的范围，到文本、到边框内沿，到边框外沿
* backgroud-origin：跟backgroud-clip类似，只是只作用域backgroud-image, 可以取值为border-box, padding-box, content-box
* backgroud-position：背景图片的位置，可以设置为枚举值，也可以设置为相对于左上角的坐标，分别为长度单位，这个值一般要跟backgroud-repeat: no-repeat配合使用
* backgroud-size：设置背景图片的大小，可以控制压缩或者截断或者比例
* auto：自动
* cover：图片做截断，装满背景，但是背景图片可能显示不全
* contain：图片不做截断，但是有可能装不满背景，还可以指定长宽来按照指定的比例来缩放背景图片
* backgroud-repeat：不重复；沿着x,y轴重复（最后一个图片可能会被截断）；图片不截断，但是中间留空隙；图片不截断，同时拉伸/压缩图片保证图片之间无空隙；
* backgroud-attachment：背景图片是否随着鼠标滚轮而变动位置
* backgroud：如上各个backgroud开头的属性的组合，组合比较自由，一共8个元素：backgroud-color必须出现在最后；盒子属性有backgroud-clip, backgroud-origin，可以出现0,1,2次；backgroud-size必须出现在backgroud-position之后，用/连接backgroud-image, backgroud-position, backgroud-size, backgroud-repeat, backgroud-attachment 可以任意出现。
#### （4）文字连接&鼠标样式
* a:link 文字连接默认格式； a:visited 访问过后的链接样式；a:active 鼠标点击时候的样式；a:hover 鼠标移动上去的样式；
* cursor：鼠标样式；pointer 变为手；progress：请等待；wait：系统繁忙；move：拖拽；not-allowed：不能执行。
### 2、大小/布局
#### （1）大小属性
* width/height：包含了width，max-width，min-width几个配套的属性，值为长度/百分比；同时还可以设置一些属性值，用于表达width用于内容级别，还是border级别等；
* max-width/max-height：最大宽度/高度
* min-width/min-height：最小宽度/高度
#### （2）盒子模型类
* border：包含了粗细、样式、颜色。
* border-width：可以有1~4个长度值。1个代表4个边；2个的话代表横边和纵边；3个代表上，左&右，下；4个代表上，右，下，左
* border-style：可以有1~4个枚举值。跟text-decoration类似，可以有实线、双实线、虚线、点虚线、波浪线等，还可以有浮雕、陷入、突出等效果；
* border-color：可以有1~4个颜色值。
* border-image：可以用来设置边框的图片，用来显示一些比较漂亮的边框，图片选择哪些部分来作为边框请参考这里
* border-radius：用来设置圆角的
* box-shadow：边框的模糊划效果，跟text-shadow是类似的效果，可以设置阴影相对位置/阴影模糊半径/扩散半径/阴影颜色；
* outline：outline跟border类似, 是画边框的，跟border的区别是：不占盒子模型宽度; 可能不是矩形;准确来说, outline应该不算是盒子模型的属性；跟border类似有, outline-style, outline-color, outline-width三个子属性
* margin/padding：外边距，内边距的属性，可以有1~4个值，不同个数的值代表函数同边；
* margin-top/margin-bottom/margin-left/margin-right：对应的控制4个边的外边距的属性
* padding-top/padding-bottom/padding-left/padding-right：对应的控制4个边的内边距的属性
#### （3）基础定位类
* float：浮动属性
* clear：清除浮动
* position：位置类型；top/left/bottom/right：如果设置了position为非static的话，就可以设置这几个值来调整div的相对位置
* display：显示类型
* visibility：是否显示，设置为hidden则不显示，跟display:none最大的区别就在其还是会占据空间；还有个跟表格相关的collapse的选项；
* overflow：visible(默认值), 会显示出来；hidden, 不显示了；scroll，增加滚动条；auto，交给浏览器来判断是否装得下，装不下就加滚动条；
* clip：用来剪切一个形状的属性，可以剪切为圆形，不规则多边形，圆弧等形状
* transform：对元素属性主要是用来对某个元素进行旋转，偏移等，demo效果请参考这里。
* z-index：元素层叠关系
* opacity：透明度
* transform
#### （4）多列属性
* columns：像论文一样将文章按照多列的方式来展示，可以分成任意多列；
* column-count：分成几列来显示文本
* column-gap：每一列之间的间距大小
* column-rule：每一列之间的间隔样式(类似border)
* column-span：可以将某段文字横跨所有列, 比如标题，或者将文章分成几个格子来展现
* column-width：每一个列的宽度；
#### （5）Flex布局
* 父亲元素设置
display:flex：将父亲设置为 flex 弹性布局
flex-direction：row(从左往右), row-reverse(从右往左), column(从上往下), column-reverse(从下往上)
主轴：以从左往右为例, 就是左->右;
交叉轴：就是垂直于主轴的方向，以rtl为例, 就是上->下；
起始和终止：以左->右布局为例, 起始就是左边交叉轴->右边交叉轴;
主轴和交叉轴概念很重要，因为各种属性都是控制区块是如何在主轴和交叉轴上面分布的；
flex-wrap：沿着主轴的元素如果超出父元素宽度之后，是否自动折行显示新子元素，默认不折行，直接超出父元素显示；
wrap：换行；nowrap：不换行；
flex-flow：将flex-direction和flex-wrap合起来的简写属性；
元素对齐与空间分配
align-items：元素在交叉轴上的高度控制
flex-start：顶部对齐，不自动拉伸高度
felx-end：底部对齐，不自动拉伸高度
center：中间对齐
stretch：默认值，自动拉伸占满所有高度
justify-content：在主轴上的布局方式
flex-start：靠左对齐
flex-end：靠右对齐
center：居中
space-round：平均分布，左右也留白
space-between：平均分布，左右对齐边界
align-content：对于多行的flex容器设置行与行之间的排布
* 子元素宽度属性
flex-bias：用来决定子元素的初始长度
默认为auto，意思是让浏览器来决定宽度，如果设置了width，就用；否则就浏览器自己计算；
也可以人工指定绝对值或者百分比（相对父亲），用来手动指定宽度
flex-grow：一个绝对的数字，如果子元素之和没有父元素宽的话，就用这个数字的相对比例来决定每个元素如何分配剩下的空间
flex-shrink：跟flex-grow类似，只不过是子元素之和大于父元素的时候，怎么压缩，不过压缩不会无限制压缩，每个元素都会有个最小宽度。
具体grow和shrink在实际应用当中的表现可以参考这里
flex：如上三个属性的简写，可以为枚举值或者1~3个数字
auto：相当于1 1 auto，即自动伸长，也自动伸缩，宽度由浏览器决定
initial: 默认值, 相当于0 1 auto, 即不自动伸长，但是自动收缩，宽度由浏览器决定
none：相当于0 0 auto，即不自动伸长，也不自动收缩，宽度由浏览器决定
如果是一个值：
如果是一个无单位的数，会被当成flex-grow的值
如果是一个长度/宽度单位，会被当成flex-bias的值
如果是两个值：
第一个值必须是一个无单位的数，当成是flex-grow的值
第二个值可以是：
一个无单位的数，当成是flex-shrink的值
一个长度/宽度单位，会被当成是flex-bias的值
如果是三个值
第一个值必须是无单位的数，会被当成flex-grow的值
第二个值必须是无单位的数，会被当成是flex-shrink的值
第三个值必须是长度/宽度单位或者枚举值，被当成flex-bias的值
占据高度设置
align-self：在子元素上面设置元素在交叉轴上面的高度控制
默认为父亲的align-items的值
如果设置了，就覆盖父亲的值，值得取值范围和含义跟align-items一模一样
排序设置
order：如果子元素设置了该属性，则各子元素按照order值排序，否则按照文档出现的先后顺序排序
### 3、网格
#### （1）网格布局
网格布局跟Flex弹性布局是类似的，都是css3新出的属性。Flex主要针对的是单行的布局，一般不会换行。Grid主要针对的是表格类多行布局，可以将其想象成在css中控制类似excel的表格。相比于普通的html中的table布局，Grid布局一方面主要是在 css 中控制表格效果，另一方面是在合并单元格方面比表格布局会更灵活。
* 父元素属性
display: grid：将父亲设置为表格布局属性，所有其直属儿子都会按照表格方式布局
grid-template-columns：将表格分为多少列
可以直接写100px, 100px, 100px 将表格分为三个 100px 的列
也可以写 1fr, 1fr, 1fr 将表格均分为三个相同的列，主要 fr 是专门为grid布局新出的一个单位
也可以写 repeat(3, 1fr) 达到跟上面一样的效果，这样可以减少书写的量
还可以为每条线命名，这样儿子就可以不用坐标，而用名字来定位，有的时候这样代码会更可读一些，比如
grid-template-columns: [main-start] 1fr [content-start] 1fr [content-end] 1fr [main-end];
grid-template-rows：将表格分为多少行，同上
grid-auto-rows：设置每一行的高度，可以用minmax(100px, auto)来设置为最少100px, 最高就让浏览器自己设置
grid-auto-columns：同grid-auto-rows
grid-column-gap：列与列之间的宽度，一个长度单位
grid-row-gap：行与行之间的宽度，一个长度单位
grid-gap：如上两个属性的简写
如果只有一个值，会同时应用到行与列的间距
如果有两个值，第一个用到行，第二个用到列
grid-template-areas：这个是基于命名网格的定位， 在该属性中将所有单元格属于哪个儿子都写出来，详情请参考这里
* 子元素属性：子元素定位默认是从左到右，从上到下，按照单元格依次排布的。而Grid属性最大的作用就是可以弹性布局，即合并单元格，每个儿子可以指定自己所占据的单元格的区间。设置的方式有多种：
grid-column-start/grid-column-end/grid-row-start/grid-row-end：这四个属性就对应了横纵坐标轴(注意，是从1开始)
默认每个儿子只占一个单元格，所以如果只写了start，不写end的话，默认end就是start+1；同样，如果只写了end的话，start就是end-1
坐标可以设置为负数，即导数第几个坐标
grid-column/grid-row的简写，如下：
grid-column: 1 / 2
grid-row： 1 / 4
可以用span关键字来改为start/start+_span_的方式来设置单元格属性，这样可以专注单元格大小，示例如下：
grid-column: 1 / span 1
grid-row: 1/ span 3
效果跟上面两行效果是一样的
grid-area属性，如下：
grid-area：1 / 1 / 4 / 1
该属性是按照 上/左/下/右 的顺序来写的，跟margin正好是反方向的
### 4、动画属性
#### （1）animation
* animation-name：即指定的 keyframes 的名字，如上的例子就是 mymove
* animation-duration：动画的持续时间，我估计浏览器会根据这个时间来计算需要自动计算的帧数，因为人眼睛需要每秒24帧的变化才能显示出比较平滑的动画效果；
* animation-timing-function：动画的变化的速度曲线，可以是线性的，或者一开始慢后面快，或者反过来，或者先慢后快结束的时候再慢等选项，也可以通过指定三次贝塞尔函数 cubic-bezier(n,n,n,n) 来选择不同的动画效果；
* animation-delay：在动画开始之前的延迟；
* animation-iteration-count：默认为1，可以为任意整数，也可以设置为枚举值 infinite 从而无线循环；
* animation-direction：枚举值，默认为normal，即正常播放动画，可以设置为 alternate 该值得含义是奇数次正向播放，偶数次反向播放；当然，如果 animation-iteration-count 设置为1的话，该属性就没有意义了；
* animation-play-state：paused和running的枚举值，可以对动画进行暂停和继续的操作，类似视频播放的感觉；
* animation-fill-mode：在动画开始之前和之后属性的应用值；
* animation：综合如上所有属性的一个简写属性；各简写属性出现的顺序并没有明确规定，而且没有任何一个属性是必须的；只有时间的值可能会出现0，1,2次，当出现1次的时候表示的是 animation-duration 的值，如果出现2次代表的是 animation-delay 的值；可以有多组值，用逗号做分割，表示多个动画效果同时显示和起作用。
#### （2）transition
* transition-property：对该元素哪个属性的变化进行动画效果；当然，不是所有的属性都支持动画的，常见的位置、大小、颜色、以及旋转 之类的都是支持的；只要属性发生变化，都会实现动画效果，比如hover属性或者js变化属性
* transition-duration：动画的持续时间
* transition-delay：动画开始的延迟时间
* transition-timing-function：动画的速度函数，可以是匀速，也可以是变速，也可以是指定函数
* transition：是如上几个属性定的简写属性；几个属性出现的顺序没有明确规定，如果是时间字段的话，第一个是duration，第二个是delay-time。