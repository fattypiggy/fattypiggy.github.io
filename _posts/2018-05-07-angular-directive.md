---
layout: post
title: Angular核心概念之指令(Directive)
description: "Angular核心概念之指令(Directive)"
date: 2018-05-07
tags: [Angular]
cover: angular-3.svg
---

因为最近事情比较多，平时上班处于饱和状态，晚上回家也已经很累了，加上周末要去运动放松，实在难找出一整块时间去整理学习(ㄒoㄒ)。有过原创博客经历的人都知道，去高质量的总结、分享一些知识点其实非常的费时间，就比如去年分享的[组件](https://www.williamjing.com/2017/09/10/angular-component.html)那篇，足足耗费了我一个下午，可是我还是觉得有很多细节没有表述清楚，加上我文笔一般，经常是想写的很多，但是打开编辑器就忘了思路...

虽然时间很紧，但我还是更倾向于高质量的总结和分享，年轻时要克服浮躁和焦虑，脚踏实地，稳步前进！

# 概述

Angular中的Directive分为三类:

* 组件(Component): 带有模板的指令
* 属性指令(Attribute Directives): 添加、删除DOM元素改变DOM结构
* 结构指令(Structural directives): 改变元素、组件、其他指令外观和行为

组件是一种特殊的指令，详见[组件](https://www.williamjing.com/2017/09/10/angular-component.html)。
本篇我们重点介绍另外两种指令。

常用的属性指令有内置的 **NgStyle** 和 **NgClass** 等用来改变元素的属性、样式，还有官方实例中的HighLight指令，用来高亮元素，等等。

常用的结构指令有内置的 **NgFor** 和 **NgIf** 用来改变视图的结构。

## 创建指令

创建一个指令最基本的操作:

1. 导入Directive装饰器(结构化指令还需要Input、TemplateRef和ViewContainerRef)
2. 设置CSS选择器，Angular会在文本中定位此选择器
3. 给指令类添加装饰器

### 示例代码

来源: [Angular官方](https://angular.cn)

* 属性指令

```html
<h1>My First Attribute Directive</h1>

<h4>Pick a highlight color</h4>
<div>
  <input type="radio" name="colors" (click)="color='lightgreen'">Green
  <input type="radio" name="colors" (click)="color='yellow'">Yellow
  <input type="radio" name="colors" (click)="color='cyan'">Cyan
</div>
<p [appHighlight]="color">Highlight me!</p>

<p [appHighlight]="color" defaultColor="violet">
  Highlight me too!
</p>
```

```typescript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @Input() defaultColor: string;

  @Input('appHighlight') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

* 结构指令

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Add the template content to the DOM unless the condition is true.
 *
 * If the expression assigned to `appUnless` evaluates to a truthy value
 * then the templated elements are removed removed from the DOM,
 * the templated elements are (re)inserted into the DOM.
 *
 * <div *ngUnless="errorCount" class="success">
 *   Congrats! Everything is great!
 * </div>
 *
 * ### Syntax
 *
 * - `<div *appUnless="condition">...</div>`
 * - `<ng-template [appUnless]="condition"><div>...</div></ng-template>`
 *
 */
@Directive({ selector: '[appUnless]'})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
```

## 注意事项

1. 这里的方括号([])表示它的属性型选择器。Angular 会在模板中定位每个有一个属性叫 appHighlight 的元素，并且为这些元素加上本指令的逻辑。
2. 一个宿主元素最多只能绑定一个结构指令，但是可以有多个属性指令
3. 结构指令前面的星号(*)是语法糖，其实是Angular帮我们把宿主元素嵌入到‘ng-template’中,所以结构指令一般都有两种写法，官方推荐带星号的语法糖形式
4. 对于带有输入属性的指令，在模板中是否加([])的这个问题，例如：

```html
<p [appHighlight]="'yellow'">Highlighted in yellow</p>
<p appHighlight="orange">Highlighted in orange</p>
```

[]是一个绑定到 @**Input** 的语法，等号(=)后面的内容是变量名，这不是Directive特有的，而是整个Angular的语法，详见[Angular模板语法](https://angular.cn/guide/template-syntax)。

* 有方括号([])时：等号右侧引号内的变量必须在ts文件中存在，否则绑定失败，或者双引号内的变量是一个string，并且用单引号引起来
* 没有方括号([])时：自定义的Directive或者Input属性将按照HTML规定的属性绑定去解析，双引号内的变量将会是string
* 特殊情况：Boolean类型的true和false，是否写方括号，它的值都将会被正确解析。

未完待续...