---
layout: post
title: canvas in Angular
description: Angular项目如何使用canvas
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

```JavaScript
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

## 场景

### 如何将Blob画在canvas上

假设我们从后端获取了图片的Blob数据，但是怎么画到canvas上呢？

1. 初始化一个Image对象

2. 设置 *image* 的 *src* 属性，这里的url很有意思，是使用URL的一个静态方法来创建一个url指向这个对象，这个方法我也是第一次了解和使用

3. 使用私有draw()方法在canvas上画图

```JavaScript
ngOnInit() {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.makeSubscription();

    const image = new Image();
    const url = URL.createObjectURL(image);
    image.src = url;
    this.draw(image, 0, 0);
  }

  private draw(image: HTMLImageElement, dX: number, dY: number) {
    // TODO
    this.context.drawImage(image, dX, dY);
    console.log('draw method');
  }
```

等等，上面一顿操作，你会发现，图呢？没画上去啊！
其实，要想真正当一个好的前端程序员，要时刻记得 **异步**。原因是：image虽然创建了实例，但是还没有load，
所以要在load之后再调用draw()方法。更改代码如下：

```JavaScript
fromEvent(image, 'load').subscribe(() => {
    this.draw(image, 0, 0);
});
```

这里又涉及RxJS的一些知识，我将在接下来一段时间归纳总结一下RxJS。

## 未完待续

每天学习一点