---
layout: post
title: Flex box styles in CSS
description: This article is a simple guide of flex box, and the advantages of flex box, how we use that, and some code and demos.
date: 2018-08-19
tags: [CSS, Flex box]
---

可能是自己对Flex box的全部理解了。

# Background

[**Flex box**](https://developer.mozilla.org/en-US/docs/Glossary/Flex)，也加”弹性盒子“，目的是更高效的创建布局、对齐方式、动态处理剩余空间等问题。

在Flex box之前，float和position被广泛的使用在布局里面，但是处理以下三个问题时会非常棘手：

* 在父容器里垂直居中一个块元素

* 动态设置子项等量宽度/高度，无论还有多少剩余空间。

* 多列布局中所有子项高度相同，而不管子项实际内容

对于以上问题，Flex box处理起来可谓是得心应手，而现在各浏览器对于flex box的支持也很好了，点击[Can I Use链接]查看是否支持，所以，使用flex box会帮助我们更快地解决问题，提升开发效率和可维护性。

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

* [**flex-flow**](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-flow): **flex-direction** 和 **flex-wrap** 的简写形式

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

## Reference

* [30分钟学会Flex布局](https://zhuanlan.zhihu.com/p/25303493?refer=learncoding)，首发于知乎专栏。

* [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)，英文，作来自css-tricks.com。

* [MDN - Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)，MDN英文，可以选择看[中文版](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox)。

* [Bootstrap v4](https://getbootstrap.com/docs/4.1/utilities/flex/)，Bootstrap v4提供了快速使用flex的工具。

## Code Repository

示例内容详见[GitHub Link](https://github.com/fattypiggy/flex-box-demo)。