---
layout: post
title: Flex box styles in CSS
description: This article is a simple guide of flex box, and the advantages of flex box, how we use that, and some code and demos.
tags: [CSS, Flex box]
---

可能是自己对Flex box的全部理解了。

# Background

[**Flex box**](https://developer.mozilla.org/en-US/docs/Glossary/Flex)，也叫”弹性盒子“，目的是更高效的创建布局、对齐方式、动态处理剩余空间等问题。

在Flex box之前，float和position被广泛的使用在布局里面，但是处理以下三个问题时会非常棘手：

* 在父容器里垂直居中一个块元素

* 动态设置子项等量宽度/高度，无论还有多少剩余空间。

* 多列布局中所有子项高度相同，而不管子项实际内容

对于以上问题，Flex box处理起来可谓是得心应手，而现在各浏览器对于flex box的支持也很好了，点击[Can I Use链接](https://caniuse.com/#search=flex)查看是否支持，所以，使用flex box会帮助我们更快地解决问题，提升开发效率和可维护性。

当然，flexbox并不是万能的，搭配position使用效果更佳！

## Basics and Terminology

* [**容器(Container)**](https://developer.mozilla.org/en-US/docs/Glossary/flex_container)和[**项(item)**](https://developer.mozilla.org/en-US/docs/Glossary/flex_item)

* 容器有两个轴，主轴(main axis)和交叉轴(cross axis)，默认主轴是水平方向，交叉轴永远和主轴垂直，正方向是向右或者向下，reverse方向是向左或者向上。

* 可以随意安排子项，顺序而不用改变文档结构。

* 对于容器和项，有不同的职责和属性。

* flex box是方向无关的，对比HTML元素，div等块级元素默认是垂直排列的，span等内联元素默认是水平排列的

![Flex Box]({{ "/images/flexbox.png" | absolute_url }})

### Flex容器属性

* [**flex-direction**](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction): 主轴的排列方向，默认row

```CSS
.container {
    flex-direction: row | row-reverse | column | column-reverse;
}
```

* [**flex-wrap**](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap): 换行方式，默认nowrap

```CSS
.container {
    flex-wrap: nowrap | wrap | wrap-reverse;
}
```

* [**flex-flow**](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-flow): `flex-direction` 和 `flex-wrap` 的简写形式

```CSS
.container {
    flex-flow: <flex-direction> || <flex-wrap>;
}
```

* [**justify-content**](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content): 项目在主轴的排列方式

```CSS
.container {
    justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
}
```

**space-around**: 每个item等分空间，然后每个item的左右相等，也就是说两个item中间的空间是最左/右侧空间的两倍。

**space-between**: 两侧item紧挨着边界，中间剩余空间平分。

**space-evenly**: 剩余空间数量为item的数量+1，均分。

* [**align-items**](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items): 控制交叉轴item的排列

```CSS
.container {
    align-items: stretch | center | flex-start | flex-end;
}

```

* [**align-content**](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content): 定义交叉轴上剩余空间分布

```CSS
.container {
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

注意： 仅当存在多轴线时有效！也就是说 **flex-wrap**为nowrap的时候，不会产生多线，这个效果也就没用。

### Flex项属性

* [**align-self**](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self): 设置单个项和其他项不同排列方式

```CSS
.item {
    align-self: stretch | flex-start | flex-end | center;
}
```

会覆盖`align-items`属性。

* [**order**](https://developer.mozilla.org/en-US/docs/Web/CSS/order): 在同一容器内重新排列元素顺序，值为整数

```CSS
.item {
    order: <integer>
}
```

* [**flex-grow**](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow): 项的放大比例

```CSS
.item {
    flex-grow: <integer>
}
```

当所有项初始化之后，还有剩余空间时，`flex-grow`才会生效；

默认值为0，即即使存在剩余空间，也不会放大；

如果存在剩余空间，容器内所有设置`flex-grow`的项根据权重进行分配剩余空间；

如果所有项以`flex-basis`排列后，主轴空间不足，并且`flex-wrap: nowrap`时，需要配合`flex-shrink`使用。

* [**flex-shrink**](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink): 项的缩小比例

```CSS
.item{
    flex-shrink: <positive-number>
}
```

缩小方式和放大方式类似。

那么问题来了： 缩小后的值是多少？计算方式是什么？

[Stack Overflow链接](https://stackoverflow.com/questions/36550840/how-to-calculate-flex-shrink-when-flex-items-have-a-different-flex-basis)，能否看懂就看各位的造化了...

我说几句自己的理解：缩小算法和缩小因子因子有关，也和所有的项的`flex-basis`的和与父容器`width`(或者`height`，取决于`flex-direction`)的差值大小有关，总之是一个比较复杂的计算方式，对于不能FQ的朋友们，我把原作者的解释代码放在下面👇，供大家参考学习。

算法👇

```JavaScript
let sumScaledShrinkFactors = 0,
    remainingFreeSpace = flexContainer.innerMainSize;
for (let item of flexItems) {
    remainingFreeSpace -= item.outerFlexBasis;
    item.scaledShrinkFactor = item.innerFlexBasis * item.flexShrinkFactor;
    sumScaledShrinkFactors += item.scaledShrinkFactor;
}
for (let item of flexItems) {
    let ratio = item.scaledShrinkFactor / sumScaledShrinkFactors;
    item.innerWidth = item.innerFlexBasis + ratio * remainingFreeSpace;
}
```

公式👇

```JavaScript
flexBasis * (1 + shrinkFactor / sumScaledShrinkFactors * remainingFreeSpace)
```

例子👇

```JavaScript
1*600px + 1*200px ─┐               width 
                   │              ───────
600px * (1 + 1 / 800px * -200px) = 450px 
200px * (1 + 1 / 800px * -200px) = 150px 
                            │     ───────
600px - (600px + 200px) ────┘      600px 
```

* [**flex-basis**](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis): 项初始主轴大小(main size)

```CSS
.item {
    flex-basis: auto | <width>
}
```

当`flex-basis`设置了值之后，项的`width` or `height`(取决于主轴方向，主轴方向的值)会失效；

当设置为`auto`时，项的`width` or `height`才会生效。

* [**flex**](https://developer.mozilla.org/en-US/docs/Web/CSS/flex): `flex-grow`、`flex-shrink`和`flex-basis`的简写

```CSS
.item {
    flex: auto | none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

两个快捷值： `auto(1 1 auto)`和`none(0 0 auto)`;

`flex-grow`和`flex-shrink`不会同时起作用；

flex项如果`flex-grow`、`flex-shrink`都设置了，无论`flex-wrap`是`wrap`还是`nowrap`，所有的项就会撑满容器，也就是说，只要有剩余空间，`flex-grow`就会起作用，只要空间不足，`flex-shrink`就会起作用。

## Reference

* [30分钟学会Flex布局](https://zhuanlan.zhihu.com/p/25303493?refer=learncoding)，首发于知乎专栏。

* [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)，英文，作来自css-tricks.com。

* [MDN - Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)，MDN英文，可以选择看[中文版](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox)。

* [Bootstrap v4](https://getbootstrap.com/docs/4.1/utilities/flex/)，Bootstrap v4提供了快速使用flex的工具。

* [Flexbox froggy - A game for learning CSS flexbox](https://flexboxfroggy.com/)

## Code Repository

示例内容详见[GitHub Link](https://github.com/fattypiggy/flex-box-demo)。