---
layout: post
title: Angular生命周期钩子
description: "Angular生命周期钩子"
date: 2017-12-24
tags: [Angular]
cover: angular-3.svg
---

🎅🎅🎅提前祝Merry Xmas🎅🎅🎅

# 简介

Angular内部管理组件或指令的生命周期，给我们提供了一些接口(这些接口被称为生命周期钩子)来在允许开发者在这些事件触发时，执行相应的回调函数。

Angular一共提供了8个生命周期钩子接口，每个接口有一个唯一的前面加上‘ng’的方法，开发者可以根据实际情况实现其中的一个或者几个来对生命周期的各个阶段进行自定义处理。

## 图示

下图是Angular钩子方法执行顺序

![hooks-in-sequence]({{ "/images/hooks-in-sequence.png" | absolute_url }})

## 钩子方法

* *ngOnChanges()*

首次调用发生在ngOnInit之前，并且，当且仅当组件**输入数据**变化时被调用，**输入数据**指的是通过**@Input**装饰器显示指定的那些变量。

* *ngOnInit()*

创建组件之后立刻调用，经常会使用ngOnInit获取数据。

* *ngDoCheck()*

用于变化监测那些Angular忽略的更改，每次变化监测发生时被调用

* *ngAfterContentInit()*

在组件中使用'ng-content'自定义内容的情况下在第一次ngDoCheck执行后调用，只执行一次

* *ngAfterContentChecked()*

Angular将外部内容嵌入到组件视图后，每次变化监测都会调用ngAfterContentChecked

* *ngAfterViewInit()*

Angular创建了组件的视图以及其子视图之后被调用

* *ngAfterViewChecked()*

视图以及其子视图第一次初始化之后和每次变化监测时被调用

* *ngOnDestroy()*

组件消失之前调用。根据官方文档描述，这里是用来释放那些不会被垃圾收集器自动回收的各类资源的地方。 取消那些对可观察对象和DOM事件的订阅。停止定时器。注销该指令曾注册到全局服务或应用级服务中的各种回调函数。 如果不这么做，就会有导致内存泄露的风险。

## 注意事项

* constructor并不是生命周期钩子，而是Class级别的构造函数，constructor总是在所有钩子函数执行前执行
* 接口是可选的，也就是说不必在Component或Directive后面加上implements...但是，官方还是强烈建开发者在指定类中添加接口以获得强类型和IDE编辑器带来的好处
* 有的组件还提供了自己特有的生命周期钩子
* 可能有人会问，为什么不在constructor里获取数据？是因为构造函数做的事应该尽可能简单，比如变量的初始化，不应该负责组件里的内容
* 绝大多数情况下ngDoCheck和ngOnChanges不应该一起使用
* ngDoCheck要慎用，因为每个检测周期内，无论数值是否发生变化，ngDoCheck都会被调用，导致调用非常频繁，所以我们的实现要必须非常轻量级
* ngOnChanges如果输入属性是对象的话，只会检测对象的引用是否变化，而不会去监测对象属性的变化
* AfterContent和AfterView一共4个钩子是组件专属的，不适用于指令

## 参考链接

[中文官方文档](https://angular.cn/guide/lifecycle-hooks)

[在线例子](https://embed.plnkr.co/?show=preview)