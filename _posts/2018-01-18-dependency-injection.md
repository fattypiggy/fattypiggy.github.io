---
layout: post
title: Angular依赖注入-Dependency Injection
description: "Angular依赖注入-Dependency Injection"
modified: 2018-01-18
share: true
comments: true
tags: [Angular]
image:
  feature: angular-3.svg
  credit: worldvectorlogo.com
  creditlink: https://worldvectorlogo.com/logo/angular-3
---

2018年继续来搞Angular！

# 什么是依赖注入？

根据[维基百科](https://zh.wikipedia.org/zh-hans/%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)，依赖注入(Dependency Injection)是种解决项目依赖性的设计模式，
好处有大致以下几点：

* 各模块间的解耦
* 代码容易维护
* 开发者无需关注依赖的生产过程，拿来即用

## Angular中的DI

Angular的依赖注入有三个重要概念：

* 注入器(Injector)
* Provider
* 依赖(Dependence)

注入器连接了调用方和提供方，使得开发人员很轻松的实现依赖注入。(注：Angular框架已经实现了注入器的生成和调用，并不需要开发者去实现)

### 注入服务

1. 通过import导入被依赖对象的服务
2. Angular读取 **@Component** 或 **@Injectable** 或 **@Module** 装饰器里providers元数据
3. 在组件构造函数中声明

这样几步，此组件及其子组件都能共享根组件创建的实例，如果子组件或模块不想复用从根组件获取的服务，可以在自己的注入器中重新配置注入(层级注入)。

需要注意的是：

* Angular没有模块级别作用域，只有程序级和组件级作用域
* 对于不同的执行上下文，有着不同的注入器，并且执行上下文中的每个依赖对象都是单例的
* 后面初始化的服务会覆盖前面初始化的服务
* 由于组件本身是一个类，类有继承关系，但是派生类组件不能继承父类组件的注入器，二者的注入器对象并没有关联，需要使用 *super()* 将对应的注入服务传递到父类
* **@Host** 与 **@Optional**等装饰器的巧妙使用会带来意想不到的惊喜

### Provider

Provider这种设计模式由来已久，在前后台各种技术领域中被广泛使用。它藐视了注入器如何初始化Token所对应的依赖服务，最终注入到组件或者其他服务中。

#### Provider注册方式

* 类Provider

对于调用者来说，业务代码和接口没有改变，从而带来极大的便利

```typescript
{provider: Render, useClass: DomRender} //DOM渲染方式
//{provider: Render, useClass: CanvasRender} //Canvas渲染方式
//{provider: Render, useClass: ServerRender} //服务端渲染方式
```

* 值Provider

实际项目中，以来的对象不一定是类

```typescript
{provider: 'name', useValue: 'William Jing'}
```

* 别名Provider

实现多个依赖，一个对象实例的所用，例如为了让新旧服务同时可用，新服务兼容老服务，可以使用此种注册方式

```typescript
{provider: NewService, useClass: NewService}
{provider: OldService, useExisting: NewService}
```

* 工厂Provider

有时候依赖对象是动态变化的，可能需要环境、执行权限来生成，工厂Provider可以提供解决这个问题，通过暴露一个工厂方法，返回一个最终的依赖对象

```typescript
let contactServiceFactory = (_logger: LoggerService, _userService: UserService) =>{
  return new contactService(_logger, _userService.user.isAuthorized)
}
```

```typescript
export let contactServiceProvider = {
  provider: ContactService,
  userFactory: contactServiceFactory,
  deps: [LoggerService, UserService]
};
```