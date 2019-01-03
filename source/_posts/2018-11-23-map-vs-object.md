---
layout: post
title: Map vs Object
description: What's the difference between Map and Object?
tags: [JavaScript, ES6]
---

# What's the difference between Map and Object?

对于这个问题，前段时间我就查过相关的信息，今日做一下总结(翻译)。参考链接在全文最下方。

ES6加入了被大众翘首期盼的*Map*数据结构类型，存储类型是<*key*, *value*>键值对，和JS中原生*object*中间键值对很像但是又不相同。

1. *Map*中的*key*可以是**任意类型**。而*object*中的*key*只能是**string**或者[**Symbol**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)，或者先转换为string，再作为key。

    ```JavaScript
    console.log({100: "abc"}) // 100: "abc"
    console.log({1e2: "abc"}) // 100: "abc"

    for (key in {100: "abc"}){
        console.log(typeof key) // string
    }
    ```

2. *Map*实现了*iterable*接口，便于快速查找和遍历。

    ```JavaScript
    const myMap = new Map();
    myMap.set('0', 'foo');
    myMap.set(1, 'bar');
    myMap.set({}, 'baz');

    const mapIter = myMap[Symbol.iterator]();

    console.log(mapIter.next().value); // ["0", "foo"]
    console.log(mapIter.next().value); // [1, "bar"]
    console.log(mapIter.next().value); // [Object, "baz"]

    // the same result as top codes.
    for (const entry of myMap) {
        console.log(entry);
    }
    ```
3. *Map*中元素的顺序和插入顺序有关，*object*一般按照字母顺序。

4. *Map*继承自*Object*。

5. 使用`size`属性，可以快速获取`Map`的大小，而对于`object`需要手动维护。

6. 更多对比详见第一个参考链接，绝对好文，强烈推荐👍👍

# When to use Map? And when to use Object?

1. *object*适用于简单存储数据。

2. *object*和JSON无缝配合。

3. *object*里面可以写方法。

4. 如果需要频繁的增加或者移除键值对，*Map*是首选。

5. 如果数据量大，建议使用*Map*。

# Bonus

1. 怎么样判断一个类型是否实现了`iterable`接口？

    ```JavaScript
    //typeof <obj>[Symbol.iterator] === “function”
    console.log(typeof obj[Symbol.iterator]); //undefined
    console.log(typeof map[Symbol.iterator]); //function
    ```
2. [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)虽然可以作为*object*的*key*，但是此键值对不会出现在`for...in`等循环中，只能通过`Object.getOwnPropertySymbols()`来获取。

# Reference

* [ES6 — Map vs Object — What and when?](https://medium.com/front-end-hacking/es6-map-vs-object-what-and-when-b80621932373)

* [Stack Overflow - Map vs Object in JavaScript](https://stackoverflow.com/questions/18541940/map-vs-object-in-javascript)

* [MDN - Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)