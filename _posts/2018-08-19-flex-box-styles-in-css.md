---
layout: post
title: Flex box styles in CSS
description: This article is a simple guide of flex box, and the advantages of flex box, how we use that, and some code and demos.
date: 2018-08-19
tags: [CSS, Flex box]
---

可能是自己对Flex box的全部理解了。

# Background

Flex box，也加”弹性盒子“，目的是更高效的创建布局、对齐方式、动态处理剩余空间等问题。

在Flex box之前，float和position被广泛的使用在布局里面，但是处理以下三个问题时会非常棘手：

* 在父容器里垂直居中一个块元素

* 动态设置子项等量宽度/高度，无论还有多少剩余空间。

* 多列布局中所有子项高度相同，而不管子项实际内容

对于以上问题，Flex box处理起来可谓是得心应手，而现在各浏览器对于flex box的支持也很好了，点击[Can I Use链接]查看是否支持，所以，使用flex box会帮助我们更快地解决问题，提升开发效率和可维护性。

## Basics and Terminology

* 容器(Container)和项(item)

* 容器有两个轴，主轴(main axis)和交叉轴(cross axis)，默认主轴是水平方向，交叉轴永远和主轴垂直，正方向是向右或者向下，reverse方向是向左或者向上。

* 对于容器和项，有不同的职责和属性。

* flex box是方向无关的，对比HTML元素，div等块级元素默认是垂直排列的，span等内联元素默认是水平排列的

## Reference

* [30分钟学会Flex布局](https://zhuanlan.zhihu.com/p/25303493?refer=learncoding)，首发于知乎专栏。

* [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)，英文，作来自css-tricks.com。

* [MDN - Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)，MDN英文，可以选择看[中文版](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox)。

* [Bootstrap v4](https://getbootstrap.com/docs/4.1/utilities/flex/)，Bootstrap v4提供了快速使用flex的工具。

## Code Repository

示例内容详见[GitHub Link](https://github.com/fattypiggy/flex-box-demo)。