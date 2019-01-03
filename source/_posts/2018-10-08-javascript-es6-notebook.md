---
layout: post
title: JavaScript(ES6)笔记
description: 不仅仅是ES6
tags: [JavaScript, ES6]
---

上个月总结了CSS一些东西，今日开始写JavaScript部分。

# Notes

* 变量的结构赋值作用

1. 交换变量

```JavaScript
let x = 1;
let y = 2;
[x,y] = [y,x];
```

不用再创建临时变量了✌️

2. 从函数返回多个值

```JavaScript
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```

也可以解析数组型数据

3. 函数参数

```JavaScript
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

有序、无序传参都很方便

4. 解构JSON

5. 加载模块时选择方法也用到了解构

```JavaScript
const { SourceMapConsumer, SourceNode } = require("source-map");
```

6. 形参设置默认值

这点还是TS写起来舒服

## Reference

* [ES6入门](http://es6.ruanyifeng.com/)，阮一峰老师作品。

* [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)，MDN英文tutorial。

* [TypeScript](https://www.typescriptlang.org/)，结合TS看效果更佳。