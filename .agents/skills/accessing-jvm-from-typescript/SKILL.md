---
name: accessing-jvm-from-typescript
description: 当 TypeScript 脚本需要访问 JVM 类、调用 Java/Kotlin 成员或传递函数 callback 时使用。
---

# 从 TypeScript 访问 JVM

TypeScript 源码先编译成 JavaScript，再由 Rhino 执行。JVM 类访问使用 Packages 路径；m8test_java 是其他语言生成器的源码前缀，不是 TypeScript/Rhino 语法。当前模板的 TypeScript 类型环境没有声明 Rhino 的 Packages 全局对象；静态检查 JVM 访问代码时，需要在 TS 源码或项目声明中显式声明它。运行时无需定义该对象，它由 Rhino 提供。

## 类与对象

```typescript
declare const Packages: any;
const StringBuilder = Packages.java.lang.StringBuilder;
const builder = new StringBuilder("M8Test");
builder.append(" TypeScript");
if (String(builder.toString()) !== "M8Test TypeScript") throw new Error("StringBuilder");
```

先确认依赖已加载到当前脚本 classloader。声明文件或代码补全存在不等于运行时类可见。方法重载、静态字段、嵌套类、异常等边界按目标语言的生成代码和实际设备行为验证。

## 函数 callback

TypeScript arrow function 传入 callback；生成的 .d.ts 只提供静态提示，运行时转换仍由 Rhino 完成。

## 函数 callback 示例

TypeScript arrow function 可以按目标 Kotlin 函数类型传入 callback。模板 Test Control 通过 Logger.withContext 实际验证 callback 被调用并获得参数：

```typescript
let called = false;
$logger.withContext(context => { called = context !== null; });
if (!called) throw new Error("callback");
```

## 类型转换边界

TypeScript 编译器的类型通过不证明 Rhino 参数转换成功。数值、null、数组、varargs、重载和异常均要以设备执行验证。

逐项记录已测试的 primitive/boxed、字符串、nullable、数组、集合、varargs、重载和异常行为。未经执行验证的转换写为待验证，不根据其他脚本语言推断。

## 验证

本模板的 typescript-template-jvm-interop Test Control 场景会实际调用 JVM StringBuilder，并验证宿主数组工厂和 wrapper。对 TypeScript 源码示例同时运行 TypeScript 编译器；当前 Test Control 脚本按 JavaScript/Rhino 执行，不能替代 TS 静态编译。此模板的 compileTypescript Gradle handler 会捕获 tsc 错误，因此验证具体 TypeScript 文件时应直接运行 `./node_modules/.bin/tsc --noEmit`，检查退出码和该文件的诊断。运行当前项目支持的选中 Test Control 任务并检查 summary 中该 requestId 为 passed；若当前模板没有注册相应任务，使用模板设备运行任务并确认成功日志。Gradle 使用 -q。
