---
layout: post
title: canvas in Angular
description: Angular项目如何使用canvas
date: 2018-08-07
tags: [canvas]
---

# 学

最近手上有个项目很有意思，做的是什么先不说，总之用到了canvas、然后顺便好好学学flex布局、RxJS、还有SASS语法什么的，可能以后还有更多时间来谈另外的技术，反正就是学学学，才能不断进步。

## How to

* HTML Code

*myDiv* 和 *myCanvas* 是两个模板引用变量，使用模板引用是Angular的推荐做法，而不是直接操作DOM。

```HTML
<div #myDiv>
    <canvas #myCanvas [ngStyle]="{width: canvasW, height: canvasH}">
    </canvas>
</div>
```

* TS Code

要想使用canvas进行画图，先要创建一个上下文 *context*，然后使用draw()进行画图
使用RxJS监听窗口大小变化，然后再动态更改canvas的大小。

```javascript
@ViewChild('myDiv') myDiv: ElementRef<HTMLDivElement>;
@ViewChild('myCanvas') myCanvas: ElementRef<HTMLCanvasElement>;
context: CanvasRenderingContext2D;
subscription: Subscription;
canvasW: string;
canvasH: string;
constructor() { }

ngOnInit() {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.makeSubscription();
}

private draw() {
    // TODO
    console.log('draw method');
}

private makeSubscription() {
    this.subscription = fromEvent(window, 'resize').pipe(
        debounceTime(100)
    ).subscribe(() => {
        // TODO
        console.log('window resized');
    });
}
```

## 未完待续...