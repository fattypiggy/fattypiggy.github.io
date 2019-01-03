---
layout: post
title: Angular随笔
description: Angular随笔
tags: [Angular]
---

最近，我在开发一个前端交互较为复杂的项目，其中好几个组件的ts文件已经超过1000行！仅仅处理其中的逻辑就已经很让我头大，更不要说去维护多人协作的老代码，再加上需求的变化，项目时间还很紧，种种因素，导致了代码的质量很低。所以，我想总结一下自己在开发过程中遇到的“坑”，分享一下自己的想法，也想探讨一下更好地解决方案。

# 遇到的坑

* 场景：因为Angular的onChanges检测机制，如果父组件向子组件里传递的是对象，也就是引用传递，只改变对象的某些属性，是不会被检测到的。那么，问题来了：如果一个数组里的某个对象的某个属性变化了怎么办？子组件里是不会进行数据更新的，也就是页面不会刷新。

我现在的解决办法是：声明一个Service，父子组件共用，然后在Service里保存一个Subject，父组件里属性发生变化，触发

```JavaScript
subject.next(item)
```

然后，在子组件里订阅

```JavaScript
subject.subscribe(item => {
  doSomething()
})
```

由于[Subject](http://reactivex.io/documentation/subject.html)在RxJS里扮演着一个重要的角色，即既是观察者(observer)，又是可观察对象(Observable)。

Angular官方推荐使用Observable代替Promise进行异步操作，就像是TS是JS的超集，Observable也可以很简单的转换成Promise，而且Angular本身也使用观察者设计模式。

Observable的具体使用方法和一些技术细节未完待续...

## 边用边学Angular

* Angular路由

以前一直不十分清楚 `path: "**"`，原来是通配符，在所有路由都不满足的情况下，才会使用次路由配置，建议放在路由配置表的最下面。另外，路由配置不建议以`/`开头，因为斜线开头是绝对路径，尤其在有子路由`children:[]`配置时，会导致路由结果错误，建议使用相对路径路由。


子路由还会继承父级组件里的`params`(如果被废弃请使用`paramMap`)和`data`。

路由匹配规则默认`prefix`，也可以设置`full`。