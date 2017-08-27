---
layout: post
title: Angular
description: "关于Angular的个人拙见"
modified: 2017-08-20
share: true
comments: true
tags: [Angular]
image:
  feature: angular-3.svg
  credit: worldvectorlogo.com
  creditlink: https://worldvectorlogo.com/logo/angular-3
---

作为一个"实干家"，我决定在接下来的一段时间开一个关于Angular的专题，
一是为了记录自己学习心得，
二是在工作闲暇之余，有东西和大家进行交流探讨，互相提高。

### 背景
谈到[Angular](https://angular.io/)，不得不先提及一下[SPA(Single Page Application)](https://en.wikipedia.org/wiki/Single-page_application)。SPA和一般的Web应用有一个只看名字就能知道的重要的区别，
那就是SPA只有一个"页面"。敲黑板！！！这里的一个页面指的是只从服务端拿一次HTML页面，同时服务端也会返回一个作为"控制器"的js文件，
所有的除了向服务端获取数据或者是验证用户权限等其他功能，都在前台完成，这样做的好处就是大大减轻服务器的压力，Gmail和Twitter等
互联网公司也都大量使用了SPA。

Angular作为AngularJS的升级版，无论从设计理念上，还是效率上都有很大的进步。其模块化的设计符合现代应用开发的趋势，在和后端进行交互上，也能和当今
微服务框架有很好的配合，同时也符合TDD（Test-Driven Development）的特点。

Angular作为Google系前端框架，和Microsoft的TypeScript的强强联合，带着英雄所见略同的架势，自然吸引了全世界开发者的注意，Angular整个
庞大的生态系统拔地而起：IDE，Tooling，UI components，Cross-Platform Development，以及各种活跃的社区...具体内容详见[Angular官方资源](https://angular.io/resources)。

### 内容
Angular核心内容包括如下几个部分：
* [模块(Module)](http://williamjing.com/2017/08/27/angular-module.html)
* 组件(Component)
* 模板(Template)
* 指令(Directive)
* 服务(Service)
* 依赖注入(Dependency Injection)
* 数据绑定(Data Binding)

我会围绕以上内容进行展开，大致包含少量的用法讲解，更多的是我对其的理解和一些注意事项。
因为本人水平有限，如遇到和[官方文档](https://angular.io/docs)有偏差，还以官方为准。

### 准备
在分享Angular之前，我们需要了解基本的前端知识包含HTML、CSS，掌握或是精通[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)，了解[TypeScript](https://www.typescriptlang.org/docs/home.html)语法以及面向HTTP服务的[RxJS](http://reactivex.io/rxjs/)和响应式编程。

### 环境
为了更好地配合日后内容中的代码的兼容性，我列举如下环境供大家参考：

* MacOS (10.12.6)
* node (6.10.3)
* NPM (5.3.0)
* Angular (4.3.5)
* @angular-cli (1.3.1)

### One More Thing
此博客开通了Disqus评论功能，国内被屏蔽，如果想与我进行交流，请自行科学上网，或发邮件给我，我会尽快回复。
