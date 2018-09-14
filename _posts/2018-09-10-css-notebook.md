---
layout: post
title: CSS笔记
description: 
date: 2018-09-10
tags: [CSS]
---

> 子曰：三人行，必有我师。

又是一年教师节，祝福天下老师身体健康，桃李满天下。

虽说入行前端已经一年多，但是现在翻看自己“武器库”，发现前端三板斧样样都是半吊子，不能说不会，也不能说精通，总之就是基础知识欠佳。所以，我意识到这一点之后，决定近三期博文内容会专供基础知识，做到书读千遍，其义自见。

本着英语+编程的原则，我主要选择英文原版进行学习，一是锻炼英语能力，二是本来编程类英语就不难，有时候甚至比看翻译后的文章还要清晰和准确，直接看英文版何乐而不为呢？更何况最近看Google Analytics访问本站的人竟然大多数来自非汉语国家😂😂，这种情况甚至激起了我用英文直接写的冲动，我会认真考虑以后如果有机会直接用英文写点干(fei)货(hua)。

此篇文章主要参考：

* [W3Schools](https://www.w3schools.com/css/default.asp)，学习主要条目、规则、语法、用法、注意事项，需要翻墙。
* [MDN](https://developer.mozilla.org/en-US/docs/Glossary/CSS)，主要是延展阅读。

**CSS**(Cascading Style Sheets)，最新版为CSS3。近年来，随着移动互联网的蓬勃发展，CSS的内容也越来越多，标准的支持度也越来越高。所以记录一点tips和高级部分供自己日后复习巩固。

## Notes

* id和class命名不能以数字开头

* 上下部分的margin会发生坍塌，上下元素之间的margin会取两者之间的最大值，左右元素不会发生坍塌

* margin允许负值，padding不允许

* `box-sizing`决定总宽度是border(`border-box`)还是content(`content-box`)

* 推荐使用`em`和`rem`作为字体单位， 1rem = 16px，如果IE浏览器em单独使用有问题，可以配合百分比使用来达到兼容所有浏览器。

```CSS
body {
    font-size: 100%
}
```

* 当创建`<table>`时，配合`<thead>`和`<tbody>`比单纯的使用`<tr>`更好：1.语义；2.更容易CSS定制

* `display`属性：1.所有元素都有默认值；2.可以修改使block元素“看起来像”inline元素，但是不会改变行为，例如

```CSS
span {
    display: block;
}
```

但是这个span依然不能包含其他block元素。

* 隐藏元素有两种方式`display: none`和`visibility: hidden`：前者元素不会占据空间，后者会占据空间。

* position: 默认是`static`；`relative`是相对默认位置偏移，不脱离文档流；`fixed`是相对窗口位置，脱离文档流；`absolute`是相对于最近的设置过position属性(不包括默认`tatic`)的祖先元素进行偏移，如果没有设置过position的祖先，默认相对`body`;`sticky`会根据滚动位置从`relative`和`fixed`来回切换。

* 居中问题：1.<div>可以`margin:auto`水平居中(<div>需要设置`width`)；2.text外面的容器设置`text-align:center`可以使文本水平居中；3.通过在容器设置`padding`达到垂直居中(子元素可以是block，也可以是inline)；4.容器设置`line-height`和`height`相等，子元素设置`line-height`和`vertical-align: middle`也可以垂直居中；5.利用`transform`同样可以达到垂直居中。

* css combinators: 

1. `+`：相邻兄弟选择器

```CSS
div + p {
    background-color: yellow;
}
```

应用到紧跟着<div>后面的<p>元素

2. `~`：一般兄弟选择器，和相邻兄弟选择器唯一不同是不限于‘紧跟’。

3. ` `(空格)：后代选择器

```CSS
div p {
    background-color: yellow;
}
```

应用到所有<div>里包含的<p>元素，无论‘藏得多深’

4. `>`：子选择器：和后代选择器唯一不同的是只会应用到直接子元素。

* Pseudo-classes: 定义元素的特定状态