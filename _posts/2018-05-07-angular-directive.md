---
layout: post
title: Angular核心概念之指令(Directive)
description: "Angular核心概念之指令(Directive)"
modified: 2018-05-07
share: true
comments: true
tags: [Angular]
image:
  feature: angular-3.svg
  credit: worldvectorlogo.com
  creditlink: https://worldvectorlogo.com/logo/angular-3
---

因为最近事情比较多，平时上班处于饱和状态，晚上回家也已经很累了，加上周末要去运动放松，实在难找出一整块时间去整理学习(ㄒoㄒ)。有过原创博客经历的人都知道，去高质量的总结、分享一些知识点其实非常的费时间，就比如去年分享的[组件](https://www.williamjing.com/2017/09/10/angular-component.html)那篇，足足耗费了我一个下午，可是我还是觉得有很多细节没有表述清楚，加上我文笔一般，经常是想写的很多，但是打开编辑器就忘了思路...

虽然时间很紧，但我还是更倾向于高质量的总结和分享，年轻时要克服浮躁和焦虑，脚踏实地，稳步前进！

### 概述
Angular中的Directive分为三类:
* 组件(Component): 带有模板的指令
* 属性指令(Attribute Directives): 添加、删除DOM元素改变DOM结构
* 结构指令(Structural directives): 改变元素、组件、其他指令外观和行为

组件是一种特殊的指令，详见[组件](https://www.williamjing.com/2017/09/10/angular-component.html)。
本篇我们重点介绍另外两种指令。

常用的属性指令有内置的 **NgStyle** 和 **NgClass** 等用来改变元素的属性、样式，还有官方实例中的HighLight指令，用来高亮元素，等等。

常用的结构指令有内置的 **NgFor** 和 **NgIf** 用来改变视图的结构。

### 创建指令
创建一个指令最基本的操作:
1. 导入Directive装饰器(结构化指令还需要Input、TemplateRef和ViewContainerRef)
2. 设置CSS选择器，Angular会在文本中定位此选择器
3. 给指令类添加装饰器

未完待续...