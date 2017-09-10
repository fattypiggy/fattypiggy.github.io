---
layout: post
title: Angular核心概念之模块(Module)
description: "Angular核心概念之模块(Module)"
modified: 2017-08-27
share: true
comments: true
tags: [Angular]
image:
  feature: angular-3.svg
  credit: worldvectorlogo.com
  creditlink: https://worldvectorlogo.com/logo/angular-3
---

今天我们开始更新Angular核心系列专题，这仅是我个人学习Angular以来进行的一些总结和个人经验分享，并不是一个适合初学者的教程，
建议初学者还是先去[中文官网](https://angular.cn)了解Angular。闲话少说，我们直接进入正题。

### 初识Module
Angular的Module作用是把**Component**、**Pipe**、**irective**打包成内聚的功能块，封装和暴露相应的功能，从而达到模块间的解耦，高度自治的一种程序设计模式。
换句话说，Module对应的是业务和功能，Component对应的才是页面展示和交互。

我们使用[@NgModule](https://angular.cn/api/core/NgModule)来标记一个类，使之成为Angular模块类。下面是里面的常用元数据的功能和注意事项：

* **imports**数组：引用其他NgModule来配合工作(多次导入同一个模块不会有问题，因为Angular会优先搜索是否缓存过此模块。但是！！！如果有多个模块提供了相同的服务，那么后者取胜，但是如果根模块也提供此服务，根模块的会完胜！)
* **declarations**数组： 声明那些属于此NgModule的组件(Component、Pipe、Directive)
* **bootstrap**数组： 声明一个数组，变成自己组件树的根，通常只有一个Component。重点来了！！！只有跟模块才会声明此项！！！
* **exports**数组： 公布出去的类(可以是Component，也可以是Module)
* **providers**数组： 依赖注入的Service。这里还有一个注意事项，那就是Angular的设计理念就是以依赖注入方式注入进来的Service作用域是整个App，也就是说，在providers数组里面声明的Services，无论是根模块，还是子模块，他们共享同一个数组和执行环境(懒加载的模块除外！！！)

### 怎么样设计模块
在构建项目初期，如果能有一个精通框架设计的大神来搭建整个项目，把整个框架搭的条理清晰，模块划分合理，想必这样的项目应该是大家都喜欢干的。那么，接下来干活来了，我们不必完全依赖大神，或者说我们也有机会成为大神，只需要尽量遵守一下几点，人人都是大神！
#### 模块应各司其职。
这和我们天天说的”高内聚，低耦合“的设计规范很像，减少模块间的依赖程度，尽量使其独立，这样做不仅有利于程序的维护，而且思路清晰，开发起来也很高效。举个例子，根模块AppModule的职责是什么？项目的引导和初始化，至于其他的功能比如Http，I Don't Care...
#### 特性Module
带路由组件的特性Module，标准做法是自己去定义路由。既然孩子(子组件或者特性组件)都有行事能力了，做父亲的根Module就别瞎掺和了...
#### 创建Core Module和Shared Module
Core Module： 应用启动时导入
Shared Module： 公共的**Component**、**Directive**、**Pipe**

### 推荐

推荐链接->[Angular模块常见问题](https://angular.cn/guide/ngmodule-faq#q-declarable)，建议所有Angular新手老手仔仔细细去阅读里面的内容，他会让你对Angular的模块有重新的认识，也能从中体会到Angular设计者的高明之处。

推荐链接->[Angular-Module官方Guide](https://angular.cn/guide/ngmodule)，在这里你会看到一个小demo是如何变得越来越模块化的。

### 未完待续
* 路由相关
* 模块的懒加载与路由配置
* ...